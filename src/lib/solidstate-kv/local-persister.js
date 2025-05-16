import {arrayify} from './utils'
// import { MemoryLevel } from 'memory-level'
import { BrowserLevel } from 'browser-level'
import { Quadstore } from 'quadstore'
import { Engine } from 'quadstore-comunica'
import { DataFactory } from 'rdf-data-factory'

const backend = new BrowserLevel('SolidState', { valueEncoding: 'json' })
const df = new DataFactory()
const store = new Quadstore({backend, dataFactory: df})
const engine = new Engine(store)

const STRING = 'http://www.w3.org/2001/XMLSchema#string'
const BOOLEAN = 'http://www.w3.org/2001/XMLSchema#boolean'
const INTEGER = 'http://www.w3.org/2001/XMLSchema#integer'

const querystore = () => {
  return async (query) => {
    let stream
    try {
      stream = await engine.queryQuads(query)
    } catch (e) {
      return {
        message: e,
        error: true,
        query,
      }
    }
    let docMap = new Map()
    const quads = await stream.toArray()
    quads.forEach(quad => {
      let s = quad.subject.value
      let doc = docMap.get(s)
      if (!doc) {
        docMap.set(s, {})
        doc = docMap.get(s)
      }
      doc['@id'] = s
      let p = quad.predicate.value.replace('http://www.w3.org/1999/02/22-rdf-syntax-ns#', '@')
      let o
      if (quad.object.datatype) {
        let type = quad.object.datatype.value
        switch (true) {
          case type === BOOLEAN:
            o = quad.object.value === 'true'
            break;
          case type === INTEGER:
            o = Number.parseInt(quad.object.value)
            break;
          default:
            o = quad.object.value
            break;
        }
      } else {
        o = quad.object.value
      }
      if (doc[p]) {
        doc[p] = [...arrayify(doc[p]), o]
      } else {
        doc[p] = o
      }
      docMap.set(s, doc)
    })
    const docs = [...docMap.values()]
    return docs.length > 1 ? docs : docs[0]
  }
}

const quadstore = () => {
  return async ({ins, del}) => {
    let err
    let insQ = `insert {
      ${arrayify(ins).join('')}
    }`
    let delQ = `delete {
      ${arrayify(del).join('')}
    }`
    let query = `
      ${del ? delQ : ''}
      ${ins ? insQ : ''}
      where {
        optional {?s ?p ?o .}
      }
    `
    let result = await engine.queryVoid(query)
    return result
  }
}

const localPersister = async () => {
  switch(true) {
    case typeof window !== 'undefined':
      try {
        await store.close ()
      } catch (e) {}
      await store.open()
      return {
        persist: quadstore(),
        getter: querystore()
      }
    case typeof fs !== 'undefined':
      return "Filesystem in Node";
    default:
      return "In-Memory, non peristent"
  }
}

export default localPersister
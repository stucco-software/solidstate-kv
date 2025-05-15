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

const querystore = () => {
  return async (query) => {
    await store.open()
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
      let o = quad.object.value
      if (doc[p]) {
        doc[p] = [...arrayify(doc[p]), o]
      } else {
        doc[p] = o
      }
      docMap.set(s, doc)
    })
    await store.close()
    const docs = [...docMap.values()]
    return docs.length > 1 ? docs : docs[0]
  }
}

const quadstore = () => {
  return async ({ins, del}) => {
    let err
    await store.open()

    let insQ = `insert {
      ${ins}
    }`
    let delQ = `delete {
      ${del}
    }`
    let query = `
      ${del ? delQ : ''}
      ${ins ? insQ : ''}
      where {
        optional {?s ?p ?o .}
      }
    `
    let result = await engine.queryVoid(query)
    await store.close()
    return result
  }
}

const localPersister = () => {
  switch(true) {
    case typeof window !== 'undefined':
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
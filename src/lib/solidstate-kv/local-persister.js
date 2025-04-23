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
    let stream = await engine.queryQuads(query)
    let doc = {}
    const quads = await stream.toArray()
    quads.forEach(quad => {
      doc['@id'] = quad.subject.value
      let p = quad.predicate.value.replace('http://www.w3.org/1999/02/22-rdf-syntax-ns#', '@')
      let o = quad.object.value
      if (doc[p]) {
        doc[p] = [...arrayify(doc[p]), o]
      } else {
        doc[p] = o
      }
    })
    return doc
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
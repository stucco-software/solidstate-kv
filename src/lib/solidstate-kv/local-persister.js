// import { MemoryLevel } from 'memory-level'
import { BrowserLevel } from 'browser-level';
import { Quadstore } from 'quadstore'
import { Engine } from 'quadstore-comunica'

const quadstore = () => {
  const backend = new BrowserLevel('SolidState', { valueEncoding: 'json' })
  const store = new Quadstore({backend})
  const engine = new Engine(store)


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
      ${ins ? insQ : ''}
      ${del ? delQ : ''}
      where {
        optional {?s ?p ?o .}
      }
    `
    console.log(query)
    engine.queryVoid(query)
    console.log('ok?')
    return err
  }
}

const localPersister = () => {
  switch(true) {
    case typeof window !== 'undefined':
      return quadstore();
    case typeof fs !== 'undefined':
      return "Filesystem in Node";
    default:
      return "In-Memory, non peristent"
  }
}

export default localPersister
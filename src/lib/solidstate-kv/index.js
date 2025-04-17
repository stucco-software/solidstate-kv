import * as jsonld from 'jsonld'
import { arrayify } from '$lib/arrayify'

const string   = 'http://www.w3.org/2001/XMLSchema#string'
const dateTime = 'http://www.w3.org/2001/XMLSchema#dateTime'
const boolean = 'http://www.w3.org/2001/XMLSchema#boolean'

const context = {
  "@base": "https://vocab.rdf.systems/",
  "@vocab": "#"
}

const contextualize = (id, kv) => {
  return {
    "@context": context,
    "@id": id,
    ...kv
  }
}

const toTriples = async (doc) => {
  if (jsonld.default) {
    return await jsonld
      .default
      .toRDF(doc, {
        format: 'application/n-quads'
      })
  } else {
    return await jsonld
      .toRDF(doc, {
        format: 'application/n-quads'
      })
  }
}

const post = (persist) => async (doc) => {
  let Doc = structuredClone(doc)
  if (!Doc['@id']) {
    let uuid
    let canUUID = typeof self !== 'undefined'
    if (canUUID) {
      uuid = self.crypto.randomUUID()
    } else {
      uuid = 'some-uuid-lol'
    }
    Doc['@id'] = `uuid:${uuid}`
  }
  // let doc = contextualize(id, kv)
  // const triples = await toTriples(doc)
  // const result = await persist({ins: triples})
  return Doc
}

const put = (persist) => async (id, update) => {
  console.log('put!')
  console.log(id, update)
  return update
}

// @todo
// cast other types like dates and times and shit
const castLiteral = (type, lit) => {
  let result
  switch (type) {
    case boolean:
      result = lit == 'true' ? true : false
      break;
    default:
      result = lit
  }
  return result
}

const typeValue = (o) => {
  let literal = o.value.replace(context['@base'], '')
  let v
  switch (o.type) {
    case 'literal':
      v = castLiteral(o.datatype, literal)
      break;
    case 'uri':
      v = {
        "@id": literal
      }
      break;
    default:
      v = literal
  }
  return v
}

const getEntity = (getter) => async (id, shape) => {
  let response = await getter(`${context['@base']}${id}`)
  let entity = response.results.bindings.reduce((acc, cur) => {
    let k = cur.p.value.replace(context['@base'] + context['@vocab'], '')
    let v = typeValue(cur.o)
    acc[k]
      ? acc[k] = [...arrayify(acc[k]), v]
      : acc[k] = v
    return acc
  }, {
    "@id": id
  })

  return entity
}

const clear = (persist) => async () => {
  const result = await persist({del: `?s ?p ?o`})
  const response = await result.text()
  return response
}

const structureUpdate = ({ins, del}) => {
  let prefixes = ``
  let query = `
    ${prefixes}
  `
  if (ins) {
    query = `${query}
      insert {
        ${ins}
      }
    `
  }
  if (del) {
    query = `${query}
      delete {
        ${del}
      }
    `
  }
  query = `${query}
      where {
        optional { ?s ?p ?o }
      }
    `
  return query
}

const localPersister = () => {
  switch(true) {
    case typeof window !== 'undefined':
      return "IndexedDB in the Browser";
    case typeof fs !== 'undefined':
      return "Filesystem in Node";
    default:
      return "In-Memory, non peristent"
  }
}

const configureStore = (config) => {
  switch(true) {
    case Array.isArray(config):
      return "Array of Server Configs";
    default:
      return localPersister()
  }
}

const SolidState = (config) => {
  const persist = configureStore(config)

  return {
    version: "0.0.1",
    persister: persist,
    post: post(),
    put: put()
  }
}
export default SolidState
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

const post = (persist) => async (id, kv) => {
  let doc = contextualize(id, kv)
  const triples = await toTriples(doc)
  const result = await persist({ins: triples})
  return doc
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

const solidApp = ({redirect_uri, client_id}) => () => {
  // solid app should auth, store creds,
  // init from creds, then psh to a sparql endpoint.
  return {
    post: () => {}
  }
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

export const sparqlApp = ({ endpoint }) => () => {
  // create a fetch fn with endpoint and credential headers
  // post and get to that store
  // under a subgraph???
  const persist = async ({ins = null, del = null}) => {
    let response = await fetch(`${endpoint}update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'update': structureUpdate({ins, del})
      })
    }).catch((error) => {
      console.error('Error:', error);
    })
    return response
  }

  const getter = async (id) => {
    console.log( `
        select *
        where {
          <${id}> ?p ?o .
        }
      `)
    let response = await fetch(`${endpoint}query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
      'query': `
        select *
        where {
          <${id}> ?p ?o .
        }
      `
      })
    }).catch((error) => {
      console.error('Error:', error);
    })

    let json = await response.json()
    return json
  }

  return {
    post: post(persist),
    get: getEntity(getter),
    clear: clear(persist)
  }
}

export const localApp = () => () => {
  // local app should create an in-memory SPARQL store
  // then persist that data into local storage
  // then load that data _from_ local storage on init.
  const persist = ({ins = '', del = ''}) => {
    console.log(structureUpdate({ins, del}))
    return true
  }

  return {
    post: post(persist)
  }
}
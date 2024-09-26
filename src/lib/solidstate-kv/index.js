import * as jsonld from 'jsonld'

const string   = 'http://www.w3.org/2001/XMLSchema#string'
const DateTime = 'http://www.w3.org/2001/XMLSchema#dateTime'

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
  const result = persist({ins: triples})
  return doc
}

const solidApp = ({redirect_uri, client_id}) => () => {
  // solid app should auth, store creds,
  // init from creds, then psh to a sparql endpoint.
  return {
    post: () => {}
  }
}

export const sparqlApp = ({ endpoint }) => () => {
  // create a fetch fn with endpoint and credential headers
  // post and get to that store
  // under a subgraph???
  const persist = ({ins = '', del = ''}) => {
    console.log(`fetch(${endpoint}insert),`)
    console.log(`insert {
      ${ins}
    } delete {
      ${del}
    } where {
      optional { ?s ?p ?o }
    }`)
    return true
  }

  return {
    post: post(persist)
  }
}

export const localApp = () => () => {
  // local app should create an in-memory SPARQL store
  // then persist that data into local storage
  // then load that data _from_ local storage on init.
  const persist = ({ins = '', del = ''}) => {
    console.log(`insert {
      ${ins}
    } delete {
      ${del}
    } where {
      optional { ?s ?p ?o }
    }`)
    return true
  }

  return {
    post: post(persist)
  }
}
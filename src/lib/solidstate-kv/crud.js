import {
  context, contextualize, compact, toTriples, castLiteral, typeValue, arrayify
} from './utils'

export const post = (persist, getter) => async (doc) => {
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

  let ld = contextualize(Doc)

  const triples = await toTriples(ld)
  const result = await persist({ins: triples})
  return Doc
}

const ns = (p) => `<${context['@base']}${context['@vocab']}${p}>`
const sub = (id) => `<${context['@base']}${id}>`

export const put = (persist, getter) => async (id, update) => {
  let Doc = structuredClone(update)
  Doc['@id'] = id
  let ld = contextualize(Doc)
  const ins = await toTriples(ld)
  let del = Object
    .keys(update)
    .map(p => `<${id}> ${p.includes(':') ? p : ns(p)} ?o .`)
  const result = await persist({ins, del})
  const doc = await getter(`construct {<${id}> ?p ?o } where {<${id}> ?p ?o .}`)
  let returnLD = await compact(doc)
  return returnLD
}

export const patch = (persist, getter) => async (id, update) => {
  // this is a lot like PUT
  let Doc = structuredClone(update)
  Doc['@id'] = id
  let ld = contextualize(Doc)
  const ins = await toTriples(ld)
  const result = await persist({ins})
  const doc = await getter(`construct {<${id}> ?p ?o } where {<${id}> ?p ?o .}`)
  let returnLD = await compact(doc)
  return returnLD
}

export const deleteStatements = (persist, getter) => async (id, update) => {
  // THis is like the rest of PUT!
  let del
  if (update) {
    del = Object
      .keys(update)
      .map(p => Object
        .entries(update)[0][1]
        .map(o => `<${id}> ${p.includes(':') ? p : ns(p)} ${o.includes(':') ? `<${o}>` : `"${o}"`} . `)
      )
      .flat()
      .join(' ')
  } else {
    del = `<${id}> ?p ?o .`
  }
  const result = await persist({del})
  const doc = await getter(`construct {<${id}> ?p ?o } where {<${id}> ?p ?o .}`)
  let returnLD = await compact(doc)
  if (!returnLD['@id']) {
    return null
  }
  return returnLD
}

export const getEntity = (getter) => async (id, shape) => {

  // shape?
  // let response = await getter(`${context['@base']}${id}`)
  // let entity = response.results.bindings.reduce((acc, cur) => {
  //   let k = cur.p.value.replace(context['@base'] + context['@vocab'], '')
  //   let v = typeValue(cur.o)
  //   acc[k]
  //     ? acc[k] = [...arrayify(acc[k]), v]
  //     : acc[k] = v
  //   return acc
  // }, {
  //   "@id": id
  // })

  let s = id.includes(':') ? `<${id}>` : sub(id)
  const doc = await getter(`construct {${s} ?p ?o } where {${s} ?p ?o .}`)
  let returnLD = await compact(doc)
  return returnLD
}

export const getAll = (getter) => async () => {
  const docs = await getter(`construct {?s ?p ?o } where {?s ?p ?o .}`)
  let ld = contextualize({
    "@graph": arrayify(docs)
  })
  let returnLD = await compact(ld)
  return returnLD['@graph']
}

export const clear = (persist) => async () => {
  const result = await persist({del: `?s ?p ?o`})
  return result
}

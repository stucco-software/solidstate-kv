import {
  context, contextualize, compact, toTriples, castLiteral, typeValue
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
  console.log(doc)
  let returnLD = await compact(doc)
  console.log(returnLD)
  return returnLD
}

export const getEntity = (getter) => async (id, shape) => {
  console.log(`plz get this thingy`, id)
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

  return {doop: 'woop'}
}

export const clear = (persist) => async () => {
  // const result = await persist({del: `?s ?p ?o`})
  let result
  return result
}

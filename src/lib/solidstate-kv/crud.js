import {
  contextualize, toTriples, castLiteral, typeValue
} from './utils'

export const post = (persist) => async (doc) => {
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
  console.log('did post!')
  console.log(Doc)
  return Doc
}

export const put = (persist) => async (id, update) => {
  console.log('put!')
  console.log(id, update)
  let Doc = structuredClone(update)
  Doc['@id'] = id
  let ld = contextualize(Doc)
  const triples = await toTriples(ld)
  // delete all the keys??
  console.log(triples)
  return 'lol tktk'
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
  const result = await persist({del: `?s ?p ?o`})
  return result
}

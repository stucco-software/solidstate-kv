import * as jsonld from 'jsonld'

const context = {
  "@base": "https://vocab.rdf.systems/",
  "@vocab": "#"
}

export const contextualize = (doc) => {
  return {
    "@context": context,
    ...doc
  }
}

export const toTriples = async (doc) => {
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

// @todo
// cast other types like dates and times and shit
export const castLiteral = (type, lit) => {
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

export const typeValue = (o) => {
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

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('Returns the input if it is an array', () => {
    expect(arrayify(['a', 'b', 'c'])).toStrictEqual(['a', 'b', 'c'])
  })

  it('Returns the an array with the input if it is not an array', () => {
    expect(arrayify('a')).toStrictEqual(['a'])
  })

  it('Returns an empty array if input is null', () => {
    expect(arrayify(null)).toStrictEqual([])
  })

  it('Returns an empty array if input is undefined', () => {
    expect(arrayify(undefined)).toStrictEqual([])
  })

  it('Returns an empty array if input is false', () => {
    expect(arrayify(false)).toStrictEqual([])
  })
}

export const arrayify = target => target
  ? Array.isArray(target)
    ? target
    : [target]
  : []


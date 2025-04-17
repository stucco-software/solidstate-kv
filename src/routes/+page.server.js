import { getGraph, getFrame } from '$lib/ld/graph'

export async function load({ params }){
  const r = await getGraph()
  let docTree = await getFrame({
    "@embed": "@always",
    "@embed": "@always",
    id: "/docs",
    body: {},
    hasPart: {
      "@embed": "@always",
      prefLabel: {},
      id: {},
      type: {},
      body: {},
      next: {
        "@embed": "@always",
        prefLabel: {},
        id: {},
      },
      hasPart: {
        "@embed": "@always",
        prefLabel: {},
        body: {},
        next: {
          "@embed": "@always",
          prefLabel: {},
          id: {},
        },
      }
    }
  })
  return docTree
}
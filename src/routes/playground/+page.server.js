import { sparqlApp } from '$lib/solidstate-kv'

const app = sparqlApp({
  endpoint: 'http://oxigraph.pluriverse.orb.local/'
})
const db = app()

export async function load({ params }){
  let clear = await db.clear()
  console.log(clear)

  let chickpeas = await db.post("chickpeas", {
    "aka": "Garbanzo Beans",
    "gramsPerUnit": 42
  })

  let post = await db.post('hummus', {
    "name": {
      "@type": 'http://www.w3.org/2001/XMLSchema#string',
      "@value": "Hummus"
    },
    "vegetarian": true,
    "ingredient": [{
      "@id": "chickpeas"
    },{
      "@id": "lemon"
    }]
  })

  let ref = await db.get('hummus')
  console.log(ref)

  let name = await db.get('hummus', {
    name: {}
  })

  console.log(`Dish name:`, name)
  return {
    success: true,
    ref
  }
}
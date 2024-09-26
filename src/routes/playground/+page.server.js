import { sparqlApp } from '$lib/solidstate-kv'

const app = sparqlApp({
  endpoint: 'https://stucco-proxy.fly.dev/',
  username: 'pushbroom',
  password: '?????????'
})
const db = app()

export async function load({ params }){
  let chickpeas = await db.post("chickpeas", {
    "aka": "Garbanzo Beans",
    "gramsPerUnit": 42
  })
  let ref = await db.post('hummus', {
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
  return {
    success: true
  }
}
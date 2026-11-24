import axios from 'axios'

const hit = axios.create({ baseURL: '/' })

export function fetchGoods() {
  return hit.get('/db/products.json').then(r => r.data)
}

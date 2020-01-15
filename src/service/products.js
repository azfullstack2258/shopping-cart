import axios from 'axios'
import api from './api'

export function fetchProducts () {
  return axios.get(api.products)
}

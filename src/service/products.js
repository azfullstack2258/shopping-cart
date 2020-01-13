import axios from 'axios'
import api from './api'

export function fetchProductsAPI() {
  return axios.get(api.products)
}

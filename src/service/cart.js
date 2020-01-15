import axios from 'axios'
import api from './api'

export function applyPromoCode (promoCode) {
  return axios.post(api.applyPromoCode, { promoCode })
}

export function checkout (param) {
  return axios.post(api.checkout, param)
}

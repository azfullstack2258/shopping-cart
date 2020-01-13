import { all } from 'redux-saga/effects'
import { applyPromoCodeWatcher, checkoutProductsWatcher } from './cartSagas'
import { fetchProductsWatcher } from './productsSagas'

export default function* rootSagas() {
  yield all([
    applyPromoCodeWatcher(),
    checkoutProductsWatcher(),
    fetchProductsWatcher()
  ])
}

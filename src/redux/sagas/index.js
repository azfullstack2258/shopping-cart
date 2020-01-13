import { all } from 'redux-saga/effects'
import { applyPromoCodeWatcher, checkoutCartWatcher } from './cartSagas'
import { fetchProductsWatcher } from './productsSagas'

export default function* rootSagas() {
  yield all([
    applyPromoCodeWatcher(),
    checkoutCartWatcher(),
    fetchProductsWatcher()
  ])
}

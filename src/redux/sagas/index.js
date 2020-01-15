import { all } from 'redux-saga/effects'
import { applyPromoCodeWatcher, checkoutWatcher } from './cartSagas'
import { fetchProductsWatcher } from './productSagas'

export default function* rootSaga() {
  yield all([
    applyPromoCodeWatcher(),
    checkoutWatcher(),
    fetchProductsWatcher()
  ])
}

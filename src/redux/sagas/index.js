import { all } from 'redux-saga/effects'
import { applyPromoCodeWatcher, checkoutCartWatcher } from './cartSagas'
import { fetchProductsWatcher } from './productSagas'

export default function* rootSaga() {
  yield all([
    applyPromoCodeWatcher(),
    checkoutCartWatcher(),
    fetchProductsWatcher()
  ])
}

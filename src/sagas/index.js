import { put, takeEvery, all } from 'redux-saga/effects'
import actionTypes from '../actions/actionTypes'

function* checkPromoCode() {
  yield put({
    type: actionTypes.CHECK_PROMO_CODE_SUCCEED,
    response: {
      discounttype: 'percent',
      amount: 10
    }
  })
}

export function* checkPromoCodeWatcher() {
  yield takeEvery(actionTypes.CHECK_PROMO_CODE, checkPromoCode)
}

function* checkoutProducts() {
  yield put({
    type: actionTypes.CHECKOUT_PRODUCTS_SUCCEED,
    response: { msg: 'SUCCESS' }
  })
}

export function* checkoutProductsWatcher() {
  yield takeEvery(actionTypes.CHECKOUT_PRODUCTS, checkoutProducts)
}

export default function* rootSagas() {
  yield all([checkPromoCodeWatcher(), checkoutProductsWatcher()])
}

import { put, takeEvery } from 'redux-saga/effects'
import actions from '../actions/actions'

function* applyPromoCode() {
  yield put({
    type: actions.APPLY_PROMO_CODE_SUCCEED,
    response: {
      discounttype: 'percent',
      amount: 10
    }
  })
}

export function* applyPromoCodeWatcher() {
  yield takeEvery(actions.APPLY_PROMO_CODE_REQUEST, applyPromoCode)
}

function* checkoutProducts() {
  yield put({
    type: actions.CHECKOUT_PRODUCTS_SUCCEED,
    response: { msg: 'SUCCESS' }
  })
}

export function* checkoutProductsWatcher() {
  yield takeEvery(actions.CHECKOUT_PRODUCTS_REQUEST, checkoutProducts)
}

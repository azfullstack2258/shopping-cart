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

function* checkoutCart() {
  yield put({
    type: actions.CHECKOUT_CART_SUCCEED,
    response: { msg: 'SUCCESS' }
  })
}

export function* checkoutCartWatcher() {
  yield takeEvery(actions.CHECKOUT_CART_REQUEST, checkoutCart)
}

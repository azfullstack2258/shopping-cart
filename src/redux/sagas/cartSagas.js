import { put, takeEvery } from 'redux-saga/effects'
import actionTypes from '../actions'

function* applyPromoCodeSaga() {
  yield put({
    type: actionTypes.APPLY_PROMO_CODE_SUCCEED,
    response: {
      discounttype: 'percent',
      amount: 10
    }
  })
}

export function* applyPromoCodeWatcher() {
  yield takeEvery(actionTypes.APPLY_PROMO_CODE_REQUEST, applyPromoCodeSaga)
}

function* checkoutCartSaga() {
  yield put({
    type: actionTypes.CHECKOUT_CART_SUCCEED,
    response: { msg: 'SUCCESS' }
  })
}

export function* checkoutCartWatcher() {
  yield takeEvery(actionTypes.CHECKOUT_CART_REQUEST, checkoutCartSaga)
}

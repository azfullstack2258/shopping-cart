/* eslint-disable linebreak-style */
import { call, put, takeEvery } from 'redux-saga/effects'
import actionTypes from '../actions'
import { applyPromoCode, checkout } from '../../service/cart'

function * applyPromoCodeSaga ({ promoCode }) {
  try {
    const res = yield call(applyPromoCode, promoCode)
    yield put({
      type: actionTypes.APPLY_PROMO_CODE_SUCCEED,
      response: res.data
    })
  } catch (error) {
    console.log(`promoCode: ${error}`)
  }
}

export function * applyPromoCodeWatcher () {
  yield takeEvery(actionTypes.APPLY_PROMO_CODE_REQUEST, applyPromoCodeSaga)
}

function * checkoutSaga ({ cart }) {
  try {
    const res = yield call(checkout, { basket: cart, cardNumber: '4539456463019519' })
    yield put({
      type: actionTypes.CHECKOUT_SUCCEED,
      response: res.data
    })
  } catch (error) {
    console.log(`checkout: ${error}`)
  }
}

export function * checkoutWatcher () {
  yield takeEvery(actionTypes.CHECKOUT_REQUEST, checkoutSaga)
}

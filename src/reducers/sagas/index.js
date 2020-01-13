import { put, takeEvery, all } from 'redux-saga/effects'

import actionTypes from '../../actions/actionTypes'

function* applyPromoCode() {
  yield put({
    type: actionTypes.APPLY_PROMO_CODE_SUCCEED,
    response: {
      discounttype: 'percent',
      amount: 10
    }
  })
}

export function* applyPromoCodeWatcher() {
  yield takeEvery(actionTypes.APPLY_PROMO_CODE, applyPromoCode)
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
  yield all([applyPromoCodeWatcher(), checkoutProductsWatcher()])
}

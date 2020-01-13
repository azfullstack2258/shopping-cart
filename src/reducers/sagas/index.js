import { call, put, takeEvery, all } from 'redux-saga/effects'
import axios from 'axios'

import actionTypes from '../../actions/actionTypes'
import api from '../../service/api'

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
  yield takeEvery(actionTypes.CHECKOUT_PRODUCTS_REQUEST, checkoutProducts)
}

function* fetchProducts() {
  const { data } = yield call([axios, axios.get], api.products)
  yield put({
    type: actionTypes.FETCH_PRODUCTS_SUCCEED,
    products: data
  })
}

export function* fetchProductsWatcher() {
  yield takeEvery(actionTypes.FETCH_PRODUCTS_REQUEST, fetchProducts)
}

export default function* rootSagas() {
  yield all([applyPromoCodeWatcher(), checkoutProductsWatcher(), fetchProductsWatcher()])
}

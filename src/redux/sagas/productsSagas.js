import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import api from '../../service/api'
import actions from '../actions/actions'

function* fetchProducts() {
  const { data } = yield call([axios, axios.get], api.products)
  yield put({
    type: actions.FETCH_PRODUCTS_SUCCEED,
    products: data
  })
}

export function* fetchProductsWatcher() {
  yield takeEvery(actions.FETCH_PRODUCTS_REQUEST, fetchProducts)
}

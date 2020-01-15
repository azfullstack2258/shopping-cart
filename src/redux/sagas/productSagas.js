import { call, put, takeEvery } from 'redux-saga/effects'
import actionTypes from '../actions'
import { fetchProducts } from '../../service/products'

function * fetchProductsSaga () {
  const { data } = yield call(fetchProducts)
  yield put({
    type: actionTypes.FETCH_PRODUCTS_SUCCEED,
    products: data
  })
}

export function * fetchProductsWatcher () {
  yield takeEvery(actionTypes.FETCH_PRODUCTS_REQUEST, fetchProductsSaga)
}

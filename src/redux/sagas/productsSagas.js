import { call, put, takeEvery } from 'redux-saga/effects'
import actions from '../actions/actions'
import { fetchProductsAPI } from '../../service/products'

function* fetchProducts() {
  const { data } = yield call(fetchProductsAPI)
  yield put({
    type: actions.FETCH_PRODUCTS_SUCCEED,
    products: data
  })
}

export function* fetchProductsWatcher() {
  yield takeEvery(actions.FETCH_PRODUCTS_REQUEST, fetchProducts)
}

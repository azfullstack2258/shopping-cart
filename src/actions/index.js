import actionTypes from './actionTypes'

import api from '../service/api'

export const checkPromoCode = promoCode => ({
  type: actionTypes.CHECK_PROMO_CODE,
  promoCode
})

export const checkoutProducts = baskets => ({
  type: actionTypes.CHECKOUT_PRODUCTS,
  baskets
})

export const checkoutProductsReset = () => ({
  type: actionTypes.CHECKOUT_PRODUCTS_RESET
})

export const selectProducts = (item, mode) => ({
  type: actionTypes.PRODUCTS_SELECTED,
  item,
  mode
})

export const fetchProductsRequest = () => ({
  type: actionTypes.FETCH_PRODUCTS_REQUEST
})

export const fetchProductsSucceed = products => ({
  type: actionTypes.FETCH_PRODUCTS_SUCCEED,
  products
})

export const fetchProducts = () => {
  return dispatch => {
    dispatch(fetchProductsRequest())
    fetch(api.products)
      .then(res => res.json())
      .then(res => dispatch(fetchProductsSucceed(res)))
      .catch(() => {
        dispatch({ type: actionTypes.FETCH_PRODUCTS_FAIL })
      })
  }
}

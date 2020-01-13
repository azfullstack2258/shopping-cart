import actions from './actions'

export const applyPromoCode = promoCode => ({
  type: actions.APPLY_PROMO_CODE_REQUEST,
  promoCode
})

export const checkoutProductsRequest = baskets => ({
  type: actions.CHECKOUT_PRODUCTS_REQUEST,
  baskets
})

export const checkoutProductsReset = () => ({
  type: actions.CHECKOUT_PRODUCTS_RESET
})

export const selectProducts = (item, mode) => ({
  type: actions.SELECT_PRODUCTS,
  item,
  mode
})

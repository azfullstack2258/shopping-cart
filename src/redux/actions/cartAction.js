import actions from './actions'

export const applyPromoCode = promoCode => ({
  type: actions.APPLY_PROMO_CODE_REQUEST,
  promoCode
})

export const checkoutCartRequest = baskets => ({
  type: actions.CHECKOUT_CART_REQUEST,
  baskets
})

export const checkoutCartReset = () => ({
  type: actions.CHECKOUT_CART_RESET
})

export const selectProducts = (item, mode) => ({
  type: actions.SELECT_PRODUCTS,
  item,
  mode
})

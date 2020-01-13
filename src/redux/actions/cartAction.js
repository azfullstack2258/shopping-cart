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

export const addToCart = item => ({
  type: actions.ADD_TO_CART,
  item
})

export const removeFromCart = item => ({
  type: actions.REMOVE_FROM_CART,
  item
})

export const clearFromCart = item => ({
  type: actions.CLEAR_FROM_CART,
  item
})

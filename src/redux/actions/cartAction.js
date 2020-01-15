const cartActionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_FROM_CART: 'CLEAR_FROM_CART',

  APPLY_PROMO_CODE_REQUEST: 'APPLY_PROMO_CODE_REQUEST',
  APPLY_PROMO_CODE_SUCCEED: 'APPLY_PROMO_CODE_SUCCEED',

  CHECKOUT_REQUEST: 'CHECKOUT_REQUEST',
  CHECKOUT_SUCCEED: 'CHECKOUT_SUCCEED',

  CART_RESET: 'CART_RESET'
}

export const applyPromoCode = promoCode => ({
  type: cartActionTypes.APPLY_PROMO_CODE_REQUEST,
  promoCode
})

export const checkoutRequest = cart => ({
  type: cartActionTypes.CHECKOUT_REQUEST,
  cart
})

export const cartReset = () => ({
  type: cartActionTypes.CART_RESET
})

export const addToCart = sku => ({
  type: cartActionTypes.ADD_TO_CART,
  sku
})

export const removeFromCart = sku => ({
  type: cartActionTypes.REMOVE_FROM_CART,
  sku
})

export const clearFromCart = sku => ({
  type: cartActionTypes.CLEAR_FROM_CART,
  sku
})

export default cartActionTypes

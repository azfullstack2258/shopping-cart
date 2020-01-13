const cartActionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_FROM_CART: 'CLEAR_FROM_CART',

  APPLY_PROMO_CODE_REQUEST: 'APPLY_PROMO_CODE_REQUEST',
  APPLY_PROMO_CODE_SUCCEED: 'APPLY_PROMO_CODE_SUCCEED',

  CHECKOUT_CART_REQUEST: 'CHECKOUT_CART_REQUEST',
  CHECKOUT_CART_SUCCEED: 'CHECKOUT_CART_SUCCEED',

  CHECKOUT_CART_RESET: 'CHECKOUT_CART_RESET'
}

export const applyPromoCode = promoCode => ({
  type: cartActionTypes.APPLY_PROMO_CODE_REQUEST,
  promoCode
})

export const checkoutCartRequest = baskets => ({
  type: cartActionTypes.CHECKOUT_CART_REQUEST,
  baskets
})

export const checkoutCartReset = () => ({
  type: cartActionTypes.CHECKOUT_CART_RESET
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

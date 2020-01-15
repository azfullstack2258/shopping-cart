import actionTypes from '../actions'

const initialState = {
  selectedProducts: {},
  msg: '',
  promoCode: { discounttype: '', amount: 0 }
}

const handleCartEvent = (state, action, value) => {
  const items = {...state.selectedProducts}
  if (Object.keys(items).includes(action.sku.toString())) {
    (value === 0)
      ? items[action.sku] = 0
      : items[action.sku] += value
    if (items[action.sku] === 0)
      delete items[action.sku]
  }
  else items[action.sku] = 1

  return {
    ...state,
    selectedProducts: {...items}
  }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return { ...handleCartEvent(state, action, 1) }
    case actionTypes.REMOVE_FROM_CART:
      return { ...handleCartEvent(state, action, -1) }
    case actionTypes.CLEAR_FROM_CART:
      return { ...handleCartEvent(state, action, 0) }
    case actionTypes.CHECKOUT_SUCCEED:
      return { ...state, msg: action.response.msg }
    case actionTypes.CART_RESET:
      return {
        ...state,
        msg: ''
      }
    case actionTypes.APPLY_PROMO_CODE_SUCCEED:
      return { ...state, promoCode: action.response }
    default:
      return state
  }
}

export default cart

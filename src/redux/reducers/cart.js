import actionTypes from '../actions'

const initialState = {
  selectedProducts: [],
  msg: '',
  promoCode: { discounttype: '', amount: 0 }
}

const handleCartEvent = (state, action, value) => {
  const items = [...state.selectedProducts]
  const item = items.find(el => el.sku === action.sku)
  item
    ? value === 0
      ? (item.count = 0)
      : (item.count += value)
    : items.push({ sku: action.sku, count: 1 })
  return {
    ...state,
    selectedProducts: [...items.filter(el => el.count !== 0)]
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

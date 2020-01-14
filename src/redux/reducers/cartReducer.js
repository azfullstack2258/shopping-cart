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
      ? (item.selectedNum = 0)
      : (item.selectedNum += value)
    : items.push({ sku: action.sku, selectedNum: 1 })
  return {
    ...state,
    selectedProducts: [...items.filter(el => el.selectedNum !== 0)]
  }
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return { ...handleCartEvent(state, action, 1) }
    case actionTypes.REMOVE_FROM_CART:
      return { ...handleCartEvent(state, action, -1) }
    case actionTypes.CLEAR_FROM_CART:
      return { ...handleCartEvent(state, action, 0) }
    case actionTypes.CHECKOUT_CART_SUCCEED:
      return { ...state, msg: action.response.msg }
    case actionTypes.CHECKOUT_CART_RESET:
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

export default cartReducer

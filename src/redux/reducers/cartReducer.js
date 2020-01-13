import actions from '../actions/actions'

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

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TO_CART:
      return { ...handleCartEvent(state, action, 1) }
    case actions.REMOVE_FROM_CART:
      return { ...handleCartEvent(state, action, -1) }
    case actions.CLEAR_FROM_CART:
      return { ...handleCartEvent(state, action, 0) }
    case actions.CHECKOUT_CART_SUCCEED:
      return { ...state, msg: action.response.msg }
    case actions.CHECKOUT_CART_RESET:
      return {
        ...state,
        msg: ''
      }
    case actions.APPLY_PROMO_CODE_SUCCEED:
      return { ...state, promoCode: action.response }
    default:
      return state
  }
}

export default cart

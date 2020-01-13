import actions, { selectProductsTypes } from '../actions/actions'

const initialState = {
  selectedProducts: [],
  msg: '',
  promoCode: { discounttype: '', amount: 0 }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actions.SELECT_PRODUCTS:
      const items = [...state.selectedProducts]
      const item = items.find(el => el.sku === action.item.sku)
      if (item) {
        switch (action.mode) {
          case selectProductsTypes.INC:
            item.selectedNum++
            break
          case selectProductsTypes.DEC:
            item.selectedNum--
            break
          case selectProductsTypes.REMOVE:
            item.selectedNum = 0
            break
          default:
            break
        }
      } else {
        items.push({ ...action.item, selectedNum: 1 })
      }

      return {
        ...state,
        selectedProducts: [...items.filter(el => el.selectedNum !== 0)]
      }
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

import actionTypes, { selectProductsTypes } from '../actions/actionTypes'

const initialState = {
  selectedProducts: [],
  msg: '',
  promoCode: { discounttype: '', amount: 0 }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_PRODUCTS:
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
    case actionTypes.CHECKOUT_PRODUCTS_SUCCEED:
      return { ...state, msg: action.response.msg }
    case actionTypes.CHECKOUT_PRODUCTS_RESET:
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

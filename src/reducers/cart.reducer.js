import actionTypes, { selectProductsTypes } from '../actions/actionTypes'

const initialState = {
  selectedProducts: [],
  msg: '',
  promoCode: { discounttype: '', amount: 0 }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCTS_SELECTED:
      let selectedProducts = [...state.selectedProducts]
      if (state.selectedProducts.some(el => el.sku === action.item.sku)) {
        selectedProducts.map(el => {
          if (el.sku === action.item.sku) {
            switch (action.mode) {
              case selectProductsTypes.INC:
                el.selectedNum++
                break
              case selectProductsTypes.DEC:
                el.selectedNum--
                break
              case selectProductsTypes.REMOVE:
                el.selectedNum = 0
                break
              default:
                break
            }
          }
          return el
        })
        return {
          ...state,
          selectedProducts: [
            ...selectedProducts.filter(el => el.selectedNum !== 0)
          ]
        }
      } else {
        return {
          ...state,
          selectedProducts: [
            ...state.selectedProducts,
            { ...action.item, selectedNum: 1 }
          ]
        }
      }
    case actionTypes.CHECKOUT_PRODUCTS_SUCCEED:
      return { ...state, msg: action.response.msg }
    case actionTypes.CHECKOUT_PRODUCTS_RESET:
      return {
        ...state,
        msg: ''
      }
    case actionTypes.CHECK_PROMO_CODE_SUCCEED:
      return { ...state, promoCode: action.response }
    default:
      return state
  }
}

export default cart

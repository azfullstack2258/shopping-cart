import actionTypes from '../actions/actionTypes'
import { selectProductsTypes } from '../actions/actionTypes'

const initialState = []

const products = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_SUCCEED:
      return [
        ...action.products.map(el => ({
          ...el,
          selectedNum: 0
        }))
      ]
    case actionTypes.PRODUCTS_SELECTED:
      return [
        ...state.map(el => {
          if (el.sku === action.sku) {
            let selectedNum

            switch (action.mode) {
              case selectProductsTypes.INC:
                selectedNum = el.selectedNum + 1
                break
              case selectProductsTypes.DEC:
                selectedNum = el.selectedNum - 1
                break
              case selectProductsTypes.REMOVE:
                selectedNum = 0
                break
              default:
                selectedNum = el.selectedNum
            }

            return {
              ...el,
              selectedNum: selectedNum
            }
          }
          return el
        })
      ]
    default:
      return state
  }
}

export default products

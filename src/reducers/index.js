import { combineReducers } from 'redux'
import products from './products.reducer'
import promoCode from './promo-code.reducer'

const rootReducer = combineReducers({
  products,
  promoCode
})

export default rootReducer

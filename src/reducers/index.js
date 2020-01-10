import { combineReducers } from 'redux'
import products from './products.reducer'
import promoCode from './promo-code.reducer'
import checkoutProducts from './checkout-products.reducer'

const rootReducer = combineReducers({
  products,
  promoCode,
  checkoutProducts
})

export default rootReducer

import { combineReducers } from 'redux'
import products from './productsReducer'
import cart from './cartReducer'

const rootReducer = combineReducers({
  products,
  cart
})

export default rootReducer

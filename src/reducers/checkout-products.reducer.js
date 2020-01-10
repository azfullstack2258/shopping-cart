import actionTypes from '../actions/actionTypes'

const initialState = { msg: '' }

const checkoutProducts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECKOUT_PRODUCTS_SUCCEED:
      return action.response
    default:
      return state
  }
}

export default checkoutProducts

import actionTypes from '../actions/actionTypes'

const initialState = []

const products = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_SUCCEED:
      return action.products
    default:
      return state
  }
}

export default products

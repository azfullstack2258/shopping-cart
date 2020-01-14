import actionTypes from '../actions'

const initialState = []

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_SUCCEED:
      return action.products
    default:
      return state
  }
}

export default productReducer
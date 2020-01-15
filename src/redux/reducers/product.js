import actionTypes from '../actions'

const initialState = []

const product = (state = initialState, action) => {
  if (action.type === actionTypes.FETCH_PRODUCTS_SUCCEED) {
    return action.products
  } else {
    return state
  }
}

export default product

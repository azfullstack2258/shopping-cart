import actions from '../actions/actions'

const initialState = []

const products = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_PRODUCTS_SUCCEED:
      return action.products
    default:
      return state
  }
}

export default products

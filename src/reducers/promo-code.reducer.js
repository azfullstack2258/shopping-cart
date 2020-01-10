import actionTypes from '../actions/actionTypes'

const initialState = { discounttype: '', amount: 0 }

const promoCode = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_PROMO_CODE_SUCCEED:
      return action.response
    default:
      return state
  }
}

export default promoCode

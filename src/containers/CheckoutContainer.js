import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAllPrice, getSelectedProducts } from '../selectors'
import { checkPromoCode, selectProducts } from '../actions'
import Checkout from '../components/Checkout'
import '../styles/layouts/Checkout.scss'

const mapStateToProps = state => ({
  allPrice: getAllPrice(state),
  selectedProducts: getSelectedProducts(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      checkPromoCode,
      selectProducts
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getAllPrice,
  getCheckoutProductsStatus,
  getSelectedProducts
} from '../selectors'
import {
  checkoutProducts,
  applyPromoCode,
  selectProducts,
  checkoutProductsReset
} from '../actions'
import Checkout from '../components/Checkout'
import '../styles/layouts/Checkout.scss'

const mapStateToProps = state => ({
  allPrice: getAllPrice(state),
  selectedProducts: getSelectedProducts(state),
  checkoutProductsStatus: getCheckoutProductsStatus(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      applyPromoCode,
      selectProducts,
      checkoutProducts,
      checkoutProductsReset
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

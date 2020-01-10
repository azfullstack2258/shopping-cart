import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getProducts } from '../selectors'
import { selectProducts } from '../actions'
import Products from '../components/Products'

const mapStateToProps = state => ({
  products: getProducts(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      selectProducts
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)

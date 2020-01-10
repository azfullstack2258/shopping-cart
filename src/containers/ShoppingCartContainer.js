import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchProducts } from '../actions'
import { getSelectedTotalNum } from '../selectors'
import ProductsContainer from './ProductsContainer'
import CheckoutContainer from './CheckoutContainer'
import '../styles/pages/ShoppingCart.scss'

class ShoppingCartContainer extends React.Component {
  render() {
    const { selectedTotalNum } = this.props

    return (
      <Router>
        <Switch>
          <Route path="/checkout">
            <CheckoutContainer selectedTotalNum={selectedTotalNum} />
          </Route>
          <Route path="/">
            <ProductsContainer selectedTotalNum={selectedTotalNum} />
          </Route>
        </Switch>
      </Router>
    )
  }

  componentDidMount() {
    this.props.fetchProducts()
  }
}

const mapStateToProps = state => ({
  selectedTotalNum: getSelectedTotalNum(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      fetchProducts
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartContainer)

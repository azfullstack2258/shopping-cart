import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Products from './Products'
import Checkout from './Checkout'
import { fetchProductsRequest } from '../redux/actions'
import { getCartItemsCount } from '../selectors'
import '../styles/pages/ShoppingCart.scss'

class ShoppingCart extends React.Component {
  componentDidMount () {
    this.props.fetchProductsRequest()
  }

  render () {
    const { cartItemsCount } = this.props

    return (
      <Router>
        <Switch>
          <Route path="/checkout">
            <Checkout cartItemsCount={cartItemsCount} />
          </Route>
          <Route path="/">
            <Products cartItemsCount={cartItemsCount} />
          </Route>
        </Switch>
      </Router>
    )
  }
}

ShoppingCart.propTypes = {
  cartItemsCount: PropTypes.number,
  fetchProductsRequest: PropTypes.func
}

const mapStateToProps = state => ({
  cartItemsCount: getCartItemsCount(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      fetchProductsRequest
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)

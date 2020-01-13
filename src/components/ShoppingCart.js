import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Products from './Products'
import Checkout from './Checkout'
import { fetchProductsRequest } from '../actions'
import { getSelectedTotalNum } from '../selectors'
import '../styles/pages/ShoppingCart.scss'

class ShoppingCart extends React.Component {
  render() {
    const { selectedTotalNum } = this.props

    return (
      <Router>
        <Switch>
          <Route path="/checkout">
            <Checkout selectedTotalNum={selectedTotalNum} />
          </Route>
          <Route path="/">
            <Products selectedTotalNum={selectedTotalNum} />
          </Route>
        </Switch>
      </Router>
    )
  }

  componentDidMount() {
    this.props.fetchProductsRequest()
  }
}

const mapStateToProps = state => ({
  selectedTotalNum: getSelectedTotalNum(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      fetchProductsRequest
    },
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart)

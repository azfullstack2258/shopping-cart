import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductsContainer from './ProductsContainer'
import CheckoutContainer from './CheckoutContainer'

const ShoppingCartContainer = () => {
  return (
    <Router>
      <Switch>
        <Route path="/checkout">
          <CheckoutContainer />
        </Route>
        <Route path="/">
          <ProductsContainer />
        </Route>
      </Switch>
    </Router>
  )
}

export default ShoppingCartContainer

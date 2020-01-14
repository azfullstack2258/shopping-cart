import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ShoppingCart from './containers/ShoppingCart'
import store from './redux/store'
import './index.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <ShoppingCart />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()

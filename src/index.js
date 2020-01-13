import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import ShoppingCart from './containers/ShoppingCart'
import rootReducer from './redux/reducers'
import rootSagas from './redux/sagas'
import './index.css'
import * as serviceWorker from './serviceWorker'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const sagaMiddleware = createSagaMiddleware()
const middleware = composeEnhancers(applyMiddleware(sagaMiddleware))
const store = createStore(rootReducer, middleware)

sagaMiddleware.run(rootSagas)

ReactDOM.render(
  <Provider store={store}>
    <ShoppingCart />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()

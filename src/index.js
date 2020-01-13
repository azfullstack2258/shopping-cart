import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import ShoppingCartContainer from './containers/ShoppingCartContainer'
import rootReducer from './reducers'
import rootSagas from './reducers/sagas'
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
    <ShoppingCartContainer />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()

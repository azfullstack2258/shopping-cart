import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const sagaMiddleware = createSagaMiddleware()
const middleware = composeEnhancers(applyMiddleware(sagaMiddleware))
const store = createStore(rootReducer, middleware)
sagaMiddleware.run(rootSaga)

export default store

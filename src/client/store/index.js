import { createStore, applyMiddleware, combineReducers } from 'redux';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from '../reducer';

let logger = (process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined') ? createLogger() : [];

export default function configureStore(initialState, appendage = []) {
  const reducer = combineReducers(reducers);
  const middlewares = applyMiddleware.apply(null, appendage.concat(
    thunkMiddleware,
    logger
  ));

  let createStoreWithMiddleware = middlewares(createStore);

  return createStoreWithMiddleware(reducer, initialState);
}

import { DefaultRootState } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose, StoreEnhancer } from 'redux';
import * as createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import modal, { modalState } from './modal';

export interface AppState extends DefaultRootState {
  modal: modalState;
}

const rootReducer = combineReducers({
  modal
});

let enhancer: StoreEnhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = createLogger.default;
  enhancer = compose(applyMiddleware(thunk, logger));
}

export default function configureStore(preloadedState: any) {
  return createStore(rootReducer, preloadedState, enhancer);
}
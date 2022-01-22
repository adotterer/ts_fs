import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

import App from './App';
import Modal from './components/Modal';
import configureStore from './store';

import './index.css';

export interface CustomWindow extends Window {
  store: any;
}

declare let window: CustomWindow;

const Root: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const store = configureStore(undefined);

if(process.env.NODE_ENV !== "production") {
  window.store = store;
}

render(
  <Provider store={ store }>
    <Root />
    <Modal />
  </Provider>,
  document.getElementById('root')
);
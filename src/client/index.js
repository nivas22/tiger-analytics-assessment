import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import {BrowserRouter} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import App from './app';
import reducer from './store/reducer';
import * as serviceWorker from './serviceWorker';
import { ProductProvider } from './contexts/Product';

const store = createStore(reducer);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ProductProvider>
        <App />
      </ProductProvider>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

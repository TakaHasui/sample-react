import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

// Provider: storeをアプリケーション内部のどのcomponentからも参照できるようにする
import { Provider } from 'react-redux';

import './index.css';
import reducer from './reducers'
import App from './components/App';
import reportWebVitals from './reportWebVitals';

// storeはアプリ内部で唯一のもの。全てのstateはこのstoreに集約されている
const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

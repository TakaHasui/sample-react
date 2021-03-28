import React from 'react';
import ReactDOM from 'react-dom';
// applyMiddleware: ミドルウェアを適応するための関数
import { createStore, applyMiddleware } from 'redux';
// Provider: storeをアプリケーション内部のどのcomponentからも参照できるようにする
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './index.css';
import reducer from './reducers'
import EventsIndex from './components/events_index';
import reportWebVitals from './reportWebVitals';

// storeはアプリ内部で唯一のもの。全てのstateはこのstoreに集約されている
const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
      {/*
      <Route exact path="/events/new" component={EventNew} />
        */}
        <Route exact path="/" component={EventsIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

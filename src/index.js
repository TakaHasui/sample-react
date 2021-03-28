import React from 'react';
import ReactDOM from 'react-dom';
// applyMiddleware: ミドルウェアを適応するための関数
import { createStore, applyMiddleware } from 'redux';
// Provider: storeをアプリケーション内部のどのcomponentからも参照できるようにする
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import './index.css';
import reducer from './reducers'
import EventsIndex from './components/events_index';
import EventsNew from './components/events_new';
import EventsShow from './components/events_show';
import reportWebVitals from './reportWebVitals';

const enhancer = process.env.NODE_ENV === 'development' ?
  composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
// storeはアプリ内部で唯一のもの。全てのstateはこのstoreに集約されている
const store = createStore(reducer, enhancer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {/* exact属性 : URLをマッチ条件を厳しくする */}
        <Route path="/events/new" component={EventsNew} />
        <Route path="/events/:id" component={EventsShow} />
        <Route exact path="/" component={EventsIndex} />
        <Route exact path="/events" component={EventsIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

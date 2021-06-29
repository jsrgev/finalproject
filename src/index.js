import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';

import {reducer} from './redux/reducer.js';

const middleware = [thunk];

// const composeEnhancers = composeWithDevTools({
//   // options like actionSanitizer, stateSanitizer
// });

// const store = createStore(
//   reducer, compose(applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//   );

// const store = createStore(
//   reducer,
//   /* preloadedState, */
//   composeEnhancers(
//   applyMiddleware(...middleware),
//   // other store enhancers if any
// ));


const store = createStore(
  reducer,
  // initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

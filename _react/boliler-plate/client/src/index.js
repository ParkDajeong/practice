import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducers";

// Redux의 기본 Store는 객체만 받을 수 있기 때문에,(store에서 언제나, 항상 객체 형태의 action만 받진 않음.)
// redux-promise, redux-thunk 미들웨어를 사용하여 Promise와 Function도 받을 수 있도록 설정한다.
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

// Redux에서 제공하는 Provider을 이용하여 App과 Redux를 연결.
// window.__REDUX_DEVTOOLS_EXTENSION__  ==> chrome의 확장 프로그램과 연결
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { store } from "store";

import "antd/dist/antd.css";
import "styles/main.scss";

import { ConfigProvider } from "antd";
import "moment/locale/tr";
import locale from "antd/lib/locale/tr_TR";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

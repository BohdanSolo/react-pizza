import React from "react";
import ReactDOM from "react-dom";
import store from "./Redux/store";

import "./scss/app.scss";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="wrapper">
          <App />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

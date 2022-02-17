import React from "react";
import ReactDOM from "react-dom";
import { IconContext } from "react-icons";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import App from "./App";
import store from "./Redux/store";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <IconContext.Provider value={{ className: "global__icon" }}>
      <Router>
        <ToastProvider PlacementType="bottom-left">
          <App />
        </ToastProvider>
      </Router>
    </IconContext.Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

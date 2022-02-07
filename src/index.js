import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/compat/app";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    <App />
  </>,
  rootElement
);

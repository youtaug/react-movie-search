import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css"; // 全体のスタイルをまとめて書く想定なら

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

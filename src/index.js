import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter,HashRouter, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <HashRouter >
    <Route component={App}/>
  </HashRouter>,
  document.getElementById('root'));

// ReactDOM.render(
//     <HashRouter>
//         <App />
//     </HashRouter>,
//     document.getElementById("root")
// );

serviceWorker.unregister();

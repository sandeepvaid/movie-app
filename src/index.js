import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import thunk from "redux-thunk";
import App from "./components/App";
import rootReducer from "./reducers";

//First way to write the middlewear
// const logger = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       //middleware code
//       console.log("ACTION_TYPE= ", action.type);
//       next(action);
//     };
//   };
// };

//Second way to write the middlewear
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    //logger code
    if (typeof action !== "function") {
      console.log("ACTION_TYPE= ", action.type);
    }

    next(action);
  };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const thunk =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     //logger code
//     if (typeof action === "function") {
//       action(dispatch);
//     }
// next(action);
//   };

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);
console.log(store);
// console.log("store", store);
// console.log("Before state", store.getState());

// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{ name: "thor" }],
// });

// console.log("After state", store.getState());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

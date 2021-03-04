import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import App from "./components/App";
import auth from "./redux/reducers/auth";
import alert from "./redux/reducers/alert";

const enhancer = compose(applyMiddleware(thunk));

const store = createStore(combineReducers({ auth, alert }), enhancer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

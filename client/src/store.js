import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducers from "./reducers/authReducers";
import errorReducers from "./reducers/errorReducers";

const store = createStore(combineReducers({
    auth: authReducers,
    errors: errorReducers
}), applyMiddleware(thunk))

export default store
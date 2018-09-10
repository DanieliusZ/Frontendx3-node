import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import panel from "./reducers/panel";
import user from "./reducers/user";

const initialState = {};

const store = createStore(
  combineReducers({panel, user}),
  initialState,
  applyMiddleware(thunk)
);

export default store;
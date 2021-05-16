import allReducers from "../Reducers/index";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;

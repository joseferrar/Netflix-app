import { combineReducers } from "redux";
import HomeRenderer from "./HomeReducer";
import TrandingReducer from "./TrandingReducer";

const allReducers = combineReducers({
  home: HomeRenderer,
  tranding: TrandingReducer
});

export default allReducers;

import { createStore, combineReducers } from "redux";
import { sideBarCollapsed } from "./reducer/sideBarCollapsed.js";

const rootReducer = combineReducers({
  sideBarCollapsed,
});

export const store = createStore(rootReducer);

import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { maintenanceReducer } from "./reducers/maintenance.reducer";
import { thunk } from "redux-thunk";
import { chatReducer } from "./reducers/support.reducer";


const rootReducer = combineReducers({
  maintenance: maintenanceReducer,
  chat: chatReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;

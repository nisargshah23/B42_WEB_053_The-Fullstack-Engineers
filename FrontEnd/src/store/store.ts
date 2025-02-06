import { createStore, applyMiddleware, combineReducers } from "redux";

import { maintenanceReducer } from "./reducers/maintenance.reducer";
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({
  maintenance: maintenanceReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;

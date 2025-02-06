import { createStore, applyMiddleware, combineReducers } from "redux";

import { maintenanceReducer } from "./reducers/maintenance.reducer";
import { thunk } from "redux-thunk";
import { driverReducer } from "./reducers/driver.reducer";


const rootReducer = combineReducers({
  maintenance: maintenanceReducer,
  drivers: driverReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;

import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { maintenanceReducer } from "./reducers/maintenance.reducer";
import { thunk } from "redux-thunk";
import { driverReducer } from "./reducers/driver.reducer";
import { vehicleReducer } from "./reducers/VehicleReducer";
import { chatReducer } from "./reducers/support.reducer";

const rootReducer = combineReducers({
  maintenance: maintenanceReducer,
  drivers: driverReducer,
  vehicles:vehicleReducer,
  chat: chatReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;

import { createStore, applyMiddleware, combineReducers } from "redux";

import { maintenanceReducer } from "./reducers/maintenance.reducer";
import { thunk } from "redux-thunk";
import { driverReducer } from "./reducers/driver.reducer";
import { vehicleReducer } from "./reducers/VehicleReducer";


const rootReducer = combineReducers({
  maintenance: maintenanceReducer,
  drivers: driverReducer,
  vehicles:vehicleReducer
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;

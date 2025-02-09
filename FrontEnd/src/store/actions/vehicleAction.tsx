import axios from "axios";
import { Dispatch } from "redux";
import { MaintenanceFormData, VehicleFormData } from "../../types";
import { ThunkDispatch } from "redux-thunk";
import { v4 as uuidv4 } from 'uuid';


const API_URL =
  "https://fleetmanagement-12-default-rtdb.firebaseio.com/Vehicle";

export const FETCH_VEHICLE = "FETCH_VEHICLE";
export const ADD_VEHICLE = "ADD_VEHICLE";
export const UPDATE_VEHICLE = "UPDATE_VEHICLE";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export type AppDispatch = ThunkDispatch<
  any,
  any,
  { type: string; payload?: any }
>;

export const fetchVehicle = () => async (dispatch: AppDispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axios.get(`${API_URL}.json`);
    const data = response.data;
    console.log("inside the action function")

    const vehicleArray = data
      ? Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }))
      : [];
      console.log(vehicleArray)
    dispatch({ type: FETCH_VEHICLE, payload: vehicleArray });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: "Failed to fetch maintenance records",
    });
  }
  dispatch({ type: SET_LOADING, payload: false });
};

export const addVehicle =
  (vehicle: VehicleFormData) => async (dispatch: AppDispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    console.log(vehicle);

    try {
      const response = await axios.post(`${API_URL}.json`, {
        ...vehicle
      });
      const newMaintenance = {
        ...vehicle,
        id: uuidv4()
      };
      dispatch({ type: ADD_VEHICLE, payload: newMaintenance });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: "Failed to add maintenance record",
      });
    }
    dispatch({ type: SET_LOADING, payload: false });
  };

// export const updateMaintenance =
//   (id: string, maintenance: MaintenanceFormData) =>
//   async (dispatch: AppDispatch) => {
//     dispatch({ type: SET_LOADING, payload: true });
//     try {
//       await axios.put(`${API_URL}/${id}.json`, {
//         ...maintenance,
//         cost: parseFloat(maintenance.cost),
//       });
//       dispatch({
//         type: UPDATE_MAINTENANCE,
//         payload: {
//           id,
//           data: { ...maintenance, cost: parseFloat(maintenance.cost) },
//         },
//       });
//     } catch (error) {
//       dispatch({
//         type: SET_ERROR,
//         payload: "Failed to update maintenance record",
//       });
//     }
//     dispatch({ type: SET_LOADING, payload: false });
//   };

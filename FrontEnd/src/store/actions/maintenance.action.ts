import axios from "axios";
import { MaintenanceFormData } from "../../types";
import { ThunkDispatch } from "redux-thunk";

const API_URL =
  "https://fleetmanagement-12-default-rtdb.firebaseio.com/maintenance";

export const FETCH_MAINTENANCE = "FETCH_MAINTENANCE";
export const ADD_MAINTENANCE = "ADD_MAINTENANCE";
export const UPDATE_MAINTENANCE = "UPDATE_MAINTENANCE";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export type AppDispatch = ThunkDispatch<
  any,
  any,
  { type: string; payload?: any }
>;

export const fetchMaintenance = () => async (dispatch: AppDispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axios.get(`${API_URL}.json`);
    const data = response.data;
    

    const maintenanceArray = data
      ? Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }))
      : [];
    dispatch({ type: FETCH_MAINTENANCE, payload: maintenanceArray });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: "Failed to fetch maintenance records",
    });
  }
  dispatch({ type: SET_LOADING, payload: false });
};

export const addMaintenance =
  (maintenance: MaintenanceFormData) => async (dispatch: AppDispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    console.log(maintenance);

    try {
      const response = await axios.post(`${API_URL}.json`, {
        ...maintenance,
        cost: parseFloat(maintenance.cost),
      });
      const newMaintenance = {
        ...maintenance,
        id: response.data.name,
        cost: parseFloat(maintenance.cost),
      };
      dispatch({ type: ADD_MAINTENANCE, payload: newMaintenance });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: "Failed to add maintenance record",
      });
    }
    dispatch({ type: SET_LOADING, payload: false });
  };

export const updateMaintenance =
  (id: string, maintenance: MaintenanceFormData) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      await axios.put(`${API_URL}/${id}.json`, {
        ...maintenance,
        cost: parseFloat(maintenance.cost),
      });
      dispatch({
        type: UPDATE_MAINTENANCE,
        payload: {
          id,
          data: { ...maintenance, cost: parseFloat(maintenance.cost) },
        },
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: "Failed to update maintenance record",
      });
    }
    dispatch({ type: SET_LOADING, payload: false });
  };

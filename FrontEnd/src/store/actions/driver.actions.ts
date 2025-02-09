import axios from "axios";
import { Driver, MaintenanceFormData } from "../../types";
import { ThunkDispatch } from "redux-thunk";

const API_URL =
  "https://fleetmanagement-12-default-rtdb.firebaseio.com/Driver";

export const FETCH_DRIVER = "FETCH_DRIVER";
export const ADD_DRIVER = "ADD_DRIVER";
export const UPDATE_DRIVER = "UPDATE_DRIVER";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export type AppDispatch = ThunkDispatch<
  any,
  any,
  { type: string; payload?: any }
>;

export const fetchDrivers = () => async (dispatch: AppDispatch) => { 
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axios.get(`${API_URL}.json`);
    const data = response.data;
    

    const DriversArray = data
      ? Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }))
      : [];
    dispatch({ type: FETCH_DRIVER, payload: DriversArray });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: "Failed to fetch Drivers. ",
    });
  }
  dispatch({ type: SET_LOADING, payload: false });
};

export const addDrivers =
  (driver: Driver) => async (dispatch: AppDispatch) => { debugger;
    dispatch({ type: SET_LOADING, payload: true });
    // console.log(driver);

    try {
      const response = await axios.post(`${API_URL}.json`, {
        ...driver
      });
      // console.log(response)
      const newDriver = {
        ...driver,
        
      };
      dispatch({ type: ADD_DRIVER, payload: newDriver });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: "Failed to add maintenance record",
      });
    }
    dispatch({ type: SET_LOADING, payload: false });
  };

export const updateDriver =
  (id: string, driver: Driver) =>
  async (dispatch: AppDispatch) => { debugger
    dispatch({ type: SET_LOADING, payload: true });
    try {
      await axios.put(`${API_URL}/${id}.json`, {
        ...driver,
      });
      dispatch({
        type: UPDATE_DRIVER,
        payload: {
          id,
          data: { ...driver, },
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

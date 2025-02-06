import { Driver } from "../../types";
import { ADD_DRIVER, FETCH_DRIVER, UPDATE_DRIVER, SET_ERROR, SET_LOADING } from "../actions/driver.actions";

interface DriverStateType {
    records: Driver[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: DriverStateType = {
    records: [],
    loading: false,
    error: null
  };
  
  export const driverReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_DRIVER:
        return {
          ...state,
          records: action.payload,
          error: null
        };
      case ADD_DRIVER:
        return {
          ...state,
          records: [...state.records, action.payload],
          error: null
        };
      case UPDATE_DRIVER:
        return {
          ...state,
          records: state.records.map(record =>
            record.id === action.payload.id
              ? { ...record, ...action.payload.data }
              : record
          ),
          error: null
        };
      case SET_LOADING:
        return {
          ...state,
          loading: action.payload
        };
      case SET_ERROR:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
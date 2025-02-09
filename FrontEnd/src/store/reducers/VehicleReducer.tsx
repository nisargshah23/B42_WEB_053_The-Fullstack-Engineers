import { MaintenanceRecord, Vehicle } from "../../types";
import { ADD_MAINTENANCE, FETCH_MAINTENANCE, SET_ERROR, SET_LOADING, UPDATE_MAINTENANCE } from "../actions/maintenance.action";
import { ADD_VEHICLE, FETCH_VEHICLE } from "../actions/vehicleAction";

interface VechicleState {
    records: Vehicle[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: VechicleState = {
    records: [],
    loading: false,
    error: null
  };
  
  export const vehicleReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_VEHICLE:
        console.log(action.payload)
        return {
          ...state,
          records: action.payload,
          error: null
        };
      case ADD_VEHICLE:
        console.log("action:",action.payload)
        return {
          ...state,
          records: [...state.records, action.payload],
          error: null
        };
    //   case UPDATE_MAINTENANCE:
    //     return {
    //       ...state,
    //       records: state.records.map(record =>
    //         record.id === action.payload.id
    //           ? { ...record, ...action.payload.data }
    //           : record
    //       ),
    //       error: null
    //     };
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

import { AnyAction } from "redux";
import { ChatState } from "../../types";
import {
  ChatActionTypes,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  SET_ERROR,
  SET_LOADING,
} from "../actions/support.action";

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
};

export const chatReducer = (
  state = initialState,
  action: AnyAction
): ChatState => {
  switch (action.type) {
    case SEND_MESSAGE:
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

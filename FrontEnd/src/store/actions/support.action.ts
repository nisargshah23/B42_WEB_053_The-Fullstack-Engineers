import { ThunkAction } from "redux-thunk";
import { Message } from "../../types";
import { RootState } from "../store";
import { chatHistory } from "../../types/chatHistory";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export interface SendMessageAction {
  type: typeof SEND_MESSAGE;
  payload: Message;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export interface ReceiveMessageAction {
  type: typeof RECEIVE_MESSAGE;
  payload: Message;
}

export type ChatActionTypes =
  | SendMessageAction
  | SetLoadingAction
  | SetErrorAction
  | ReceiveMessageAction;

// Action Creators
export const sendMessage = (
  message: string
): ThunkAction<void, RootState, unknown, ChatActionTypes> => {
  return async (dispatch) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    // Add user message to chat history
    chatHistory.push({ role: "user", parts: [{ text: message }] });

    dispatch({ type: SEND_MESSAGE, payload: userMessage });
    dispatch({ type: SET_LOADING, payload: true });

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBd2nZ1UpkGhRksXNZYaT8rQHGDDV43KjE`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: chatHistory,
          }),
        }
      );

      const data = await response.json();
      const botResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I could not understand that.";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      dispatch({ type: RECEIVE_MESSAGE, payload: botMessage });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: "Failed to get response from the bot",
      });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};

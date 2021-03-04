import { SET_ALERT, REMOVE_ALERT } from "../types";

const intialState = [];

export default function alert(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

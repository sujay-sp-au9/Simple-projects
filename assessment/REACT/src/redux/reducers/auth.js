import {
  AUTH_ERROR,
  LOGOUT,
  USER_LOADED,
  DEFAULT_PASSWORD_CHANGED,
} from "../types";

const intialState = {
  token: localStorage.getItem("AuthIdToken"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function auth(state = intialState, action) {
  const { payload, type } = action;

  switch (type) {
    case DEFAULT_PASSWORD_CHANGED:
      return {
        ...state,
        user: { ...state.user, defaultPassword: false },
      };
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        token: localStorage.getItem("AuthIdToken"),
        user: payload.userProfile,
        isAuthenticated: true,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("AuthIdToken");
      return {
        ...state,
        token: null,
        user: null,
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

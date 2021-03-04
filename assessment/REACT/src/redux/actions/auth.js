import axios from 'axios';
import JwtDecode from 'jwt-decode';

import setAuthToken from '../../utils/setAuthToken';
import {
  AUTH_ERROR,
  LOGOUT,
  USER_LOADED,
  DEFAULT_PASSWORD_CHANGED,
} from '../types';
import { setAlert } from './alert';

import { apiURL } from '../../utils/globalUrls';

export const getInitialUserData = (id, token) => async (dispatch) => {
  setAuthToken(token);
  localStorage.setItem('AuthIdToken', token);
  try {
    const res = await axios.get(`${apiURL}/users/${id}`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const updateUserData = () => async (dispatch) => {
  const token = localStorage.getItem('AuthIdToken');
  if (token) {
    const decodedToken = JwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      dispatch(logout());
      window.location.href = `http://localhost:3000/log`;
    } else {
      dispatch(getInitialUserData(decodedToken._id, token));
    }
  }
};

export const changePassword = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${apiURL}/users/change-password`, data);
    if (res.status === 200) {
      dispatch(setAlert('Password changed successfully.', 'success'));
      dispatch({ type: DEFAULT_PASSWORD_CHANGED });
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    dispatch(setAlert('Incorrect Current Password', 'error'));
    return false;
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(setAlert('Logged out successfully.', 'success'));
};

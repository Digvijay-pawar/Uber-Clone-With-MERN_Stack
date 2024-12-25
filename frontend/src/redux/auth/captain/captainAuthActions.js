import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
  } from "./captainAuthTypes";
  
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  export const loginRequest = (credentials) => ({
    type: LOGIN_REQUEST,
    payload: credentials,
  });
  
  export const loginSuccess = (captain) => ({
    type: LOGIN_SUCCESS,
    payload: captain,
  });
  
  export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
  });
  
  export const logoutRequest = () => ({
    type: LOGOUT_REQUEST,
  });
  
  export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
  });
  
  export const logoutFailure = (error) => ({
    type: LOGOUT_FAILURE,
    payload: error,
  });
  
  export const registerRequest = (captainData) => ({
    type: REGISTER_REQUEST,
    payload: captainData,
  });
  
  export const registerSuccess = (captain) => ({
    type: REGISTER_SUCCESS,
    payload: captain,
  });
  
  export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error,
  });
  
  // Pass `navigate` from the calling component
  export const captainLogin = (credentials, navigate) => {
    return async (dispatch) => {
      dispatch(loginRequest(credentials));
      try {
        const response = await fetch(`${BASE_URL}/captains/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(loginSuccess(data));
          localStorage.setItem("captainToken", data.token);
          navigate("/captain-home");
        } else {
          dispatch(loginFailure(data.message));
        }
      } catch (error) {
        dispatch(loginFailure("An error occurred"));
      }
    };
  };
  
  export const captainLogout = (navigate) => {
    return async (dispatch) => {
      dispatch(logoutRequest());
      try {
        const response = await fetch(`${BASE_URL}/captains/logout`);
        const data = await response.json();
        if (response.ok) {
          dispatch(logoutSuccess());
          localStorage.removeItem("captainToken");
          navigate("/captain-login");
        } else {
          dispatch(logoutFailure(data.message));
        }
      } catch (error) {
        dispatch(logoutFailure("An error occurred"));
      }
    };
  };
  
  export const captainRegister = (captainData, navigate) => {
    return async (dispatch) => {
      dispatch(registerRequest(captainData));
      try {
        const response = await fetch(`${BASE_URL}/captains/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(captainData),
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(registerSuccess(data));
          localStorage.setItem("captainToken", data.token);
          navigate("/captain-home");
        } else {
          dispatch(registerFailure(data.message));
        }
      } catch (error) {
        dispatch(registerFailure("An error occurred"));
      }
    };
  };
  

  
  export const captainProfile = (navigate) => {
    return async (dispatch) => {
      dispatch(loginRequest());
      try {
        const response = await fetch(`${BASE_URL}/captains/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("captainToken")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(loginSuccess(data));
        } else {
          dispatch(loginFailure(data.message));
          navigate("/captain-login");
        }
      } catch (error) {
        dispatch(loginFailure("An error occurred"));
      }
    };
  };
    
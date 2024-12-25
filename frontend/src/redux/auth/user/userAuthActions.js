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
  } from "./userAuthTypes";
  
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  export const loginRequest = (credentials) => ({
    type: LOGIN_REQUEST,
    payload: credentials,
  });
  
  export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
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
  
  export const registerRequest = (userData) => ({
    type: REGISTER_REQUEST,
    payload: userData,
  });
  
  export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user,
  });
  
  export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error,
  });
  
  // Pass `navigate` from the calling component
  export const userLogin = (credentials, navigate) => {
    return async (dispatch) => {
      dispatch(loginRequest(credentials));
      try {
        const response = await fetch(`${BASE_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(loginSuccess(data));
          localStorage.setItem("userToken", data.token);
          navigate("/home");
        } else {
          dispatch(loginFailure(data.message));
        }
      } catch (error) {
        dispatch(loginFailure("An error occurred"));
      }
    };
  };
  
  export const userLogout = (navigate) => {
    return async (dispatch) => {
      dispatch(logoutRequest());
      try {
        const response = await fetch(`${BASE_URL}/users/logout`);
        const data = await response.json();
        if (response.ok) {
          dispatch(logoutSuccess());
          localStorage.removeItem("userToken");
          navigate("/user-login");
        } else {
          dispatch(logoutFailure(data.error));
        }
      } catch (error) {
        dispatch(logoutFailure("An error occurred"));
      }
    };
  };
  
  export const userRegister = (userData, navigate) => {
    return async (dispatch) => {
      dispatch(registerRequest(userData));
      try {
        const response = await fetch(`${BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(registerSuccess(data));
          localStorage.setItem("userToken", data.token);
          navigate("/home");
        } else {
          dispatch(registerFailure(data.message));
        }
      } catch (error) {
        dispatch(registerFailure("An error occurred"));
      }
    };
  };

export const userProfile = (navigate) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await fetch(`${BASE_URL}/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess(data));
      } else {
        dispatch(loginFailure(data.message));
        navigate("/user-login");
      }
    } catch (error) {
      dispatch(loginFailure("An error occurred"));
    }
  };
};
  
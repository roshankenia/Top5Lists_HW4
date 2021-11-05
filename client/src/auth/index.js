import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
  GET_LOGGED_IN: "GET_LOGGED_IN",
  REGISTER_USER: "REGISTER_USER",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
};

function AuthContextProvider(props) {
  const [auth, setAuth] = useState({
    user: null,
    loggedIn: false,
  });
  const history = useHistory();

  useEffect(() => {
    auth.getLoggedIn();
  }, []);

  const authReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case AuthActionType.GET_LOGGED_IN: {
        return setAuth({
          user: payload.user,
          loggedIn: payload.loggedIn,
        });
      }
      case AuthActionType.REGISTER_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
        });
      }
      case AuthActionType.LOGIN_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
        });
      }
      case AuthActionType.LOGOUT_USER: {
        return setAuth({
          user: null,
          loggedIn: false,
        });
      }
      default:
        return auth;
    }
  };

  auth.logoutUser = async function () {
    //const response = await api.logoutUser();
    let response = { status: 200 };
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.LOGOUT_USER,
        payload: null,
      });
      document.cookie =
        "token=nothing; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      history.push("/");
    }
  };

  auth.getLoggedIn = async function () {
    try {
      const response = await api.getLoggedIn();
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.SET_LOGGED_IN,
          payload: {
            loggedIn: response.data.loggedIn,
            user: response.data.user,
          },
        });
      }
    } catch (error) {
      //document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      console.log("here");
    }
  };

  auth.registerUser = async function (userData, store) {
    try {
      const response = await api.registerUser(userData);
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.REGISTER_USER,
          payload: {
            user: response.data.user,
          },
        });
        history.push("/");
        store.loadIdNamePairs();
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      store.setErrorMessage(error.response.data.errorMessage);
    }
  };

  auth.loginUser = async function (userData, store) {
    const response = await api.loginUser(userData);
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.LOGIN_USER,
        payload: {
          user: response.data.user,
        },
      });
      history.push("/");
      store.loadIdNamePairs();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };

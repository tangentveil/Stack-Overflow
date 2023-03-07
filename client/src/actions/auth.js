import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });

    // setCurrentUser -> from actions
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));

    // navigate to home page after signup
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};


export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });

    // setCurrentUser -> from actions
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));

    // navigate to home page after login
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
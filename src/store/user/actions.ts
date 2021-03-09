import { UserSigninDto } from "dto";
import api from "utils/api";
import {
  SET_SINGIN_ERROR,
  SET_USER_LOADING,
  SIGNIN_USER,
  SIGNOUT_USER,
  UserActionTypes,
  UserThunkActionTypes,
} from "./types";

export const signinUser = (userSigninDto: UserSigninDto): UserThunkActionTypes => async (dispatch) => {
  try {
    dispatch(SetLoading({ signinLoading: true }));
    dispatch({ type: SET_SINGIN_ERROR, payload: { message: undefined } });
    const { data } = await api.post("auth/signin", userSigninDto);

    localStorage.setItem("token", data.token);

    dispatch({ type: SIGNIN_USER, payload: data });
    dispatch(SetLoading({ signinLoading: false }));
    window.location.replace("/dashboard");
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(SetLoading({ signinLoading: false }));
      dispatch({ type: SET_SINGIN_ERROR, payload: { message: error.response.data.message } });
    }
  }
};

export const signoutUser = (): UserThunkActionTypes => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: SIGNOUT_USER });
  // window.location.replace("/");
};

const SetLoading = (data: { loading?: boolean; signinLoading?: boolean }): UserActionTypes => ({
  type: SET_USER_LOADING,
  payload: data,
});

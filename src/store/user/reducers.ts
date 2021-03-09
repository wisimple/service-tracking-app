import {
  SET_SINGIN_ERROR,
  SET_USER_LOADING,
  SIGNIN_USER,
  SIGNOUT_USER,
  UserActionTypes,
  UserState,
} from "./types";

const initialState: UserState = {
  token: localStorage.getItem("token") || undefined,
};

export default function userReducer(state = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case SIGNIN_USER: {
      return { ...state, ...action.payload };
    }

    case SET_SINGIN_ERROR:
      return { ...state, signinErrorMessage: action.payload.message };

    case SET_USER_LOADING:
      return { ...state, ...action.payload };

    case SIGNOUT_USER:
      return { ...initialState, token: undefined };

    default:
      return state;
  }
}

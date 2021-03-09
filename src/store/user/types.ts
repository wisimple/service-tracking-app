import { IUser } from "interfaces";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export interface UserState {
  user?: IUser;
  token?: string;
  loading?: boolean;
  signinLoading?: boolean;
  signinErrorMessage?: string;
}

export const SIGNIN_USER = "SIGNIN_USER";
export const SIGNOUT_USER = "SIGNOUT_USER";

export const SET_SINGIN_ERROR = "SET_SINGIN_ERROR";

export const SET_USER_LOADING = "SET_USER_LOADING";

interface SigninUserAction {
  type: typeof SIGNIN_USER;
  payload: {
    user: IUser;
    token: string;
  };
}

interface SignoutUserAction {
  type: typeof SIGNOUT_USER;
}

interface SetLoadingAction {
  type: typeof SET_USER_LOADING;
  payload: {
    loading?: boolean;
    signinLoading?: boolean;
  };
}

interface SinginErrorAction {
  type: typeof SET_SINGIN_ERROR;
  payload: {
    message?: string;
  };
}

interface SignoutUserAction {
  type: typeof SIGNOUT_USER;
}

export type UserActionTypes = SigninUserAction | SignoutUserAction | SetLoadingAction | SinginErrorAction;

export type UserThunkActionTypes = ThunkAction<void, RootState, unknown, UserActionTypes>;

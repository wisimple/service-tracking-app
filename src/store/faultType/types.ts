import { FaultTypeDto } from "dto";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export interface FaultType extends FaultTypeDto {
  _id: string;
  dAt?: string;
}

export interface FaultTypeState {
  faultTypes: FaultType[];
  selectedItem?: FaultType;
  loading?: boolean;
  cLoading?: boolean;
  dLoading?: boolean;
  uLoading?: boolean;
}

export const FETCH_FAULTTYPES = "FETCH_FAULTYPES";
export const CREATE_FAULTTYPE = "CREATE_FAULTTYPE";
export const UPDATE_FAULTTYPE = "UPDATE_FAULTTYPE";
export const DELETE_FAULTTYPE = "DELETE_FAULTTYPE";
export const SET_FAULTTYPE_LOADING = "SET_FAULTTYPE_LOADING";
export const SELECT_FAULT_TYPE = "SELECT_FAULT_TYPE";

export interface FetchFaultTypeAction {
  type: typeof FETCH_FAULTTYPES;
  payload: {
    faultTypes: FaultType[];
  };
}

export interface CreateFaultTypeAction {
  type: typeof CREATE_FAULTTYPE;
  payload: {
    faultType: FaultType;
  };
}

export interface UpdateFaultTypeAction {
  type: typeof UPDATE_FAULTTYPE;
  payload: {
    faultType: FaultType;
  };
}

export interface DeleteFaultTypeAction {
  type: typeof DELETE_FAULTTYPE;
  payload: {
    faultType: FaultType;
  };
}

export interface SetLoadingAction {
  type: typeof SET_FAULTTYPE_LOADING;
  payload: {
    loading?: boolean;
    cloading?: boolean;
    dloading?: boolean;
  };
}

export interface SelectFaultTypeAction {
  type: typeof SELECT_FAULT_TYPE;
  payload: {
    id: string;
  };
}

export type FaultTypeActionTypes =
  | CreateFaultTypeAction
  | FetchFaultTypeAction
  | UpdateFaultTypeAction
  | DeleteFaultTypeAction
  | SetLoadingAction
  | SelectFaultTypeAction;

export type FaultTypeThunkActionTypes = ThunkAction<void, RootState, unknown, FaultTypeActionTypes>;

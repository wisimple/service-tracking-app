import { ITechicalService, ITechnicalServiceSummary } from "interfaces";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export interface AccountSummaryType {
  totalCost?: number;
  paidAmount?: number;
}

export interface TechnicalServiceState {
  services: ITechicalService[];
  service?: ITechicalService;
  summary?: ITechnicalServiceSummary[];
  loading?: boolean;
  cloading?: boolean;
  uloading?: boolean;
  dloading?: boolean;
  aSloading?: boolean; //account summary loading
  lastTrackingId: number;
  accountSummary?: AccountSummaryType;
}

export const FETCH_TECHNICAL_SERVICES = "FETCH_TECHNICAL_SERVICES";
export const CREATE_TECHNICAL_SERVICE = "CREATE_TECHNICAL_SERVICE";
export const UPDATE_TECHNICAL_SERVICE = "UPDATE_TECHNICAL_SERVICE";
export const DELETE_TECHNICAL_SERVICE = "DELETE_TECHNICAL_SERVICE";
export const GET_TECHNICAL_SERVICE = "GET_TECHNICAL_SERVICE";

export const SET_TECHNICAL_SERVICE_LOADING = "SET_TECHNICAL_SERVICE_LOADING";

export const GET_TECHNICAL_SERVICE_SUMMARY = "GET_TECHNICAL_SERVICE_SUMMARY";
export const GET_TECHNICAL_LAST_TRACKING_ID = "GET_TECHNICAL_LAST_TRACKING_ID";
export const GET_TECHNICAL_SERVICE_ACCOUNT_SUMMARY = "GET_TECHNICAL_SERVICE_ACCOUNT_SUMMARY";

interface FetchTechnicalServicesAction {
  type: typeof FETCH_TECHNICAL_SERVICES;
  payload: {
    services: ITechicalService[];
    accountSummary?: { totalCost: number; paidAmount: number };
  };
}

interface CreateTechnicalServiceAction {
  type: typeof CREATE_TECHNICAL_SERVICE;
  payload: {
    service: ITechicalService;
  };
}

interface UpdateTechnicalServiceAction {
  type: typeof UPDATE_TECHNICAL_SERVICE;
  payload: {
    service: ITechicalService;
  };
}

interface GetTechnicalServiceAction {
  type: typeof GET_TECHNICAL_SERVICE;
  payload: {
    service: ITechicalService;
  };
}

interface DeleteTechnicalServiceAction {
  type: typeof DELETE_TECHNICAL_SERVICE;
  payload: {
    service: ITechicalService;
  };
}

interface SetLoadingAction {
  type: typeof SET_TECHNICAL_SERVICE_LOADING;
  payload: {
    loading?: boolean;
    uloading?: boolean;
    cloading?: boolean;
    dloading?: boolean;
  };
}

interface GetTechnicalServiceSummary {
  type: typeof GET_TECHNICAL_SERVICE_SUMMARY;
  payload: {
    summary: ITechnicalServiceSummary[];
  };
}

interface GetTechnicalServiceLastTrackingIdAction {
  type: typeof GET_TECHNICAL_LAST_TRACKING_ID;
  payload: {
    id: number;
  };
}

interface GetTechnicalServiceAccountSummaryAction {
  type: typeof GET_TECHNICAL_SERVICE_ACCOUNT_SUMMARY;
  payload: {
    accountSummary?: AccountSummaryType;
  };
}

export type TechnicalServiceActionTypes =
  | FetchTechnicalServicesAction
  | CreateTechnicalServiceAction
  | GetTechnicalServiceAction
  | UpdateTechnicalServiceAction
  | DeleteTechnicalServiceAction
  | SetLoadingAction
  | GetTechnicalServiceSummary
  | GetTechnicalServiceLastTrackingIdAction
  | GetTechnicalServiceAccountSummaryAction;

export type TechnicalServiceThunkActionTypes = ThunkAction<
  void,
  RootState,
  unknown,
  TechnicalServiceActionTypes
>;

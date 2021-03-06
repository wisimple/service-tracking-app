import { CustomerDto } from "dto";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export interface Customer extends CustomerDto {
  _id: string;
  cAt: string;
  uAt: string;
  dAt?: string;
}

export interface CustomerState {
  customers: Customer[];
  customer?: Customer;
  loading: boolean;
  cLoading: boolean;
  dLoading: boolean;
}

export const FETCH_CUSTOMERS = "FETCH_CUSTOMERS";
export const SET_CUSTOMERS_LOADING = "SET_CUSTOMERS_LOADING";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
export const GET_CUSTOMER = "GET_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

interface FetchCustomersAction {
  type: typeof FETCH_CUSTOMERS;
  payload: {
    customers: Customer[];
  };
}

interface CreateCustomerAction {
  type: typeof CREATE_CUSTOMER;
  payload: {
    customer: Customer;
  };
}

interface GetCustomerAction {
  type: typeof GET_CUSTOMER;
  payload: {
    customer: Customer;
  };
}

interface UpdateCustomerAction {
  type: typeof UPDATE_CUSTOMER;
  payload: {
    customer: Customer;
  };
}

interface DeleteCustomerAction {
  type: typeof DELETE_CUSTOMER;
  payload: {
    customer: Customer;
  };
}

interface SetLoading {
  type: typeof SET_CUSTOMERS_LOADING;
  payload: {
    loading?: boolean;
    cLoading?: boolean;
    dLoading?: boolean;
  };
}

export type CustomerActionTypes =
  | FetchCustomersAction
  | SetLoading
  | CreateCustomerAction
  | GetCustomerAction
  | UpdateCustomerAction
  | DeleteCustomerAction;

export type CustomerThunkActionTypes = ThunkAction<void, RootState, unknown, CustomerActionTypes>;

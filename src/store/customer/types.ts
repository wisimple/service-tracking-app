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
  loading: boolean;
  cLoading: boolean;
  dLoading: boolean;
}

export const FETCH_CUSTOMERS = "FETCH_CUSTOMERS";
export const SET_CUSTOMERS_LOADING = "SET_CUSTOMERS_LOADING";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";

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

interface SetLoading {
  type: typeof SET_CUSTOMERS_LOADING;
  payload: {
    loading?: boolean;
    cLoading?: boolean;
    dLoading?: boolean;
  };
}

export type CustomerActionTypes = FetchCustomersAction | SetLoading | CreateCustomerAction;

export type CustomerThunkActionTypes = ThunkAction<void, RootState, unknown, CustomerActionTypes>;

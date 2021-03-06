import { CustomerDto } from "dto";
import api from "utils/api";
import {
  CREATE_CUSTOMER,
  CustomerActionTypes,
  CustomerThunkActionTypes,
  FETCH_CUSTOMERS,
  SET_CUSTOMERS_LOADING,
} from "./types";

export const fetchCustomers = (): CustomerThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get("customers");
    dispatch(setLoading({ loading: false }));
    dispatch({ type: FETCH_CUSTOMERS, payload: { customers: data } });
  } catch (error) {}
};

export const createCustomer = (customerDto: CustomerDto): CustomerThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ cLoading: true }));
    const { data } = await api.post("customers", customerDto);

    dispatch({
      type: CREATE_CUSTOMER,
      payload: { customer: data },
    });

    dispatch(setLoading({ cLoading: false }));
  } catch (error) {}
};

const setLoading = (data: {
  cLoading?: boolean;
  loading?: boolean;
  dLoading?: boolean;
}): CustomerActionTypes => {
  return {
    type: SET_CUSTOMERS_LOADING,
    payload: data,
  };
};

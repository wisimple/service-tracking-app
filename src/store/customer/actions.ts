import { CustomerDto } from "dto";
import api from "utils/api";
import {
  CREATE_CUSTOMER,
  CustomerActionTypes,
  CustomerThunkActionTypes,
  DELETE_CUSTOMER,
  FETCH_CUSTOMERS,
  GET_CUSTOMER,
  SET_CUSTOMERS_LOADING,
  UPDATE_CUSTOMER,
} from "./types";

const resourceName = "customers";

export const fetchCustomers = (): CustomerThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get(resourceName);
    dispatch(setLoading({ loading: false }));
    dispatch({ type: FETCH_CUSTOMERS, payload: { customers: data } });
  } catch (error) {}
};

export const createCustomer = (customerDto: CustomerDto): CustomerThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ cLoading: true }));
    const { data } = await api.post(resourceName, customerDto);

    dispatch({
      type: CREATE_CUSTOMER,
      payload: { customer: data },
    });

    dispatch(setLoading({ cLoading: false }));
  } catch (error) {}
};

export const getCustomer = (id: string): CustomerThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get(`${resourceName}/${id}`);

    dispatch({
      type: GET_CUSTOMER,
      payload: { customer: data },
    });
    dispatch(setLoading({ loading: false }));
  } catch (error) {}
};

export const updateCustomer = (id: string, customerDto: CustomerDto): CustomerThunkActionTypes => async (
  dispatch
) => {
  try {
    dispatch(setLoading({ cLoading: true }));
    const { data } = await api.put(`${resourceName}/${id}`, customerDto);
    dispatch({
      type: UPDATE_CUSTOMER,
      payload: { customer: data },
    });
    dispatch(setLoading({ cLoading: false }));
  } catch (error) {}
};

export const deleteCustomer = (id: string): CustomerThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ dLoading: true }));
    const { data } = await api.delete(`${resourceName}/${id}`);
    dispatch({
      type: DELETE_CUSTOMER,
      payload: { customer: data },
    });
    dispatch(setLoading({ dLoading: false }));
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

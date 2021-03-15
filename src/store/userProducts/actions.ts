import { UserProductDto } from "dto";
import api from "utils/api";
import {
  UserProductsThunkActions,
  UserProductsLoadingState,
  SET_USER_PRODUCTS_LOADING,
  GET_ALL_USER_PRODUCTS,
  UserProductsActions,
  CREATE_USER_PRODUCT,
  UPDATE_USER_PRODUCT,
  DELETE_USER_PRODUCT,
} from "./types";

const resourceName = "user-products";

export const getUserProducts = (): UserProductsThunkActions => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get(resourceName);
    dispatch({ type: GET_ALL_USER_PRODUCTS, payload: { products: data } });
    dispatch(setLoading({ loading: false }));
  } catch (error) {
    dispatch(setLoading({ loading: false }));
  }
};

export const createUserProduct = (userProductDto: UserProductDto): UserProductsThunkActions => async (
  dispatch
) => {
  try {
    dispatch(setLoading({ cloading: true }));
    const { data } = await api.post(resourceName, userProductDto);
    dispatch({ type: CREATE_USER_PRODUCT, payload: { product: data } });
    dispatch(setLoading({ cloading: false }));
  } catch (error) {}
};

export const updateUserProduct = (
  productId: string,
  userProductDto: UserProductDto
): UserProductsThunkActions => async (dispatch) => {
  try {
    dispatch(setLoading({ uloading: true }));
    const { data } = await api.put(`${resourceName}/${productId}`, userProductDto);
    dispatch({ type: UPDATE_USER_PRODUCT, payload: { product: data } });
    dispatch(setLoading({ uloading: false }));
  } catch (error) {}
};

export const deleteUserProduct = (productId: string): UserProductsThunkActions => async (dispatch) => {
  try {
    dispatch(setLoading({ dloading: true }));
    const { data } = await api.delete(`${resourceName}/${productId}`);
    dispatch({ type: DELETE_USER_PRODUCT, payload: { product: data } });
    dispatch(setLoading({ dloading: false }));
  } catch (error) {}
};

const setLoading = (loadingState: UserProductsLoadingState): UserProductsActions => ({
  type: SET_USER_PRODUCTS_LOADING,
  payload: loadingState,
});

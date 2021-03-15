import { CategoryDto } from "dto";
import api from "utils/api";
import {
  CategoryLoadingStates,
  CREATE_USER_CATEOGORY,
  DELETE_USER_CATEOGORY,
  FETCH_PRODUCT_CATEGORIES,
  GET_USER_CATEGORIES,
  GET_USER_CATEGORY,
  ProductCategoriesActionTypes,
  ProductCategoriesThunkActionTypes,
  SET_PRODUCT_CATEGORIES_LOADING,
  UPDATE_USER_CATEOGORY,
} from "./types";

const resourceName = "product-categories";

export const getCategories = (): ProductCategoriesThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get(resourceName);

    dispatch({ type: FETCH_PRODUCT_CATEGORIES, payload: { categories: data } });
    dispatch(setLoading({ loading: false }));
  } catch (error) {}
};

export const getUserCategories = (): ProductCategoriesThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get(`${resourceName}/only-created-by-user`);
    dispatch({ type: GET_USER_CATEGORIES, payload: { userCategories: data } });
    dispatch(setLoading({ loading: false }));
  } catch (error) {}
};

export const getUserCategory = (id: string): ProductCategoriesThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ gloading: true }));
    const { data } = await api.get(`${resourceName}/${id}`);
    dispatch({ type: GET_USER_CATEGORY, payload: { userCategory: data } });
    dispatch(setLoading({ gloading: false }));
  } catch (error) {}
};

export const createUserCategory = (categoryDto: CategoryDto): ProductCategoriesThunkActionTypes => async (
  dispatch
) => {
  try {
    dispatch(setLoading({ cloading: true }));
    const { data } = await api.post(`${resourceName}`, categoryDto);
    dispatch({ type: CREATE_USER_CATEOGORY, payload: { userCategory: data } });
    dispatch(setLoading({ cloading: false }));
  } catch (error) {}
};

export const updateUserCategory = (
  categoryId: string,
  categoryDto: CategoryDto
): ProductCategoriesThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ uloading: true }));
    const { data } = await api.put(`${resourceName}/${categoryId}`, categoryDto);
    dispatch({ type: UPDATE_USER_CATEOGORY, payload: { userCategory: data } });
    dispatch(setLoading({ uloading: false }));
  } catch (error) {}
};

export const deleteUserCategory = (categoryId: string): ProductCategoriesThunkActionTypes => async (
  dispatch
) => {
  try {
    dispatch(setLoading({ dloading: true }));
    const { data } = await api.delete(`${resourceName}/${categoryId}`);
    dispatch({ type: DELETE_USER_CATEOGORY, payload: { userCategory: data } });
    dispatch(setLoading({ dloading: false }));
  } catch (error) {}
};

const setLoading = (data: CategoryLoadingStates): ProductCategoriesActionTypes => {
  return { type: SET_PRODUCT_CATEGORIES_LOADING, payload: data };
};

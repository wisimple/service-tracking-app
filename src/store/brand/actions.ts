import {
  BrandActionTypes,
  BrandThunkActionTypes,
  SET_BRANDS_LOADING,
  FETCH_BRANDS_BY_CATEGORY,
  RESET_BRANDS,
  BrandLoadingState,
  GET_USER_BRANDS,
  GET_USER_BRAND,
  UPDATE_USER_BRAND,
  DELETE_USER_BRAND,
  CREATE_USER_BRAND,
} from "./types";
import api from "utils/api";
import { BrandDto } from "dto";

const resourceName = "brands";

export const fetchBrandsByCategory = (catId: string): BrandThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get(`${resourceName}?catId=${catId}`);

    dispatch({ type: FETCH_BRANDS_BY_CATEGORY, payload: { brands: data } });
    dispatch(setLoading({ loading: false }));
  } catch (error) {}
};

export const resetBrands = (): BrandActionTypes => ({
  type: RESET_BRANDS,
});

export const getUserBrands = (): BrandThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const { data } = await api.get(`${resourceName}/only-created-by-user`);
    dispatch({ type: GET_USER_BRANDS, payload: { userCategoriesWithBrands: data } });
  } catch (error) {}
  dispatch(setLoading({ loading: false }));
};

export const getUserBrand = (id: string): BrandThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ gloading: true }));
    const { data } = await api.get(`${resourceName}/${id}`);
    dispatch({ type: GET_USER_BRAND, payload: { userBrand: data } });
  } catch (error) {}
  dispatch(setLoading({ gloading: false }));
};

export const createUserBrand = (brandDto: BrandDto): BrandThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ cloading: true }));
    const { data } = await api.post(`${resourceName}`, brandDto);
    dispatch({ type: CREATE_USER_BRAND, payload: { userBrand: data } });
  } catch (error) {}
  dispatch(setLoading({ cloading: false }));
};

export const updateUserBrand = (id: string, brandDto: BrandDto): BrandThunkActionTypes => async (
  dispatch
) => {
  try {
    dispatch(setLoading({ uloading: true }));
    const { data } = await api.put(`${resourceName}/${id}`, brandDto);
    dispatch({ type: UPDATE_USER_BRAND, payload: { userBrand: data } });
  } catch (error) {}
  dispatch(setLoading({ uloading: false }));
};

export const deleteUserBrand = (id: string): BrandThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading({ dloading: true }));
    const { data } = await api.delete(`${resourceName}/${id}`);
    dispatch({ type: DELETE_USER_BRAND, payload: { userBrand: data } });
  } catch (error) {}
  dispatch(setLoading({ dloading: false }));
};

const setLoading = (data: BrandLoadingState): BrandActionTypes => {
  return { type: SET_BRANDS_LOADING, payload: data };
};

import {
  BrandActionTypes,
  BrandThunkActionTypes,
  SET_BRANDS_LOADING,
  FETCH_BRANDS_BY_CATEGORY,
  RESET_BRANDS,
} from "./types";
import api from "utils/api";

export const fetchBrandsByCategory = (catId: string): BrandThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.get(`brands?catId=${catId}`);

    dispatch({ type: FETCH_BRANDS_BY_CATEGORY, payload: { brands: data } });
    dispatch(setLoading(false));
  } catch (error) {}
};

export const resetBrands = (): BrandActionTypes => ({
  type: RESET_BRANDS,
});

const setLoading = (loading: boolean): BrandActionTypes => {
  return { type: SET_BRANDS_LOADING, payload: { loading } };
};

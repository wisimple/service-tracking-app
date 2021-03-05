import {
  ProductActionTypes,
  ProductThunkActionTypes,
  SET_PRODUCTS_LOADING,
  FETCH_PRODUCTS_BY_BRAND,
} from "./types";
import api from "utils/api";

export const fetchProductsByBrand = (brandId: string): ProductThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.get(`products?brandId=${brandId}`);

    dispatch({ type: FETCH_PRODUCTS_BY_BRAND, payload: { products: data } });
    dispatch(setLoading(false));
  } catch (error) {}
};

const setLoading = (loading: boolean): ProductActionTypes => {
  return { type: SET_PRODUCTS_LOADING, payload: { loading } };
};

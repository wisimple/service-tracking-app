import api from "utils/api";
import {
  FETCH_PRODUCT_CATEGORIES,
  ProductCategoriesActionTypes,
  ProductCategoriesThunkActionTypes,
  SET_PRODUCT_CATEGORIES_LOADING,
} from "./types";

export const fetchProductCategories = (): ProductCategoriesThunkActionTypes => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.get("product-categories");

    dispatch({ type: FETCH_PRODUCT_CATEGORIES, payload: { categories: data } });
    dispatch(setLoading(false));
  } catch (error) {}
};

const setLoading = (loading: boolean): ProductCategoriesActionTypes => {
  return { type: SET_PRODUCT_CATEGORIES_LOADING, payload: { loading } };
};

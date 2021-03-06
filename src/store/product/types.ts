import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export interface Product {
  _id: string;
  brandId: string;
  name: string;
  imgFile: string;
}

export interface ProductdState {
  products: Product[];
  loading: boolean;
}

export const FETCH_PRODUCTS_BY_BRAND = "FETCH_PRODUCTS_BY_BRAND";
export const SET_PRODUCTS_LOADING = "SET_PRODUCTS_LOADING";
export const RESET_PRODUCTS = "RESET_PRODUCTS";

interface FetchProductsByCategoryAction {
  type: typeof FETCH_PRODUCTS_BY_BRAND;
  payload: {
    products: Product[];
  };
}

interface SetLoadingAction {
  type: typeof SET_PRODUCTS_LOADING;
  payload: {
    loading: boolean;
  };
}

interface ResetAction {
  type: typeof RESET_PRODUCTS;
}
export type ProductActionTypes = FetchProductsByCategoryAction | SetLoadingAction | ResetAction;

export type ProductThunkActionTypes = ThunkAction<void, RootState, unknown, ProductActionTypes>;

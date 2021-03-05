import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export interface ProductCategory {
  _id: string;
  name: string;
}

export interface ProductCategoryState {
  categories: ProductCategory[];
  loading: boolean;
}

export const FETCH_PRODUCT_CATEGORIES = "FETCH_PRODUCT_CATEGORIES";
export const SET_PRODUCT_CATEGORIES_LOADING = "SET_PRODUCT_CATEGORIES_LOADING";

interface FetchProductCategoriesAction {
  type: typeof FETCH_PRODUCT_CATEGORIES;
  payload: {
    categories: ProductCategory[];
  };
}

interface SetLoadingAction {
  type: typeof SET_PRODUCT_CATEGORIES_LOADING;
  payload: {
    loading: boolean;
  };
}

export type ProductCategoriesActionTypes = FetchProductCategoriesAction | SetLoadingAction;
export type ProductCategoriesThunkActionTypes = ThunkAction<
  void,
  RootState,
  unknown,
  ProductCategoriesActionTypes
>;

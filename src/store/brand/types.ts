import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export interface Brand {
  _id: string;
  name: string;
}

export interface BrandState {
  brands: Brand[];
  loading: boolean;
}

export const FETCH_BRANDS_BY_CATEGORY = "FETCH_BRANDS_BY_CATEGORY";
export const SET_BRANDS_LOADING = "SET_BRANDS_LOADING";

interface FetchBrandsByCategoryAction {
  type: typeof FETCH_BRANDS_BY_CATEGORY;
  payload: {
    brands: Brand[];
  };
}

interface SetLoadingAction {
  type: typeof SET_BRANDS_LOADING;
  payload: {
    loading: boolean;
  };
}

export type BrandActionTypes = FetchBrandsByCategoryAction | SetLoadingAction;

export type BrandThunkActionTypes = ThunkAction<void, RootState, unknown, BrandActionTypes>;

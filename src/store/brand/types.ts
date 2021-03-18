import { IBrand, ICategory, IBrandData } from "interfaces";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export interface BrandLoadingState {
  loading?: boolean;
  uloading?: boolean;
  cloading?: boolean;
  dloading?: boolean;
  gloading?: boolean;
}

interface ICategoryWithBrands extends ICategory {
  brands?: IBrandData[];
}

export interface BrandState extends BrandLoadingState {
  brands: IBrand[];
  userCategoriesWithBrands: ICategoryWithBrands[];
  userBrand?: IBrandData;
}

export const FETCH_BRANDS_BY_CATEGORY = "FETCH_BRANDS_BY_CATEGORY";
export const SET_BRANDS_LOADING = "SET_BRANDS_LOADING";
export const RESET_BRANDS = "RESET_BRANDS";

export const GET_USER_BRANDS = "GET_USER_BRANDS";
export const CREATE_USER_BRAND = "CREATE_USER_BRAND";
export const UPDATE_USER_BRAND = "UPDATE_USER_BRAND";
export const DELETE_USER_BRAND = "DELETE_USER_BRAND";
export const GET_USER_BRAND = "GET_USER_BRAND";

interface FetchBrandsByCategoryAction {
  type: typeof FETCH_BRANDS_BY_CATEGORY;
  payload: {
    brands: IBrand[];
  };
}

interface SetLoadingAction {
  type: typeof SET_BRANDS_LOADING;
  payload: BrandLoadingState;
}

interface ResetAction {
  type: typeof RESET_BRANDS;
}

interface GetUserBrandsAction {
  type: typeof GET_USER_BRANDS;
  payload: {
    userCategoriesWithBrands: ICategoryWithBrands[];
  };
}

interface GetUserBrandAction {
  type: typeof GET_USER_BRAND;
  payload: {
    userBrand: IBrandData;
  };
}

interface CreateUserBrandAction {
  type: typeof CREATE_USER_BRAND;
  payload: {
    userBrand: IBrandData;
  };
}

interface UpdateUserBrandAction {
  type: typeof UPDATE_USER_BRAND;
  payload: {
    userBrand: IBrandData;
  };
}

interface DeleteUserBrandAction {
  type: typeof DELETE_USER_BRAND;
  payload: {
    userBrand: IBrandData;
  };
}

export type BrandActionTypes =
  | FetchBrandsByCategoryAction
  | SetLoadingAction
  | ResetAction
  | GetUserBrandAction
  | GetUserBrandsAction
  | CreateUserBrandAction
  | UpdateUserBrandAction
  | DeleteUserBrandAction;

export type BrandThunkActionTypes = ThunkAction<void, RootState, unknown, BrandActionTypes>;

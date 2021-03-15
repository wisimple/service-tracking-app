import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export interface CategoryLoadingStates {
  loading?: boolean;
  cloading?: boolean;
  uloading?: boolean;
  dloading?: boolean;
  gloading?: boolean;
}

export interface ProductCategory {
  _id: string;
  name: string;
}

export interface ProductCategoryState extends CategoryLoadingStates {
  categories: ProductCategory[];
  userCategories: ProductCategory[];
  userCategory?: ProductCategory;
}

export const FETCH_PRODUCT_CATEGORIES = "FETCH_PRODUCT_CATEGORIES";
export const SET_PRODUCT_CATEGORIES_LOADING = "SET_PRODUCT_CATEGORIES_LOADING";

export const GET_USER_CATEGORIES = "GET_USER_CATEGORIES";
export const GET_USER_CATEGORY = "GET_USER_CATEGORY";
export const CREATE_USER_CATEOGORY = "CREATE_USER_CATEOGORY";
export const UPDATE_USER_CATEOGORY = "UPDATE_USER_CATEOGORY";
export const DELETE_USER_CATEOGORY = "DELETE_USER_CATEOGORY";

interface FetchProductCategoriesAction {
  type: typeof FETCH_PRODUCT_CATEGORIES;
  payload: {
    categories: ProductCategory[];
  };
}

interface SetLoadingAction {
  type: typeof SET_PRODUCT_CATEGORIES_LOADING;
  payload: CategoryLoadingStates;
}

interface GetUserCategoriesAction {
  type: typeof GET_USER_CATEGORIES;
  payload: {
    userCategories: ProductCategory[];
  };
}

interface GetUserCategoryAction {
  type: typeof GET_USER_CATEGORY;
  payload: {
    userCategory: ProductCategory;
  };
}

interface CreateUserCategoriesAction {
  type: typeof CREATE_USER_CATEOGORY;
  payload: {
    userCategory: ProductCategory;
  };
}

interface UpdateUserCategoriesAction {
  type: typeof UPDATE_USER_CATEOGORY;
  payload: {
    userCategory: ProductCategory;
  };
}

interface DeleteUserCategoriesAction {
  type: typeof DELETE_USER_CATEOGORY;
  payload: {
    userCategory: ProductCategory;
  };
}

export type ProductCategoriesActionTypes =
  | FetchProductCategoriesAction
  | SetLoadingAction
  | GetUserCategoriesAction
  | GetUserCategoryAction
  | CreateUserCategoriesAction
  | UpdateUserCategoriesAction
  | DeleteUserCategoriesAction;
export type ProductCategoriesThunkActionTypes = ThunkAction<
  void,
  RootState,
  unknown,
  ProductCategoriesActionTypes
>;

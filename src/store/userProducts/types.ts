import { IUserProduct } from "interfaces";
import { ThunkAction } from "redux-thunk";
import { RootState } from "store";

export interface UserProductsLoadingState {
  loading?: boolean;
  cloading?: boolean;
  uloading?: boolean;
  dloading?: boolean;
}

export interface UserProductsState extends UserProductsLoadingState {
  products: IUserProduct[];
}

export const GET_ALL_USER_PRODUCTS = "GET_ALL_USER_PRODUCTS";
export const CREATE_USER_PRODUCT = "CREATE_USER_PRODUCT";
export const UPDATE_USER_PRODUCT = "UPDATE_USER_PRODUCT";
export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";

export const SET_USER_PRODUCTS_LOADING = "SET_USER_PRODUCTS_LOADING";

interface GetAllUserProductsAction {
  type: typeof GET_ALL_USER_PRODUCTS;
  payload: {
    products: IUserProduct[];
  };
}

interface CreateUserProductAction {
  type: typeof CREATE_USER_PRODUCT;
  payload: {
    product: IUserProduct;
  };
}
interface UpdateUserProductAction {
  type: typeof UPDATE_USER_PRODUCT;
  payload: {
    product: IUserProduct;
  };
}
interface DeleteUserProductAction {
  type: typeof DELETE_USER_PRODUCT;
  payload: {
    product: IUserProduct;
  };
}

interface SetLoadingAction {
  type: typeof SET_USER_PRODUCTS_LOADING;
  payload: UserProductsLoadingState;
}

export type UserProductsActions =
  | GetAllUserProductsAction
  | SetLoadingAction
  | CreateUserProductAction
  | UpdateUserProductAction
  | DeleteUserProductAction;
export type UserProductsThunkActions = ThunkAction<void, RootState, unknown, UserProductsActions>;

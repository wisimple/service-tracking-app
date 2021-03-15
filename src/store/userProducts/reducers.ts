import {
  GET_ALL_USER_PRODUCTS,
  SET_USER_PRODUCTS_LOADING,
  UserProductsActions,
  UserProductsState,
} from "./types";

const initalState: UserProductsState = {
  products: [],
};

export default function userProductReducer(
  state = initalState,
  action: UserProductsActions
): UserProductsState {
  switch (action.type) {
    case GET_ALL_USER_PRODUCTS:
      return { ...state, products: action.payload.products };

    case SET_USER_PRODUCTS_LOADING:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

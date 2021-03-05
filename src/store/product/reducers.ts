import { ProductActionTypes, FETCH_PRODUCTS_BY_BRAND, ProductdState, SET_PRODUCTS_LOADING } from "./types";

const intialState: ProductdState = {
  products: [],
  loading: false,
};

export default function productReducer(state = intialState, action: ProductActionTypes): ProductdState {
  switch (action.type) {
    case FETCH_PRODUCTS_BY_BRAND:
      return { ...state, products: action.payload.products };
    case SET_PRODUCTS_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
}

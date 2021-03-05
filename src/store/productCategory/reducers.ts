import {
  ProductCategoriesActionTypes,
  ProductCategoryState,
  FETCH_PRODUCT_CATEGORIES,
  SET_PRODUCT_CATEGORIES_LOADING,
} from "./types";

const intialState: ProductCategoryState = {
  categories: [],
  loading: false,
};

export default function productCategoryReducer(
  state = intialState,
  action: ProductCategoriesActionTypes
): ProductCategoryState {
  switch (action.type) {
    case FETCH_PRODUCT_CATEGORIES:
      return { ...state, categories: action.payload.categories };
    case SET_PRODUCT_CATEGORIES_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
}

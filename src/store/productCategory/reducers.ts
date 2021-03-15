import {
  ProductCategoriesActionTypes,
  ProductCategoryState,
  FETCH_PRODUCT_CATEGORIES,
  SET_PRODUCT_CATEGORIES_LOADING,
  GET_USER_CATEGORIES,
  CREATE_USER_CATEOGORY,
  UPDATE_USER_CATEOGORY,
  DELETE_USER_CATEOGORY,
  GET_USER_CATEGORY,
} from "./types";

const intialState: ProductCategoryState = {
  categories: [],
  userCategories: [],
  loading: false,
};

export default function productCategoryReducer(
  state = intialState,
  action: ProductCategoriesActionTypes
): ProductCategoryState {
  switch (action.type) {
    case FETCH_PRODUCT_CATEGORIES:
      return { ...state, categories: action.payload.categories };

    case GET_USER_CATEGORIES: {
      const { userCategories } = action.payload;
      return { ...state, userCategories };
    }
    case GET_USER_CATEGORY: {
      const { userCategory } = action.payload;
      return { ...state, userCategory };
    }

    case CREATE_USER_CATEOGORY: {
      const { userCategory } = action.payload;
      return { ...state, userCategories: [userCategory, ...state.userCategories] };
    }

    case UPDATE_USER_CATEOGORY: {
      const { userCategory } = action.payload;
      return {
        ...state,
        userCategories: state.userCategories.map((cat) =>
          cat._id === userCategory._id ? userCategory : cat
        ),
      };
    }

    case DELETE_USER_CATEOGORY: {
      const { userCategory } = action.payload;
      return { ...state, userCategories: state.userCategories.filter((cat) => cat._id !== userCategory._id) };
    }
    case SET_PRODUCT_CATEGORIES_LOADING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

import {
  BrandActionTypes,
  BrandState,
  CREATE_USER_BRAND,
  DELETE_USER_BRAND,
  FETCH_BRANDS_BY_CATEGORY,
  GET_USER_BRAND,
  GET_USER_BRANDS,
  RESET_BRANDS,
  SET_BRANDS_LOADING,
  UPDATE_USER_BRAND,
} from "./types";

const intialState: BrandState = {
  brands: [],
  userCategoriesWithBrands: [],
};

export default function brandReducer(state = intialState, action: BrandActionTypes): BrandState {
  switch (action.type) {
    case FETCH_BRANDS_BY_CATEGORY:
      return { ...state, brands: action.payload.brands };

    case SET_BRANDS_LOADING:
      return { ...state, ...action.payload };

    case GET_USER_BRANDS: {
      const { userCategoriesWithBrands } = action.payload;
      return { ...state, userCategoriesWithBrands };
    }
    case GET_USER_BRAND: {
      const { userBrand } = action.payload;
      return { ...state, userBrand };
    }
    case CREATE_USER_BRAND: {
      const { userBrand } = action.payload;
      return {
        ...state,
        userCategoriesWithBrands: state.userCategoriesWithBrands.map((category) => {
          if (userBrand.catId === category._id) {
            return { ...category, brands: [...(category.brands || []), userBrand] };
          } else {
            return category;
          }
        }),
      };
    }
    case UPDATE_USER_BRAND: {
      const { userBrand } = action.payload;
      return {
        ...state,
        userCategoriesWithBrands: state.userCategoriesWithBrands.map((category) => {
          if (userBrand.catId === category._id) {
            return {
              ...category,
              brands: category.brands?.map((brand) => (brand._id === userBrand._id ? userBrand : brand)),
            };
          } else {
            return category;
          }
        }),
      };
    }
    case DELETE_USER_BRAND: {
      const { userBrand } = action.payload;
      return {
        ...state,
        userCategoriesWithBrands: state.userCategoriesWithBrands.map((category) => {
          if (userBrand.catId === category._id) {
            return {
              ...category,
              brands: category.brands?.filter((brand) => brand._id !== userBrand._id),
            };
          } else {
            return category;
          }
        }),
      };
    }

    case RESET_BRANDS:
      return intialState;
    default:
      return state;
  }
}

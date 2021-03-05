import { BrandActionTypes, BrandState, FETCH_BRANDS_BY_CATEGORY, SET_BRANDS_LOADING } from "./types";

const intialState: BrandState = {
  brands: [],
  loading: false,
};

export default function brandReducer(state = intialState, action: BrandActionTypes): BrandState {
  switch (action.type) {
    case FETCH_BRANDS_BY_CATEGORY:
      return { ...state, brands: action.payload.brands };
    case SET_BRANDS_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
}

import {
  CREATE_CUSTOMER,
  CustomerActionTypes,
  CustomerState,
  FETCH_CUSTOMERS,
  SET_CUSTOMERS_LOADING,
} from "./types";

const intialState: CustomerState = {
  customers: [],
  loading: false,
  cLoading: false,
  dLoading: false,
};

export default function customerReducer(state = intialState, action: CustomerActionTypes): CustomerState {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return { ...state, customers: action.payload.customers };
    case SET_CUSTOMERS_LOADING:
      return { ...state, ...action.payload };
    case CREATE_CUSTOMER:
      return { ...state, customers: [action.payload.customer, ...state.customers] };
    default:
      return state;
  }
}

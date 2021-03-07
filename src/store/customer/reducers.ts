import {
  CREATE_CUSTOMER,
  CustomerActionTypes,
  CustomerState,
  DELETE_CUSTOMER,
  FETCH_CUSTOMERS,
  GET_CUSTOMER,
  SET_CUSTOMERS_LOADING,
  UPDATE_CUSTOMER,
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
    case GET_CUSTOMER:
      return { ...state, customer: action.payload.customer };
    // case CREATE_CUSTOMER:
    //   return { ...state, customers: [action.payload.customer, ...state.customers] };
    // case UPDATE_CUSTOMER: {
    //   const { customer } = action.payload;
    //   return {
    //     ...state,
    //     customer,
    //     customers: state.customers.map((c) => (c._id === customer._id ? customer : c)),
    //   };
    // }
    // case DELETE_CUSTOMER: {
    //   const { customer } = action.payload;
    //   return {
    //     ...state,
    //     customers: state.customers.filter((c) => c._id !== customer._id),
    //   };
    // }
    default:
      return state;
  }
}

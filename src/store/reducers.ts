import { combineReducers } from "redux";
import brandReducer from "./brand/reducers";
import customerReducer from "./customer/reducers";
import faultTypeReducer from "./faultType/reducers";
import productReducer from "./product/reducers";
import productCategoryReducer from "./productCategory/reducers";

export const rootReducer = combineReducers({
  productCategoryState: productCategoryReducer,
  brandState: brandReducer,
  productState: productReducer,
  customerState: customerReducer,
  faultTypeState: faultTypeReducer,
});

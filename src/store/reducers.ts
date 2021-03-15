import { combineReducers } from "redux";
import brandReducer from "./brand/reducers";
import customerReducer from "./customer/reducers";
import faultTypeReducer from "./faultType/reducers";
import productReducer from "./product/reducers";
import productCategoryReducer from "./productCategory/reducers";
import technicalServiceReducer from "./technicalService/reducers";
import userReducer from "./user/reducers";
import userProductReducer from "./userProducts/reducers";

export const rootReducer = combineReducers({
  userState: userReducer,
  productCategoryState: productCategoryReducer,
  brandState: brandReducer,
  productState: productReducer,
  customerState: customerReducer,
  faultTypeState: faultTypeReducer,
  servicesState: technicalServiceReducer,
  userProducts: userProductReducer,
});

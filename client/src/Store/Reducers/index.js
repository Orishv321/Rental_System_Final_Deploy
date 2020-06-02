import { combineReducers } from "redux";
import AuthenticationReducers from "./AuthenticationReducer";
import ContactReducer from "./ContactReducer";
import HomeInfoReducer from "./HomeInfoReducer";
import TendentsReducer from "./TendentsReducer";
import BillsReducer from "./BillsReducer";
export default combineReducers({
  AuthenticationReducers,
  ContactReducer,
  HomeInfoReducer,
  TendentsReducer,
  BillsReducer,
});

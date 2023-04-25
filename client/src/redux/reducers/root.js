import { combineReducers } from "redux";
// import userReducer from "./userReducer";
import userImageReducer from "./userImageReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    authReducer, userImageReducer
})


export default rootReducer
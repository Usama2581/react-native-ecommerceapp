import rootReducer from "../reducers/root";
import { createStore } from "redux";


const store = createStore(rootReducer)

export default store
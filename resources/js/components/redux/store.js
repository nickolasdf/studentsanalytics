import { createStore, combineReducers} from "redux";
import mainReducer from "./reducer";
import tableReducer from "./TableState/reducer"


const  store = createStore(combineReducers({mainReducer, tableReducer}));


export default store;

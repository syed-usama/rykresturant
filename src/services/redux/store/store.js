import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
const rootReducer = combineReducers(
{ cart: userReducer }
);
const Store = () => {
return createStore(rootReducer);
}
export default Store;
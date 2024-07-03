// src/reducers/index.js
import { combineReducers } from 'redux';
import wellReducer from './wellReducer';
import userReducer from './userReducer'
import operationReducer from './operationReducer';
import fuelReducer from './fuelReducer';
const rootReducer = combineReducers({
  wells: wellReducer,
  user: userReducer,
  operations: operationReducer,
  fuel:fuelReducer
});

export default rootReducer
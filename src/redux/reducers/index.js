// src/reducers/index.js
import { combineReducers } from 'redux';
import wellReducer from './wellReducer';
import userReducer from './userReducer'
import operationReducer from './operationReducer';
import fuelReducer from './fuelReducer';
import crewReducer from './crewReducer'
const rootReducer = combineReducers({
  wells: wellReducer,
  user: userReducer,
  operations: operationReducer,
  fuel: fuelReducer,
  crew: crewReducer
});

export default rootReducer
// src/reducers/index.js
import { combineReducers } from 'redux';
import wellReducer from './wellReducer';
import userReducer from './userReducer'
import operationReducer from './operationReducer';

const rootReducer = combineReducers({
  wells: wellReducer,
  user: userReducer,
  operations: operationReducer
});

export default rootReducer
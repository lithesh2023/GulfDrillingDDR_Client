// src/reducers/index.js
import { combineReducers } from 'redux';
import wellReducer from './wellReducer';
import userReducer from './userReducer'

const rootReducer = combineReducers({
  wells: wellReducer,
  user: userReducer
});

export default rootReducer
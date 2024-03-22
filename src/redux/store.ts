import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import articlesReducer from './articleSlice';

const rootReducer = combineReducers({
  articles: articlesReducer,
});

const store = configureStore({
  devTools: true,
  reducer: rootReducer,
});

export default store;
export type ReduxType = ReturnType<typeof rootReducer>;

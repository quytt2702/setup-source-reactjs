import {createStore, combineReducers, applyMiddleware} from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from "redux-thunk";
import {SEO} from './seo';
import { reducer as reduxAsyncConnect } from 'redux-connect';

let rootReducer = combineReducers({
  reduxAsyncConnect,
  routing: routerReducer,
  SEO
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export {store, rootReducer};

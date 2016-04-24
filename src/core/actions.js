import { createActions, createReducerActions } from 'shasta';
import store from './store'
import localReducers from '../reducers/.lookup';

export default createActions({
  ...createReducerActions(localReducers)
}, store.dispatch)

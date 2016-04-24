import { createStore, createReducer } from 'shasta';
import localReducers from '../reducers/.lookup';

export default createStore({
  plugins: [],
  reducers: [
    createReducer(localReducers)
  ]
})

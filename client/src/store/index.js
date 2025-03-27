// This is the Redux Store

import { configureStore } from "@reduxjs/toolkit";
import meetingsReducer from './meetingsSlice';
import  companionsReducer  from './companionsSlice';

export const store = configureStore({
    reducer: {
        meetings: meetingsReducer,
        // TODO: Add additional reducers here as needed
        companions: companionsReducer, 
    }
})
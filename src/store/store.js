import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice.js';

const store = configureStore({
    reducer:{
        auth: authSlice
        // Todo: Add more slices here for posts
    }
});

export default store;


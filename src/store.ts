import { configureStore } from "@reduxjs/toolkit";
import nQueensReducer from './slices/nQueens-slices';

const store = configureStore({
    reducer: {
        nQueens: nQueensReducer
    }
});

export type RootType = ReturnType<typeof store.getState>;
export default store;
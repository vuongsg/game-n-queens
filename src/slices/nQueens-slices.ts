import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean[][] = Array(4);
for (let i = 0; i < 4; i++) {
    initialState[i] = Array(4).fill(false);
}

const slice = createSlice({
    name: 'nQueens',
    initialState: initialState,
    reducers: {
        changeBoard: (state: boolean[][], action: PayloadAction<boolean[][]>) => {
            return action.payload;
        }
    }
})

export const { changeBoard } = slice.actions;
export default slice.reducer;
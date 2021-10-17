import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
    size: number,
    board: boolean[][]
    errorBoard: boolean[][],
    showCongrats: boolean
}

const createBoard = (size: number): boolean[][] => {
    const arr: boolean[][] = Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = Array(size).fill(false);
    }

    return arr;
}

const initialState: BoardState = {
    size: 4,
    board: createBoard(4),
    errorBoard: createBoard(4),
    showCongrats: false
}

const slice = createSlice({
    name: 'nQueens',
    initialState: initialState,
    reducers: {
        changeBoard: (state: BoardState, action: PayloadAction<number>) => {
            return {
                ...state,
                size: action.payload,
                board: createBoard(action.payload),
                errorBoard: createBoard(action.payload),
                showCongrats: false
            }
        },
        changeQueen: (state: BoardState, action: PayloadAction<boolean[][]>) => {
            return {
                ...state,
                board: action.payload
            }
        },
        setErrorBoard: (state: BoardState, action: PayloadAction<boolean[][]>) => {
            return {
                ...state,
                errorBoard: action.payload,
                showCongrats: false
            }
        },
        removeErrorBoard: (state: BoardState) => {
            return {
                ...state,
                errorBoard: createBoard(state.size),
                showCongrats: true
            }
        }
    }
})

export const { changeBoard, changeQueen, setErrorBoard, removeErrorBoard } = slice.actions;
export default slice.reducer;
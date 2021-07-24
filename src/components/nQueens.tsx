import React from 'react';
import { useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, MenuItem, Select, InputLabel } from "@material-ui/core";
import { changeBoard } from "../slices/nQueens-slices";
import { RootType } from "../store"; 
import { ReactElement } from "react";
import './nQueens.scss';

export const Nqueens = (): ReactElement => {
    let board = useSelector<RootType>(state => state.nQueens) as boolean[][];
    const dispatch = useDispatch();
    let initialRowsBoard: ReactElement[] = [];
    const rowsBoard = useRef(initialRowsBoard);

    const drawBoard = useCallback(() => {
        const gridBoard = document.querySelector('#grid-board');

        const handleDropQueen = (e:React.DragEvent<HTMLDivElement>): void => {
            let cellBoard = (e.target) as HTMLDivElement;

            if (gridBoard !== null && cellBoard !== null && cellBoard.className.indexOf('cell-board') !== -1) {
                const elementsSameRow = gridBoard.getElementsByClassName(cellBoard.classList[0]);

                //reset background for all elements in that row
                if (elementsSameRow != null) {
                    for (let i = 0, n = elementsSameRow.length; i < n; i++) {
                        (elementsSameRow[i] as HTMLDivElement).style.backgroundImage = '';
                    }
                }
    
                if (window.getComputedStyle(cellBoard, null).getPropertyValue('background-color') === 'rgb(255, 255, 255)') {
                    cellBoard.style.backgroundImage = `url('${process.env.PUBLIC_URL + '/img/queen-piece.jpg'}')`;
                } else {
                    cellBoard.style.backgroundImage = `url('${process.env.PUBLIC_URL + '/img/queen-white-piece.jpg'}')`;
                }
    
                cellBoard.style.backgroundSize = 'cover';
            } 
        };
        
        if (gridBoard !== null) {   //at initialize, gridBoard does not exist
            const rowsCollection = Array.from(document.getElementsByClassName('row-board'));

            for (let row of rowsCollection) {
                const cellsCollection = Array.from(row.getElementsByClassName('cell-board'));

                for (let cell of cellsCollection) {
                    (cell as HTMLDivElement).style.backgroundImage = 'none';
                }
            }
        }

        const rows = board.length;
        document.title = `Game ${rows} x ${rows} queens`;
        rowsBoard.current = [];

        for (let i = 0; i < rows; i++) {
            const cells: ReactElement[] = [];
            for (let k = 0; k < rows; k++) {
                let isWhiteCell = ((k & 1) === 0 && (i & 1) === 0) || ((k & 1) === 1 && (i & 1) === 1);
                const classNames = `${i} cell-board ${isWhiteCell ? 'white' : 'black'}`;
                cells.push(React.createElement('div', { className: classNames, tabIndex: 0, onDragOver: allowDrop, onDrop: handleDropQueen }));
            }

            const rowClassNames = `row-board ${i === 0 ? '' : 'second-more'}`;
            rowsBoard.current.push(React.createElement('div', { className: rowClassNames }, cells));
        }
    }, [board]);

    const changeSize = (e:React.ChangeEvent<{value: unknown}>): void => {
        reInitializeBoard(parseInt(e.target.value as string));
    }

    const handleDragQueenStart = (e:React.DragEvent<HTMLImageElement>): void => {
        /* e.dataTransfer.setData('text/plain', (e.target as HTMLImageElement).src); */
    }

    const allowDrop = (e:React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
    }

    const reInitializeBoard = (size: number): void => {
        let newBoard: boolean[][] = Array(size);
        for (let i = 0; i < size; i++) {
            newBoard[i] = Array(size).fill(false);
        }

        dispatch(changeBoard(newBoard));
    }

    drawBoard();    //draw board at initialize

    return (
        <Grid container direction='row'>
            <Grid item md={12} lg={6} id='select-area'>
                <div>
                    <InputLabel id='label-size'>Choose size</InputLabel>
                    <Select labelId='label-size' value={board.length} onChange={changeSize}>
                        <MenuItem value="4">4 x 4</MenuItem>
                        <MenuItem value="6">6 x 6</MenuItem>
                        <MenuItem value="8">8 x 8</MenuItem>
                        <MenuItem value="10">10 x 10</MenuItem>
                    </Select>
                </div>

                <div style={{marginTop: 30}}>
                    <img id='img-queen' alt='' src={process.env.PUBLIC_URL + '/img/queen-piece.jpg'} onDragStart={handleDragQueenStart} />
                </div>
            </Grid>

            <Grid item md={12} lg={6} justifyContent='center' id='grid-board'>
                {rowsBoard.current}
            </Grid>
        </Grid>
    )
}
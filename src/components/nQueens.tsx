import React, { ReactElement } from 'react';
import { useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, MenuItem, Select, InputLabel, Button } from "@material-ui/core";
import { changeBoard } from "../slices/nQueens-slices";
import { RootType } from "../store"; 
import { NqueenProducer } from '../producers/nQueensProducer';
import './nQueens.scss';

export const Nqueens = (): ReactElement => {
    let board = useSelector<RootType>(state => state.nQueens) as boolean[][];
    const dispatch = useDispatch();
    let initialRowsBoard: ReactElement[] = [];
    const rowsBoard = useRef(initialRowsBoard);
    let initialCurrentTempboard = [...board];
    let currentTempBoard = useRef(initialCurrentTempboard);

    const drawBoard = useCallback(() => {
        const handleDropQueen = (e:React.DragEvent<HTMLDivElement>): void => {
            const gridBoard = document.querySelector('#grid-board');
            let cellBoard = e.target as HTMLDivElement;

            if (gridBoard !== null && cellBoard !== null && cellBoard.className.indexOf('cell-board') !== -1) {
                //set new value for currentTempBoard, check whether each queen each row or not
                const eachQueenEachRow: boolean[] = Array(rows).fill(false);
                const tempBoard = Array(rows);

                for (let i = 0; i < rows; i++) {
                    tempBoard[i] = Array(rows).fill(false);

                    for (let k = 0; k < rows; k++) {
                        tempBoard[i][k] = currentTempBoard.current[i][k];
                        if (tempBoard[i][k]) {
                            eachQueenEachRow[i] = true;
                        }
                    }
                }

                const row = parseInt(cellBoard.classList[0].substr(cellBoard.classList[0].indexOf('row') + 'row'.length));
                const col = parseInt(cellBoard.classList[1].substr(cellBoard.classList[1].indexOf('col') + 'col'.length));
                for (let k = 0, n = currentTempBoard.current.length; k < n; k++) {
                    tempBoard[row][k] = (k === col);
                    if (tempBoard[row][k]) {
                        eachQueenEachRow[row] = true;
                    }
                }

                currentTempBoard.current = [...tempBoard];
                const btnCheckAnswer = document.querySelector('#btn-check-answer') as HTMLButtonElement;
                if (eachQueenEachRow.filter(m => !m).length > 0) {
                    btnCheckAnswer.setAttribute('disabled', 'disabled');
                } else {
                    btnCheckAnswer.removeAttribute('disabled');

                    //remove class '...disabled' of material ui
                    const classList = Array.from(btnCheckAnswer.classList).filter(m => m.indexOf('disabled') !== -1);
                    for (let cl of classList) {
                        btnCheckAnswer.classList.remove(cl);
                    }
                }

                const elementsSameRow = gridBoard.getElementsByClassName(cellBoard.classList[0]);

                //reset background for all elements in that row
                if (elementsSameRow != null) {
                    for (let i = 0, n = elementsSameRow.length; i < n; i++) {
                        (elementsSameRow[i] as HTMLDivElement).style.backgroundImage = 'none';
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
        
        currentTempBoard.current = [...board];
        const gridBoard = document.querySelector('#grid-board');
        if (gridBoard !== null) {   //at initialize, gridBoard does not exist
            const rowsCollection = Array.from(document.getElementsByClassName('row-board'));

            for (let row of rowsCollection) {
                const cellsCollection = Array.from(row.getElementsByClassName('cell-board'));

                for (let cell of cellsCollection) {
                    const cellDiv = cell as HTMLDivElement;
                    cellDiv.style.backgroundImage = 'none';
                    cellDiv.style.removeProperty('border');
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
                const classNames = `row${i} col${k} cell-board ${isWhiteCell ? 'white' : 'black'}`;
                cells.push(React.createElement('div', { className: classNames, tabIndex: 0, 
                                                        onDragStart: handleDragQueenStart, onDragOver: allowDrop, onDrop: handleDropQueen }));
            }

            const rowClassNames = `row-board ${i === 0 ? '' : 'second-more'}`;
            rowsBoard.current.push(React.createElement('div', { className: rowClassNames }, cells));
        }
    }, [board]);

    const changeSize = (e:React.ChangeEvent<{value: unknown}>): void => {
        reInitializeBoard(parseInt(e.target.value as string));
    }

    /**
     * This event should be transfered in case target is (image) or (div is containing Queen)
     * @param e 
     */
    const handleDragQueenStart = (e:React.DragEvent<HTMLImageElement | HTMLDivElement>): void => {
        const cell = e.target as HTMLDivElement;    //image Queen belongs to div, hence cell always not null
        if (cell !== null && cell.id !== 'img-queen') {
            if (cell.style.backgroundImage === 'none') {
                e.preventDefault();
            }
        }
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

    const checkAnswer = (e: React.MouseEvent<HTMLDivElement>): void => {
        //construct new board from current UI
        const gridBoard = document.querySelector('#grid-board');

        if (gridBoard !== null) {
            const answer = NqueenProducer.checkBoardValid(currentTempBoard.current);
            if (answer.length === 0) {
                alert('Congratulations! You have an amazing play *__*');
            } else {
                const rowsCollection = Array.from(gridBoard.getElementsByClassName('row-board'));

                for (let pos of answer) {
                    const x = pos[0].toString();
                    const y = pos[1].toString();
                    let isFound = false;

                    for (let row of rowsCollection) {
                        const cellsCollection = Array.from(row.getElementsByClassName('cell-board'));
        
                        for (let cell of cellsCollection) {
                            const cellUI = cell as HTMLDivElement;
                            const classList = cellUI.classList;
                            if (classList[0] === `row${x}` && classList[1] === `col${y}`) {
                                cellUI.style.border = '4px solid red';
                                isFound = true;
                                break;
                            }
                        }

                        if (isFound) {
                            break;
                        }
                    }
                }
            }
        }
    }

    drawBoard();    //draw board at initialize

    return (
        <Grid container direction='row'>
            <Grid item xs={12} lg={6} id='select-area'>
                <div>
                    <InputLabel id='label-size'>Choose size</InputLabel>
                    <Select labelId='label-size' value={board.length} onChange={changeSize}>
                        <MenuItem value="4">4 x 4</MenuItem>
                        <MenuItem value="6">6 x 6</MenuItem>
                        <MenuItem value="8">8 x 8</MenuItem>
                        <MenuItem value="10">10 x 10</MenuItem>
                    </Select>
                </div>

                <div>
                    <p style={{ marginTop: 30, marginBottom: 20 }}>
                        <img id='img-queen' alt='' src={process.env.PUBLIC_URL + '/img/queen-piece.jpg'} onDragStart={handleDragQueenStart} />
                    </p>
                    <div style={{ marginTop: 30, marginBottom: 30 }} onMouseDown={checkAnswer}>
                        <Button id='btn-check-answer' variant='contained' color='primary' disabled>Check answer</Button>
                    </div>
                </div>
            </Grid>

            <Grid item xs={12} lg={6} justifyContent='center' id='grid-board'>
                {rowsBoard.current}
            </Grid>
        </Grid>
    )
}
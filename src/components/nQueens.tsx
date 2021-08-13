import React, { ReactElement, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, MenuItem, Select, InputLabel } from "@material-ui/core";
import { changeBoard } from "../slices/nQueens-slices";
import { RootType } from "../store"; 
import { NqueenProducer } from '../producers/nQueensProducer';
import './nQueens.scss';

export const Nqueens = (): ReactElement => {
    let board = useSelector<RootType>(state => state.nQueens) as boolean[][];   //board state
    const dispatch = useDispatch();
    let initialRowsBoard: ReactElement[] = [];
    const rowsBoard = useRef(initialRowsBoard);     //display UI
    let initialCurrentTempboard = [...board];       //save board state immediately each change
    let currentTempBoard = useRef(initialCurrentTempboard);

    useEffect(() => {
        return () => {
            dispatch(changeBoard(currentTempBoard.current));
        }
    }, []);

    useEffect(() => {
        const btnCheckAnswer = document.querySelector('#btn-check-answer') as HTMLButtonElement;
        const rows = board.length;
        const eachQueenEachRow: boolean[] = Array(rows).fill(false);

        for (let i = 0; i < rows; i++) {
            for (let k = 0; k < rows; k++) {
                if (board[i][k]) {
                    eachQueenEachRow[i] = true;
                }
            }
        }

        if (eachQueenEachRow.filter(m => !m).length > 0) {
            btnCheckAnswer.setAttribute('disabled', 'disabled');
            (document.querySelector('#div-fake-check-answer') as HTMLDivElement).style.cursor = 'not-allowed';
        } else {
            btnCheckAnswer.removeAttribute('disabled');
            (document.querySelector('#div-fake-check-answer') as HTMLDivElement).style.cursor = 'auto';
        }
    }, [board]);

    const drawBoard = useCallback(() => {
        const setQueen = (e:React.MouseEvent<HTMLDivElement>): void => {
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
                    (document.querySelector('#div-fake-check-answer') as HTMLDivElement).style.cursor = 'not-allowed';
                } else {
                    btnCheckAnswer.removeAttribute('disabled');
                    (document.querySelector('#div-fake-check-answer') as HTMLDivElement).style.cursor = 'auto';
                }

                const elementsSameRow = gridBoard.getElementsByClassName(cellBoard.classList[0]);

                //reset background for all elements in that row
                if (elementsSameRow != null) {
                    for (let i = 0, n = elementsSameRow.length; i < n; i++) {
                        const cell = elementsSameRow[i] as HTMLDivElement;
                        cell.style.backgroundImage = 'none';
                        cell.style.border = 'none';
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

                if (board[i][k]) {
                    cells.push(React.createElement('div', { className: classNames, 
                        style: { backgroundImage: classNames.indexOf('white') !== -1 ? `url('${process.env.PUBLIC_URL + '/img/queen-piece.jpg'}')`
                                                                                      : `url('${process.env.PUBLIC_URL + '/img/queen-white-piece.jpg'}')`,
                                backgroundSize: 'cover'}, 
                        tabIndex: 0, onMouseDown: setQueen }));
                } else {
                    cells.push(React.createElement('div', { className: classNames, tabIndex: 0, onMouseDown: setQueen }));
                }
            }

            const rowClassNames = `row-board ${i === 0 ? '' : 'second-more'}`;
            rowsBoard.current.push(React.createElement('div', { className: rowClassNames }, cells));
        }
    }, [board]);

    /**
     * cbx Size change event
     * @param e 
     */
    const changeSize = (e:React.ChangeEvent<{value: unknown}>): void => {
        reInitializeBoard(parseInt(e.target.value as string));
    }

    const reInitializeBoard = (size: number): void => {
        let newBoard: boolean[][] = Array(size);
        for (let i = 0; i < size; i++) {
            newBoard[i] = Array(size).fill(false);
        }

        dispatch(changeBoard(newBoard));
    }

    /**
     * btn 'Check Answer' click event
     * @param e 
     * @returns 
     */
    const checkAnswer = (e: React.MouseEvent<HTMLDivElement>): void => {
        const btnCheckAnswer = document.querySelector('#btn-check-answer') as HTMLButtonElement;
        if (btnCheckAnswer.disabled) {
            return;
        }

        //construct new board from current UI
        const gridBoard = document.querySelector('#grid-board');

        if (gridBoard !== null) {
            const answer = NqueenProducer.checkBoardValid(currentTempBoard.current);

            if (answer.size === 0) {
                alert('Congratulations! You have an amazing play *__*');
                removeBorderCells(gridBoard);
            } else {
                const rowsCollection = Array.from(gridBoard.getElementsByClassName('row-board'));

                for (let row of rowsCollection) {
                    const cellsCollection = Array.from(row.getElementsByClassName('cell-board'));

                    for (let cell of cellsCollection) {
                        const cellUI = cell as HTMLDivElement;
                        const classList = [cellUI.classList[0], cellUI.classList[1]].join(' ');

                        if (answer.has(classList)) {
                            cellUI.style.border = '4px solid red';
                            answer.delete(classList);
                            break;
                        } else {
                            cellUI.style.border = 'none';
                        }
                    }
                }
            }
        }
    }

    const removeBorderCells = (gridBoard: Element) => {
        if (gridBoard !== null) {
            const rowsCollection = Array.from(gridBoard.getElementsByClassName('row-board'));

            for (let row of rowsCollection) {
                const cellsCollection = Array.from(row.getElementsByClassName('cell-board'));

                for (let cell of cellsCollection) {
                    const cellUI = cell as HTMLDivElement;
                    cellUI.style.border = 'none';
                }
            }
        }
    }

    drawBoard();    //draw board at initialize

    return (
        <Container className='main-container'>
            <Grid container direction='row'>
                <Grid item xs={12} lg={5} id='select-area'>
                    <Grid item xs={12}>
                        <InputLabel id='label-size'>Select size for the board</InputLabel>
                        <Select labelId='label-size' value={board.length} onChange={changeSize}>
                            <MenuItem value="4">4 x 4</MenuItem>
                            <MenuItem value="6">6 x 6</MenuItem>
                            <MenuItem value="8">8 x 8</MenuItem>
                            <MenuItem value="10">10 x 10</MenuItem>
                        </Select>
                    </Grid>

                    <Grid container direction='row'>
                        <Grid item xs={12} lg={4} style={{ marginTop: 30, marginBottom: 20, textAlign: 'center' }}>
                            <img id='img-queen' alt='' src={process.env.PUBLIC_URL + '/img/queen-piece.jpg'} />
                        </Grid>
                        <Grid item xs={12} lg={8} style={{ marginTop: 30, marginBottom: 20, lineHeight: '1.5rem',
                                                           display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <p>Pick any cell to set queen. Note that every row, column and diagonal only have one queen.</p>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} id='div-fake-check-answer' style={{ marginTop: 20, marginBottom: 30, cursor: 'not-allowed' }} 
                          onMouseDown={checkAnswer}>
                        <button id='btn-check-answer' className='primary'>Check answer</button>
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={7} justifyContent='center' id='grid-board'>
                    {rowsBoard.current}
                </Grid>
            </Grid>
        </Container>
    )
}
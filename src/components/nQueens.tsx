import React, { ReactElement, useEffect, MouseEventHandler } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, MenuItem, Select, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BoardState, changeBoard, changeQueen, setErrorBoard, removeErrorBoard } from "../slices/nQueens-slices";
import { RootType } from "../store";
import { NqueenProducer } from '../producers/nQueensProducer';
import './nQueens.scss';

const useStyles = makeStyles(theme => ({
    none: {
        backgroundImage: ''
    },
    queen: {
        backgroundImage: `url('${process.env.PUBLIC_URL + '/img/queen-piece.jpg'}')`,
        backgroundSize: 'cover'
    },
    whiteQueen: {
        backgroundImage: `url('${process.env.PUBLIC_URL + '/img/queen-white-piece.jpg'}')`,
        backgroundSize: 'cover'
    },
    ul: {
        listStyle: 'none'
    },
    border: {
        border: '4px solid red'
    }
}));

function cloneArray<T>(arr: T[][]): T[][] {
    const size = arr.length;
    const b: T[][] = Array(size);

    for (let i = 0; i < size; i++) {
        b[i] = Array(size);

        for (let k = 0; k < size; k++) {
            b[i][k] = arr[i][k];
        }
    }

    return b;
}

export const Nqueens = (): ReactElement => {
    let boardState = useSelector<RootType>(state => state.nQueens) as BoardState;   //board state
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        let eachQueenEachRow = false;

        for (let i = 0, n = boardState.size; i < n; i++) {
            let isOnThisRow = false;

            for (let k = 0; k < n; k++) {
                if (boardState.board[i][k]) {
                    isOnThisRow = true;
                    break;
                }
            }

            if (isOnThisRow) {
                if (i === n - 1) {
                    eachQueenEachRow = true;
                    break;
                }
            } else {
                break;
            }
        }

        const btnCheckAnswer = document.querySelector('#btn-check-answer') as HTMLButtonElement;
        if (eachQueenEachRow) {
            btnCheckAnswer.removeAttribute('disabled');
            (document.querySelector('#div-fake-check-answer') as HTMLDivElement).style.cursor = 'auto';
        } else {
            btnCheckAnswer.setAttribute('disabled', 'disabled');
            (document.querySelector('#div-fake-check-answer') as HTMLDivElement).style.cursor = 'not-allowed';
        }
    }, []);

    /**
     * cbx Size change event
     * @param e 
     */
    const changeSize = (e:React.ChangeEvent<{value: unknown}>): void => {
        const size = parseInt(e.target.value as string);
        dispatch(changeBoard(size));
    }

    const setQueen = (e: MouseEventHandler<HTMLDivElement>, rowIdx: number, colIdx: number): void => {
        const size = boardState.size;
        const tempBoard = cloneArray(boardState.board);

        for (let k = 0, n = size; k < n; k++) {
            if (k !== colIdx) {
                tempBoard[rowIdx][k] = false;
            } else {
                tempBoard[rowIdx][k] = true;
            }
        }

        let eachQueenEachRow = false;
        for (let i = 0; i < size; i++) {
            let isOnThisRow = false;

            for (let k = 0; k < size; k++) {
                if (tempBoard[i][k]) {
                    isOnThisRow = true;
                    break;
                }
            }

            if (isOnThisRow) {
                if (i === size - 1) {
                    eachQueenEachRow = true;
                    break;
                }
            } else {
                break;
            }
        }

        const btnCheckAnswer = document.querySelector('#btn-check-answer') as HTMLButtonElement;
        if (eachQueenEachRow) {
            btnCheckAnswer.removeAttribute('disabled');
            (document.querySelector('#div-fake-check-answer') as HTMLDivElement).style.cursor = 'auto';
        } else {
            btnCheckAnswer.setAttribute('disabled', 'disabled');
            (document.querySelector('#div-fake-check-answer') as HTMLDivElement).style.cursor = 'not-allowed';
        }

        dispatch(changeQueen(tempBoard));
    };

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

        const answer = NqueenProducer.checkBoardValid(boardState.board);

        if (answer.size === 0) {
            dispatch(removeErrorBoard())
        } else {
            (document.querySelector('#divCongrats') as HTMLDivElement).style.display = 'none';
            const tempErrBoard = cloneArray(boardState.errorBoard);

            for (let i = 0, n = boardState.size; i < n; i++)
                for (let k = 0; k < n; k++) {
                    const classList = `row${i} col${k}`;
                    if (answer.has(classList)) {
                        tempErrBoard[i][k] = true;
                        answer.delete(classList);
                        break;
                    } else {
                        tempErrBoard[i][k] = false;
                    }
                }

            dispatch(setErrorBoard(tempErrBoard));
        }
    }

    const getRowClassNames = (rowIdx: number): string => {
        let className = 'row-board';

        if (rowIdx > 0) {
            className += ' second-more';
        }

        return className;
    }

    const getCellClassNames = (rowIdx: number, colIdx: number): string => {
        let className = 'cell-board';

        const isWhiteCell = ((colIdx & 1) === 0 && (rowIdx & 1) === 0) || ((colIdx & 1) === 1 && (rowIdx & 1) === 1);
        if (isWhiteCell) {
            className += ' white';
        } else {
            className += ' black';
        }

        if (boardState.board[rowIdx][colIdx]) {
            if (isWhiteCell) {
                className += ` ${classes.queen}`;
            } else {
                className += ` ${classes.whiteQueen}`;
            }
        }

        if (boardState.errorBoard[rowIdx][colIdx]) {
            className += ` ${classes.border}`;
        }

        return className;
    }

    return (
        <Container className='main-container'>
            <Grid id='divCongrats' container direction='row' style={{display: boardState.showCongrats ? 'block' : 'none', 
                                                                    textAlign: 'center', padding: '10px'}}>
                <h1 style={{color: 'blue'}}>Congratulations! You have an amazing play *__*</h1>
            </Grid>

            <Grid container direction='row'>
                <Grid item xs={12} lg={5} id='select-area' style={{textAlign: 'center'}}>
                    <Grid item xs={12}>
                        <InputLabel id='label-size'>Select size for the board</InputLabel>
                        <Select labelId='label-size' value={boardState.size} onChange={changeSize}>
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
                    {boardState.board.map((row, rowIdx) => 
                        <div className={getRowClassNames(rowIdx)}>{
                            row.map((col, colIdx) => 
                                <div className={getCellClassNames(rowIdx, colIdx)} tabIndex={0} onMouseDown={(e: any) => setQueen(e, rowIdx, colIdx)}></div>
                            )}
                        </div>
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}
import React from 'react';
import { Grid } from "@material-ui/core"
import "./BoardView.scss"
import { IBoardProps } from '../models/IBoardProps';

export const BoardView: React.FC<IBoardProps> = (props) => {
    const { board, getRowClassNames, getCellClassNames, setQueen } = props;

    return (
        <Grid item xs={12} lg={7} justifyContent='center' id='grid-board'>
            {board.map((row, rowIdx) =>
                <div className={getRowClassNames(rowIdx)}>{
                    row.map((col, colIdx) =>
                        <div className={getCellClassNames(rowIdx, colIdx)} tabIndex={0} onMouseDown={(e: any) => setQueen(e, rowIdx, colIdx)}></div>
                    )}
                </div>
            )}
        </Grid>
    )
}
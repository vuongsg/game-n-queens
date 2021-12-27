import { MouseEventHandler } from "react";

export interface IBoardProps {
    board: boolean[][];
    getRowClassNames(rowIdx: number): string;
    getCellClassNames(rowIdx: number, colIdx: number): string;
    setQueen(e: MouseEventHandler<HTMLDivElement>, rowIdx: number, colIdx: number): void;
}
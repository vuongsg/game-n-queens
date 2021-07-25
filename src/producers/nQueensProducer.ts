export class NqueenProducer {
    static checkBoardValid(board: boolean[][]): Set<string> {
        const size = board.length;
        const result = new Set<string>();

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (board[row][col]) {
                    //check above
                    for (let i = row - 1; i >= 0; i--) {
                        if (board[i][col]) {
                            result.add(`row${i} col${col}`);
                            result.add(`row${row} col${col}`);
                        }
                    }

                    //check left-side
                    for (let k = col - 1; k >= 0; k--) {
                        if (board[row][k]) {
                            result.add(`row${row} col${k}`);
                            result.add(`row${row} col${col}`);
                        }
                    }
                    
                    //check upper-backward slash
                    for (let i = row - 1, k = col - 1; i >= 0 && k >= 0; i--, k--) {
                        if (board[i][k]) {
                            result.add(`row${i} col${k}`);
                            result.add(`row${row} col${col}`);
                        }
                    }

                    //check upper-forward slash
                    for (let i = row - 1, k = col + 1; i >= 0 && k < size; i--, k++) {
                        if (board[i][k]) {
                            result.add(`row${i} col${k}`);
                            result.add(`row${row} col${col}`);
                            i--;
                            k++;
                        }
                    }
                }
            }
        }

        return result;
    }
}
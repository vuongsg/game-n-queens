export class NqueenProducer {
    static checkBoardValid(board: boolean[][]): [number, number][] {
        const size = board.length;

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (board[row][col]) {
                    //check above
                    for (let i = row - 1; i >= 0; i--) {
                        if (board[i][col]) {
                            return [[i, col], [row, col]];
                        }
                    }

                    //check left-side
                    for (let k = col - 1; k >= 0; k--) {
                        if (board[row][k]) {
                            return [[row, k], [row, col]];
                        }
                    }
                    
                    //check upper-backward slash
                    for (let i = row - 1; i >= 0; i--)
                        for (let k = col - 1; k >= 0; k--) {
                            if (board[i][k]) {
                                return [[i, k], [row, col]];
                            }
                        }
                }
            }
        }

        return [];
    }
}
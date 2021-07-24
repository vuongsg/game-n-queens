export class NqueenProducer {
    board: boolean[][];

    constructor(size: number) {
        this.board = Array(size);
        for (let row = 0; row < size; row++) {
            this.board[row] = Array(size).fill(false);
        }
    }

    checkBoardValid(): boolean {
        const size = this.board.length;

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (this.board[row][col]) {
                    //check above
                    for (let i = row - 1; i >= 0; i--) {
                        if (this.board[i][col]) {
                            return false;
                        }
                    }

                    //check left-side
                    for (let k = col - 1; k >= 0; k--) {
                        if (this.board[row][k]) {
                            return false;
                        }
                    }
                    
                    //check upper-backward slash
                    for (let i = row - 1; i >= 0; i--)
                        for (let k = col - 1; k >= 0; k--) {
                            if (this.board[i][k]) {
                                return false;
                            }
                        }
                }
            }
        }

        return true;
    }
}
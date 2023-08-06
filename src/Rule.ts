import { PieceColor, Size } from "./Data";

export const startGame = (setBoard: Function) => {
  const newBoard = [...Array(Size * Size).fill(0)];
  newBoard[3 * Size + 3] = PieceColor.White;
  newBoard[4 * Size + 4] = PieceColor.White;
  newBoard[3 * Size + 4] = PieceColor.Black;
  newBoard[4 * Size + 3] = PieceColor.Black;

  setBoard(newBoard);
};

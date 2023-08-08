import { PieceColor, Point, Size } from "./Data";

export const startGame = (setBoard: Function, setIsPlaying: Function) => {
  const newBoard = [...Array(Size * Size).fill(0)];
  newBoard[3 * Size + 3] = PieceColor.White;
  newBoard[4 * Size + 4] = PieceColor.White;
  newBoard[3 * Size + 4] = PieceColor.Black;
  newBoard[4 * Size + 3] = PieceColor.Black;

  setBoard(newBoard);
  setIsPlaying(true);
};

export const onBoard = (x: number, y: number): boolean => {
  return x >= 0 && x < Size && y >= 0 && y < Size;
};

export const oppColor = (color: number): number => {
  return color === PieceColor.White ? PieceColor.Black : PieceColor.White;
};

export const flippable = (
  x: number,
  y: number,
  color: number,
  board: number[]
): Point[] => {
  const dx = [-1, 1, 0, 0, -1, 1, -1, 1];
  const dy = [0, 0, -1, 1, -1, -1, 1, 1];
  const get = (x: number, y: number): number => board[y * Size + x];

  let ret: Point[] = [];
  for (let i = 0; i < 8; i++) {
    let tx = x + dx[i];
    let ty = y + dy[i];

    let filpPos: Point[] = [];
    while (onBoard(tx, ty) && get(tx, ty) === oppColor(color)) {
      filpPos.push({ x: tx, y: ty });
      tx += dx[i];
      ty += dy[i];
    }

    if (filpPos.length > 0 && onBoard(tx, ty) && get(tx, ty) === color) {
      ret = [...ret, ...filpPos];
    }
  }

  return ret;
};

export const flip = (
  board: number[],
  color: number,
  posGroup: Point[]
): number[] => {
  const newBoard = board.slice();
  for (const pos of posGroup) {
    newBoard[pos.y * Size + pos.x] = color;
  }

  return newBoard;
};

export const printBoard = (board: number[]): void => {
  const colors = ["_", "#", "."];
  for (let y = 0; y < Size; y++) {
    let line = "";
    for (let x = 0; x < Size; x++) {
      line += colors[board[y * Size + x]];
    }
    console.log(line);
  }
};

import { PieceColor, Point, Size } from "./Data";

export const startGame = (
  setTurn: Function,
  setBoard: Function,
  setPieces: Function,
  setIsPlaying: Function
) => {
  const newBoard = [...Array(Size * Size).fill(PieceColor.None)];
  newBoard[3 * Size + 3] = PieceColor.White;
  newBoard[4 * Size + 4] = PieceColor.White;
  newBoard[3 * Size + 4] = PieceColor.Black;
  newBoard[4 * Size + 3] = PieceColor.Black;

  setTurn(PieceColor.Black);
  setPieces([2, 2]);
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
  posGroup: Point[],
  pieces: number[],
  setPieces: Function
): number[] => {
  const newBoard = board.slice();
  let diff: number[] = [0, 0];
  diff[color] += 1;
  for (const pos of posGroup) {
    newBoard[pos.y * Size + pos.x] = color;
    diff[color] += 1;
    diff[oppColor(color)] -= 1;
  }

  setPieces([pieces[0] + diff[0], pieces[1] + diff[1]]);

  return newBoard;
};

export const canPutPosition = (color: number, board: number[]): Point[] => {
  let points: Point[] = [];

  for (let i = 0; i < Size * Size; i++) {
    if (board[i] !== PieceColor.None) {
      continue;
    }
    const x = i % Size;
    const y = Math.floor(i / Size);

    points = points.concat(flippable(x, y, color, board));
  }

  let indexes = points.map((point) => point.y * Size + point.x);
  indexes = Array.from(new Set(indexes));
  return indexes.map((i) => {
    return { x: i % Size, y: Math.floor(i / Size) };
  });
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

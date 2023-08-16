import { PieceColor, Point, Size } from "./Data";

export const startGame = (
  setTurn: (_: number) => void,
  setBoard: (_: number[]) => void,
  setPieces: (_: number[]) => void,
  setIsPlaying: (_: boolean) => void,
  setIsResult: (_: boolean) => void,
  setCanPutPosition: (_: boolean[]) => void
) => {
  const newBoard: number[] = [...Array(Size * Size).fill(PieceColor.None)];
  newBoard[pointToIndex({ x: 3, y: 3 })] = PieceColor.White;
  newBoard[pointToIndex({ x: 4, y: 4 })] = PieceColor.White;
  newBoard[pointToIndex({ x: 3, y: 4 })] = PieceColor.Black;
  newBoard[pointToIndex({ x: 4, y: 3 })] = PieceColor.Black;

  const turn = PieceColor.Black;
  const canPutPosition: boolean[] = [...Array(Size * Size).fill(false)];
  for (const index of getCanPutPosition(turn, newBoard)) {
    canPutPosition[index] = true;
  }

  setTurn(turn);
  setPieces([2, 2]);
  setBoard(newBoard);
  setCanPutPosition(canPutPosition);
  setIsPlaying(true);
  setIsResult(false);
};

export const onBoard = (x: number, y: number): boolean => {
  return x >= 0 && x < Size && y >= 0 && y < Size;
};

export const oppColor = (color: number): number => {
  return color === PieceColor.White ? PieceColor.Black : PieceColor.White;
};

export const indexToPoint = (index: number): Point => {
  return { x: index % Size, y: Math.floor(index / Size) };
};

export const pointToIndex = (point: Point): number => {
  return point.y * Size + point.x;
};

export const flippable = (
  x: number,
  y: number,
  color: number,
  board: number[]
): Point[] => {
  const dx = [-1, 1, 0, 0, -1, 1, -1, 1];
  const dy = [0, 0, -1, 1, -1, -1, 1, 1];
  const get = (x: number, y: number): number => board[pointToIndex({ x, y })];

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
  setPieces: (_: number[]) => void
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

export const getCanPutPosition = (color: number, board: number[]): number[] => {
  let indexes: number[] = [];

  for (let i = 0; i < Size * Size; i++) {
    if (board[i] !== PieceColor.None) {
      continue;
    }
    const { x, y } = indexToPoint(i);

    if (flippable(x, y, color, board).length > 0) {
      indexes = indexes.concat(i);
    }
  }

  return Array.from(new Set(indexes));
};

export const changeTurn = (
  board: number[],
  turn: number,
  setTurn: (_: number) => void,
  setCanPutPosition: (_: boolean[]) => void
): void => {
  const nextTurn = oppColor(turn);
  setTurn(nextTurn);

  const canPutPosition: boolean[] = [...Array(Size * Size).fill(false)];
  for (const index of getCanPutPosition(nextTurn, board)) {
    canPutPosition[index] = true;
  }
  setCanPutPosition(canPutPosition);
};

export const resultGame = (
  setIsPlaying: (_: boolean) => void,
  setIsResult: (_: boolean) => void
): void => {
  setIsPlaying(false);
  setIsResult(true);
};

export const getResultColor = (board: number[]): string => {
  let pieces: number[] = [0, 0, 0];

  for (let i = 0; i < Size * Size; i++) {
    pieces[board[i]]++;
  }

  if (pieces[PieceColor.White] === pieces[PieceColor.Black]) {
    return "Draw";
  } else if (pieces[PieceColor.White] > pieces[PieceColor.Black]) {
    return "Win White";
  } else {
    return "Win Black";
  }
};

export const printBoard = (board: number[]): void => {
  const colors = ["_", "#", "."];
  for (let y = 0; y < Size; y++) {
    let line = "";
    for (let x = 0; x < Size; x++) {
      line += colors[board[pointToIndex({ x, y })]];
    }
    console.log(line);
  }
};

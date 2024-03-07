import { AllPieceType, PieceType, Point, Size } from "./Data";
import { think } from "./cpu";

export const startGame = (
  setTurn: (_: PieceType) => void,
  setBoard: (_: AllPieceType[]) => void,
  setPieces: (_: { [key in PieceType]: number }) => void,
  setIsPlaying: (_: boolean) => void,
  setIsResult: (_: boolean) => void,
  setCanPutPosition: (_: boolean[]) => void,
  setPassCount: (_: number) => void,
  pieces: { [key in PieceType]: number },
  isPlayerHuman: { [key in PieceType]: boolean },
) => {
  const newBoard: AllPieceType[] = [
    ...Array<AllPieceType>(Size * Size).fill("none"),
  ];
  newBoard[pointToIndex({ x: 3, y: 3 })] = "white";
  newBoard[pointToIndex({ x: 4, y: 4 })] = "white";
  newBoard[pointToIndex({ x: 3, y: 4 })] = "black";
  newBoard[pointToIndex({ x: 4, y: 3 })] = "black";

  const turn = "black";
  const canPutPosition: boolean[] = [...Array(Size * Size).fill(false)];
  for (const index of getCanPutPosition(turn, newBoard)) {
    canPutPosition[index] = true;
  }

  setTurn(turn);
  setPieces({ black: 2, white: 2 });
  setBoard(newBoard);
  setCanPutPosition(canPutPosition);
  setIsPlaying(true);
  setIsResult(false);

  if (!isPlayerHuman[turn]) {
    think(
      turn,
      newBoard,
      setBoard,
      pieces,
      setPieces,
      setPassCount,
      setTurn,
      setCanPutPosition,
    );
  }
};

export const onBoard = (x: number, y: number): boolean => {
  return x >= 0 && x < Size && y >= 0 && y < Size;
};

export const oppColor = (color: PieceType): PieceType => {
  return color === "white" ? "black" : "white";
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
  color: PieceType,
  board: AllPieceType[],
): Point[] => {
  const dx = [-1, 1, 0, 0, -1, 1, -1, 1];
  const dy = [0, 0, -1, 1, -1, -1, 1, 1];
  const get = (x: number, y: number): AllPieceType =>
    board[pointToIndex({ x, y })];

  let ret: Point[] = [];
  for (let i = 0; i < 8; i++) {
    let tx = x + dx[i];
    let ty = y + dy[i];

    const filpPos: Point[] = [];
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
  board: AllPieceType[],
  color: PieceType,
  posGroup: Point[],
  pieces: { [key in PieceType]: number },
  setPieces: (_: { [key in PieceType]: number }) => void,
): AllPieceType[] => {
  const newBoard = board.slice();
  const diff: { [key in PieceType]: number } = {
    black: 0,
    white: 0,
  };

  diff[color] = 1;

  for (const pos of posGroup) {
    newBoard[pos.y * Size + pos.x] = color;
    diff[color] += 1;
    diff[oppColor(color)] -= 1;
  }

  setPieces({
    black: pieces.black + diff.black,
    white: pieces.white + diff.white,
  });

  return newBoard;
};

export const getCanPutPosition = (
  color: PieceType,
  board: AllPieceType[],
): number[] => {
  let indexes: number[] = [];

  for (let i = 0; i < Size * Size; i++) {
    if (board[i] !== "none") {
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
  board: AllPieceType[],
  turn: PieceType,
  setTurn: (_: PieceType) => void,
  setCanPutPosition: (_: boolean[]) => void,
): void => {
  const nextTurn = oppColor(turn);
  setTurn(nextTurn);

  const canPutPosition: boolean[] = [
    ...Array<boolean>(Size * Size).fill(false),
  ];
  for (const index of getCanPutPosition(nextTurn, board)) {
    canPutPosition[index] = true;
  }
  setCanPutPosition(canPutPosition);
};

export const resultGame = (
  setIsPlaying: (_: boolean) => void,
  setIsResult: (_: boolean) => void,
): void => {
  setIsPlaying(false);
  setIsResult(true);
};

export const getResultColor = (board: AllPieceType[]): string => {
  const pieces: { [key in AllPieceType]: number } = {
    black: 0,
    white: 0,
    none: 0,
  };

  for (let i = 0; i < Size * Size; i++) {
    pieces[board[i]]++;
  }

  if (pieces.white === pieces.black) {
    return "Draw";
  }
  if (pieces.white > pieces.black) {
    return "Win White";
  }
  return "Win Black";
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

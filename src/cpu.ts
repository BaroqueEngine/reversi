import type { AllPieceType, PieceType } from "./Data";
import {
  changeTurn,
  flip,
  flippable,
  getCanPutPosition,
  indexToPoint,
} from "./Rule";

export function think(
  turn: PieceType,
  board: AllPieceType[],
  setBoard: (_: AllPieceType[]) => void,
  pieces: { [key in PieceType]: number },
  setPieces: (_: { [key in PieceType]: number }) => void,
  setPassCount: (_: number) => void,
  setTurn: (_: PieceType) => void,
  setCanPutPosition: (_: boolean[]) => void,
) {
  const positions = getCanPutPosition(turn, board);
  const index = positions[Math.floor(Math.random() * positions.length)];
  const pos = indexToPoint(index);

  const flipPos = flippable(pos.x, pos.y, turn, board);
  if (flipPos.length > 0) {
    board[index] = turn;
    const newBoard = flip(board, turn, flipPos, pieces, setPieces);
    setBoard(newBoard);
    setPassCount(0);
    changeTurn(newBoard, turn, setTurn, setCanPutPosition);
  }
}

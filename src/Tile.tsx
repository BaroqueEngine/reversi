/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Piece from "./Piece";
import { useAtom } from "jotai";
import {
  boardAtom,
  canPutPositionAtom,
  isPlayingAtom,
  piecesAtom,
  turnAtom,
} from "./Atoms";
import { PieceColor, Size } from "./Data";
import { flip, flippable, getCanPutPosition } from "./Rule";

interface Props {
  x: number;
  y: number;
  size: number;
}

function Tile({ x, y, size }: Props) {
  const [turn, setTurn] = useAtom(turnAtom);
  const [board, setBoard] = useAtom(boardAtom);
  const [isPlaying] = useAtom(isPlayingAtom);
  const [pieces, setPieces] = useAtom(piecesAtom);
  const [canPutPosition, setCanPutPosition] = useAtom(canPutPositionAtom);
  const index = y * Size + x;
  const color = board[index];
  const setColor = (color: number) => (board[index] = color);

  const onClickHandler = () => {
    if (!isPlaying) {
      return;
    }
    if (color !== PieceColor.None) {
      return;
    }
    const flipPos = flippable(x, y, turn, board);
    if (flipPos.length > 0) {
      setColor(turn);
      const newBoard = flip(board, turn, flipPos, pieces, setPieces);
      setBoard(newBoard);

      const nextTurn =
        turn === PieceColor.Black ? PieceColor.White : PieceColor.Black;
      setTurn(nextTurn);

      const canPutPosition = [...Array(Size * Size).fill(false)];
      for (const index of getCanPutPosition(nextTurn, newBoard)) {
        canPutPosition[index] = true;
      }
      setCanPutPosition(canPutPosition);
    }
  };

  const css = [container];
  if (canPutPosition[y * Size + x]) {
    css.push(selected);
  }

  return (
    <div
      css={css}
      style={{
        left: x * size,
        top: y * size,
        width: size,
        height: size,
      }}
      className="tile"
      onClick={onClickHandler}
    >
      <Piece value={board[y * Size + x]} />
    </div>
  );
}

export default Tile;

const container = css`
  border: 1px solid #000;
  background: green;

  &:hover {
    opacity: 0.8;
  }
`;

const selected = css`
  background: greenyellow;
`;

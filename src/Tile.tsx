/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAtom } from "jotai";
import {
  boardAtom,
  canPutPositionAtom,
  isPlayingAtom,
  passCountAtom,
  piecesAtom,
  turnAtom,
} from "./Atoms";
import Piece from "./Piece";
import { changeTurn, flip, flippable, pointToIndex } from "./Rule";

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
  const [_passCount, setPassCount] = useAtom(passCountAtom);
  const index = pointToIndex({ x, y });
  const color = board[index];

  const onClickHandler = () => {
    if (!isPlaying) {
      return;
    }
    if (color !== "none") {
      return;
    }

    const flipPos = flippable(x, y, turn, board);
    if (flipPos.length > 0) {
      board[index] = turn;
      const newBoard = flip(board, turn, flipPos, pieces, setPieces);
      setBoard(newBoard);
      setPassCount(0);
      changeTurn(newBoard, turn, setTurn, setCanPutPosition);
    }
  };

  const css = [container];
  if (canPutPosition[pointToIndex({ x, y })]) {
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
      <Piece value={board[pointToIndex({ x, y })]} />
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

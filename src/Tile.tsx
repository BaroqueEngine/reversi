/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Piece from "./Piece";
import { useAtom } from "jotai";
import { boardAtom, isPlayingAtom, turnAtom } from "./Atoms";
import { PieceColor, Size } from "./Data";

interface Props {
  x: number;
  y: number;
  size: number;
}

function Tile({ x, y, size }: Props) {
  const [turn, setTurn] = useAtom(turnAtom);
  const [board, setBoard] = useAtom(boardAtom);
  const [isPlaying] = useAtom(isPlayingAtom);
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
    setColor(turn);
    setBoard(board.slice());
    setTurn(turn === PieceColor.Black ? PieceColor.White : PieceColor.Black);
  };

  return (
    <div
      css={container}
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

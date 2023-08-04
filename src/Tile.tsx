/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Piece from "./Piece";
import { useState } from "react";
import { useAtom } from "jotai";
import { turnAtom } from "./Atoms";
import { PieceColor } from "./Data";

interface Props {
  x: number;
  y: number;
  size: number;
}

function Tile({ x, y, size }: Props) {
  const [value, setValue] = useState(0);
  const [turn, setTurn] = useAtom(turnAtom);

  const onClickHandler = () => {
    if (value !== PieceColor.None) {
      return;
    }
    setValue(turn);
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
      <Piece value={value} />
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

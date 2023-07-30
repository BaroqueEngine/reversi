/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type Props = {
  x: number;
  y: number;
  size: number;
  cellSize: number;
  color: number;
};

function Piece({ x, y, size, cellSize, color }: Props) {
  const colors = ["transparent", "black", "white"];

  return (
    <div
      css={container}
      style={{
        left: x * cellSize + (cellSize - size) / 2,
        top: y * cellSize + (cellSize - size) / 2,
        width: size,
        height: size,
        backgroundColor: colors[color],
      }}
    ></div>
  );
}

export default Piece;

const container = css`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
`;

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface Props {
  x: number;
  y: number;
  size: number;
  selectTile: (x: number, y: number) => void;
}

function Tile({ x, y, size, selectTile }: Props) {
  const onClick = () => {
    selectTile(x, y);
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
      onClick={onClick}
    ></div>
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

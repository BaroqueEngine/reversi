/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Piece from "./Piece";
import { useState } from "react";

interface Props {
  x: number;
  y: number;
  size: number;
}

function Tile({ x, y, size }: Props) {
  const [value, setValue] = useState(0);

  const onClickHandler = () => {
    setValue(2);
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

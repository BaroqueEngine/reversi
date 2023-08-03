/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type Prop = {
  value: number;
};

function Piece({ value }: Prop) {
  const colors = ["transparent", "black", "white"];

  return <div css={container} style={{ backgroundColor: colors[value] }}></div>;
}

export default Piece;

const container = css`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

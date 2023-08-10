/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Colors } from "./Data";

type Prop = {
  value: number;
};

function Piece({ value }: Prop) {
  return <div css={container} style={{ backgroundColor: Colors[value] }}></div>;
}

export default Piece;

const container = css`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

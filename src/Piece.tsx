/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { type AllPieceType, Colors } from "./Data";

type Props = {
  value: AllPieceType;
};

function Piece({ value }: Props) {
  return <div css={container} style={{ backgroundColor: Colors[value] }} />;
}

export default Piece;

const container = css`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  width: 90%;
  height: 90%;
  transform: translate(5%, 5%);
`;

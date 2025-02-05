/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { PieceType } from "./Data";

type Props = {
  label: string;
  isPlayerHuman: { [key in PieceType]: boolean };
  setIsPlayerHuman: (_: { [key in PieceType]: boolean }) => void;
  color: PieceType;
};

function SelectPlayer({
  label,
  isPlayerHuman,
  setIsPlayerHuman,
  color,
}: Props) {
  function onSelectPlayer(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    const select = event.currentTarget.value === "human";
    const newSelectPlayer = { ...isPlayerHuman };
    newSelectPlayer[color] = select;
    setIsPlayerHuman(newSelectPlayer);
  }

  return (
    <>
      <div>{label}</div>
      <div>
        <button
          type="button"
          value="human"
          onClick={(event) => onSelectPlayer(event)}
          style={{
            borderColor: isPlayerHuman[color] ? "#dddddd" : "#6b6b6b",
          }}
          css={button}
        >
          HUMAN
        </button>
      </div>
      <div>
        <button
          type="button"
          value="cpu"
          onClick={(event) => onSelectPlayer(event)}
          style={{
            borderColor: !isPlayerHuman[color] ? "#dddddd" : "#6b6b6b",
          }}
          css={button}
        >
          CPU
        </button>
      </div>
    </>
  );
}

export default SelectPlayer;

const button = css`
  appearance: none;
  border: solid 2px #6b6b6b;
  cursor: pointer;

  :hover {
    background-color: #888;
  }
`;

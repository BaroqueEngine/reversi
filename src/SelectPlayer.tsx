/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type Props = {
  label: string;
  selectPlayer: boolean[];
  setSelectPlayer: (_: boolean[]) => void;
  selectPlayerIndex: number;
};

function SelectPlayer({
  label,
  selectPlayer,
  setSelectPlayer,
  selectPlayerIndex,
}: Props) {
  function onSelectPlayer(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    const select = event.currentTarget.value === "human";
    const newSelectPlayser = selectPlayer.slice();
    newSelectPlayser[selectPlayerIndex] = select;
    setSelectPlayer(newSelectPlayser);
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
            borderColor: selectPlayer[selectPlayerIndex]
              ? "#dddddd"
              : "#6b6b6b",
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
            borderColor: !selectPlayer[selectPlayerIndex]
              ? "#dddddd"
              : "#6b6b6b",
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

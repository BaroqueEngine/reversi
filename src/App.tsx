import { useAtom } from "jotai";
import "./App.css";
import Board from "./Board";
import { startGame } from "./Rule";
import { boardAtom, isPlayingAtom } from "./Atoms";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

function App() {
  const [_board, setBoard] = useAtom(boardAtom);
  const [_isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  return (
    <>
      <div className="container">
        <div className="left">
          <h1 css={title}>Reversi</h1>
          <div>
            <div css={rowSelect}>
              <div>
                <button>HUMAN</button>
              </div>
              <div>
                <button>HUMAN</button>
              </div>
            </div>
            <div css={rowSelect}>
              <div>
                <button>COM</button>
              </div>
              <div>
                <button>COM</button>
              </div>
            </div>
          </div>
          <button
            css={startGameButton}
            onClick={() => startGame(setBoard, setIsPlaying)}
          >
            Start Game
          </button>
          <div css={info}>
            <div css={row}>
              <div></div>
              <div></div>
              <div>WHITE</div>
              <div>BLACK</div>
            </div>
            <div css={row}>
              <div>Pieces</div>
              <div>&gt;</div>
              <div>11</div>
              <div>22</div>
            </div>
            <div css={row}>
              <div>Mobility</div>
              <div>&gt;</div>
              <div>3</div>
              <div>7</div>
            </div>
          </div>
        </div>
        <div className="right">
          <Board />
        </div>
      </div>
    </>
  );
}

export default App;

const title = css`
  margin-bottom: 30px;
`;

const row = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const rowSelect = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  margin-top: 10px;

  button {
    width: 100%;
    height: 30px;
  }
`;

const startGameButton = css`
  width: 100%;
  height: 30px;
  margin-top: 30px;
`;

const info = css`
  margin-top: 40px;
`;

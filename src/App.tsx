import { useAtom } from "jotai";
import "./App.css";
import Board from "./Board";
import { startGame } from "./Rule";
import { boardAtom, isPlayingAtom, piecesAtom, turnAtom } from "./Atoms";
import { css } from "@emotion/react";
import { PieceColor } from "./Data";
/** @jsxImportSource @emotion/react */

function App() {
  const [_board, setBoard] = useAtom(boardAtom);
  const [_isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [pieces, setPieces] = useAtom(piecesAtom);
  const [_turn, setTurn] = useAtom(turnAtom);

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
            onClick={() =>
              startGame(setTurn, setBoard, setPieces, setIsPlaying)
            }
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
              <div>{pieces[PieceColor.White]}</div>
              <div>{pieces[PieceColor.Black]}</div>
            </div>
            <div css={row}>
              <div>Mobility</div>
              <div>&gt;</div>
              <div>0</div>
              <div>0</div>
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

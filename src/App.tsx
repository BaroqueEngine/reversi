import { css } from "@emotion/react";
import { useAtom } from "jotai";
import "./App.css";
import {
  boardAtom,
  canPutPositionAtom,
  isPlayerHumanAtom,
  isPlayingAtom,
  isResultAtom,
  passCountAtom,
  piecesAtom,
  turnAtom,
} from "./Atoms";
import Board from "./Board";
import {
  changeTurn,
  getCanPutPosition,
  getResultColor,
  resultGame,
  startGame,
} from "./Rule";
import SelectPlayer from "./SelectPlayer";
/** @jsxImportSource @emotion/react */

function App() {
  const [board, setBoard] = useAtom(boardAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [isResult, setIsResult] = useAtom(isResultAtom);
  const [pieces, setPieces] = useAtom(piecesAtom);
  const [turn, setTurn] = useAtom(turnAtom);
  const [_canPutPosition, setCanPutPosition] = useAtom(canPutPositionAtom);
  const [passCount, setPassCount] = useAtom(passCountAtom);
  const [isPlayerHuman, setIsPlayerHuman] = useAtom(isPlayerHumanAtom);

  return (
    <>
      <div className="container">
        <div className="left">
          <h1 css={title}>Reversi</h1>
          <div>
            <div css={rowSelect}>
              <SelectPlayer
                label="1P"
                isPlayerHuman={isPlayerHuman}
                setIsPlayerHuman={setIsPlayerHuman}
                color={"black"}
              />
            </div>
            <div css={rowSelect}>
              <SelectPlayer
                label="2P"
                isPlayerHuman={isPlayerHuman}
                setIsPlayerHuman={setIsPlayerHuman}
                color={"white"}
              />
            </div>
          </div>
          <button
            type="button"
            css={startGameButton}
            onClick={() =>
              startGame(
                setTurn,
                setBoard,
                setPieces,
                setIsPlaying,
                setIsResult,
                setCanPutPosition,
              )
            }
          >
            Start Game
          </button>
          {isPlaying && getCanPutPosition(turn, board).length === 0 && (
            <button
              type="button"
              css={startGameButton}
              onClick={() => {
                setPassCount(passCount + 1);
                if (passCount === 1) {
                  resultGame(setIsPlaying, setIsResult);
                } else {
                  changeTurn(board, turn, setTurn, setCanPutPosition);
                }
              }}
            >
              PASS
            </button>
          )}
          <div css={info}>
            <div css={row}>
              <div />
              <div />
              <div>WHITE</div>
              <div>BLACK</div>
            </div>
            <div css={row}>
              <div>Pieces</div>
              <div>&gt;</div>
              <div>{pieces.white}</div>
              <div>{pieces.black}</div>
            </div>
            <div css={row}>
              <div>Mobility</div>
              <div>&gt;</div>
              <div>{getCanPutPosition("white", board).length}</div>
              <div>{getCanPutPosition("black", board).length}</div>
            </div>
            <div css={result}>{isResult && getResultColor(board)}</div>
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
  grid-template-columns: 0.5fr 1fr 1fr;
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

const result = css`
  margin-top: 15px;
`;

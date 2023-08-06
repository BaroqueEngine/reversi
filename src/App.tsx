import { useAtom } from "jotai";
import "./App.css";
import Board from "./Board";
import { startGame } from "./Rule";
import { boardAtom, isPlayingAtom } from "./Atoms";
/** @jsxImportSource @emotion/react */

function App() {
  const [_board, setBoard] = useAtom(boardAtom);
  const [_isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  return (
    <>
      <div className="container">
        <div className="left">
          <h1>Reversi</h1>
          <button onClick={() => startGame(setBoard, setIsPlaying)}>
            Start Game
          </button>
        </div>
        <div className="right">
          <Board />
        </div>
      </div>
    </>
  );
}

export default App;

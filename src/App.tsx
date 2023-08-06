import { useAtom } from "jotai";
import "./App.css";
import Board from "./Board";
import { startGame } from "./Rule";
import { boardAtom } from "./Atoms";
/** @jsxImportSource @emotion/react */

function App() {
  const [_, setBoard] = useAtom(boardAtom);

  return (
    <>
      <div className="container">
        <div className="left">
          <h1>Reversi</h1>
          <button onClick={() => startGame(setBoard)}>Start Game</button>
        </div>
        <div className="right">
          <Board />
        </div>
      </div>
    </>
  );
}

export default App;

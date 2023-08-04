import "./App.css";
import Board from "./Board";
import { resetGame } from "./Rule";
/** @jsxImportSource @emotion/react */

function App() {
  return (
    <>
      <div className="container">
        <div className="left">
          <h1>Reversi</h1>
          <button>Reset Game</button>
        </div>
        <div className="right">
          <Board />
        </div>
      </div>
    </>
  );
}

export default App;

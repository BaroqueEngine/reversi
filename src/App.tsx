import "./App.css";
import Board from "./Board";
/** @jsxImportSource @emotion/react */

function App() {
  return (
    <>
      <div className="container">
        <div className="left">
          <h1>Reversi</h1>
        </div>
        <div className="right">
          <Board />
        </div>
      </div>
    </>
  );
}

export default App;
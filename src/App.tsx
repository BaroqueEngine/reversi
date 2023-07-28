import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">
        <div className="left">
          <h1>Reversi</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
          </div>
        </div>
        <div className="right">
          <div className="board"></div>
        </div>
      </div>
    </>
  );
}

export default App;

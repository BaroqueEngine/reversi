import "./App.css";
import Piece from "./Piece";
import Tile from "./Tile";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

function App() {
  const SIZE = 8;
  const NONE = 0;
  const BLACK = 1;
  const WHITE = 2;

  const [board, setBoard] = useState<number[]>([]);
  for (let y = 0; y < SIZE * SIZE; y++) {
    board[y] = NONE;
  }

  const setPiece = (board: number[], x: number, y: number, color: number) => {
    board[y * SIZE + x] = color;
  };

  setPiece(board, 3, 3, WHITE);
  setPiece(board, 4, 4, WHITE);
  setPiece(board, 3, 4, BLACK);
  setPiece(board, 4, 3, BLACK);

  const createTiles = () => {
    return [...Array(SIZE * SIZE)].map((_, i) => {
      const x = i % SIZE;
      const y = Math.floor(i / SIZE);
      return (
        <Tile key={i} x={x} y={y} size={45} selectTile={selectTile}></Tile>
      );
    });
  };

  const selectTile = (x: number, y: number) => {
    const newBoard = [...board];
    newBoard[0] = WHITE;
    // setPiece(newBoard, x, y, WHITE);
    setBoard([2]);
    alert(board[0]);
  };

  const createPieces = (board: number[]) => {
    return [...Array(SIZE * SIZE)].map((_, i) => {
      const x = i % SIZE;
      const y = Math.floor(i / SIZE);
      return (
        <Piece
          key={i}
          x={x}
          y={y}
          size={26}
          cellSize={45}
          color={board[y * SIZE + x]}
        ></Piece>
      );
    });
  };

  return (
    <>
      <div className="container">
        <div className="left">
          <h1>Reversi</h1>
        </div>
        <div className="right">
          <div className="board">{createTiles()}</div>
          <div css={pieces}>{createPieces(board)}</div>
        </div>
      </div>
    </>
  );
}

export default App;

const pieces = css`
  position: relative;
`;

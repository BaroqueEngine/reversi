import { indexToPoint } from "./Rule";
import Tile from "./Tile";

function Board() {
  const SIZE = 8;

  return (
    <>
      <div style={{ position: "relative" }}>
        {[...Array(SIZE * SIZE)].map((_, i) => {
          const { x, y } = indexToPoint(i);
          return (
            <Tile
              key={`${x.toString()}_${y.toString()}`}
              x={x}
              y={y}
              size={45}
            />
          );
        })}
      </div>
    </>
  );
}

export default Board;

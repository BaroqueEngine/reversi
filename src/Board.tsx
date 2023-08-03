import Tile from "./Tile";

function Board() {
  const SIZE = 8;

  return (
    <>
      <div style={{ position: "relative" }}>
        {[...Array(SIZE * SIZE)].map((_, i) => {
          const x = i % SIZE;
          const y = Math.floor(i / SIZE);
          return <Tile key={i} x={x} y={y} size={45}></Tile>;
        })}
      </div>
    </>
  );
}

export default Board;

import Square from "./Square";
import "../index.css";

function Board({ size, squares, winningLine, onClick }) {
  const sizeOfBoard = size;
  let Squares = [];
  for (let i = 0; i < sizeOfBoard; i++) {
    let row = [];
    for (let j = 0; j < sizeOfBoard; j++) {
      const index = i * sizeOfBoard + j;
      row.push(renderSquare(squares[index], index,winningLine && winningLine.includes(index), onClick));
    }
    Squares.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }
  return <div>{Squares}</div>;
}

function renderSquare(value, i, isWinningSquare, onClick) {
  return (
    <Square
      key={i}
      value={value}
      onClick={() => onClick(i)}
      highlight={isWinningSquare}
    />
  );
}

export default Board;

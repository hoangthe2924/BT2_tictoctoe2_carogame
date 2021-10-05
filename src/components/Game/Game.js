import Board from "../Board/Board";
import { calculateCol, calculateRow, calculateWinner } from "../../rules";
import "./Game.css";
import "../../bootstrap.css"
import { useState } from "react";

function Game() {
  const [sizeOfBoard, setSizeOfBoard] = useState(10);
  const [history, setHistory] = useState([
    {
      squares: Array(Math.pow(10, 2)).fill(null),
      idxMoveSquare: null,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [listIsAscending, setListIsAscending] = useState(true);

  //define some handler functions
  function handleClick(i) {
    const History = history.slice(0, stepNumber + 1);
    const current = History[History.length - 1];
    const Squares = current.squares.slice();
    if (
      calculateWinner(current.idxMoveSquare, sizeOfBoard, Squares).winner ||
      Squares[i]
    ) {
      return;
    }
    Squares[i] = xIsNext ? "X" : "O";
    setHistory(
      History.concat([
        {
          squares: Squares,
          idxMoveSquare: i,
        },
      ])
    );
    setStepNumber(History.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function sortHandler() {
    setListIsAscending(!listIsAscending);
  }

  function changeSizeHandler(event) {
    const newSizeOfBoard = +event.target.value;
    setSizeOfBoard(newSizeOfBoard);
    setHistory([
      {
        squares: Array(Math.pow(newSizeOfBoard, 2)).fill(null),
        idxMoveSquare: null,
      },
    ]);
    setStepNumber(0);
    setXIsNext(true);
    setListIsAscending(true);
  }

  function renderOptions() {
    return (
      <label className="mb-3">
        <div className="font-weight-bolder">Change size of board to: </div>
        <select className="custom-select m-1"
          onChange={changeSizeHandler}
          defaultValue={sizeOfBoard}
        >
          {[...Array(16).keys()].map((i) => {
            return (
              <option key={i+5} className="options" value={i + 5}>
                {i + 5}x{i + 5}
              </option>
            );
          })}
        </select>
      </label>
    );
  }

  //continue with business
  const History = history;
  const current = History[stepNumber];
  const { winner, winningLine } = calculateWinner(
    current.idxMoveSquare,
    sizeOfBoard,
    current.squares
  );

  const moves = History.map((step, move) => {
    const idxMoveSquare = step.idxMoveSquare;
    const col = calculateCol(idxMoveSquare, sizeOfBoard);
    const row = calculateRow(idxMoveSquare, sizeOfBoard);
    const player = move % 2 === 0? 'O':'X';
    const desc = move
      ? "Go to move #" + move + ` of player ${player} at (${col}, ${row})`
      : "Go to game start";
    const classes = "btn btn-sm size-btn text-left m-1 " + (move === stepNumber ? "btn-secondary" : "btn-light");

    return (
      <li key={move}>
        <button className={classes} onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    if (stepNumber === sizeOfBoard * sizeOfBoard) {
      status = "Result: draw";
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  if (!listIsAscending) {
    moves.reverse();
  }

  return (
    <div className="container">
      <div className="text-center m-2">18120569 - Đỗ Hoàng Thế</div>
      <hr/>
      <div className="text-center mb-3">{renderOptions()}</div>
      <div className="game">
        <div className="game-board">
          <Board
            size={sizeOfBoard}
            squares={current.squares}
            onClick={(i) => handleClick(i)}
            winningLine={winningLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button className="btn btn-info m-2" onClick={() => sortHandler()}>
              {listIsAscending ? "Descending Order" : "Ascending Order"}
            </button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

export default Game;

function calculateCol(index, sizeOfBoard) {
  return (index % sizeOfBoard) + 1;
}

function calculateRow(index, sizeOfBoard) {
  return Math.floor(index / sizeOfBoard) + 1;
}

function calculateWinner(idxMoveSquare, sizeOfBoard, squares) {
  let i;
  let j;
  let aboveBounder;
  let belowBounder;
  let line;
  let count;
  const player = squares[idxMoveSquare];

  //check theo chieu ngang
  i = idxMoveSquare - 1;
  j = idxMoveSquare + 1;
  count = 1;
  line = [];
  aboveBounder = calculateRow(idxMoveSquare, sizeOfBoard) * sizeOfBoard - 1;
  belowBounder = (calculateRow(idxMoveSquare, sizeOfBoard) - 1) * sizeOfBoard;
  while (i >= belowBounder || j <= aboveBounder) {
    if (i >= belowBounder && squares[i] === player) {
      count++;
      line.push(i);
      i--;
    } else {
      i = belowBounder - 1;
    }
    if (j >= belowBounder && squares[j] === player) {
      count++;
      line.push(j);
      j++;
    } else {
      j = aboveBounder + 1;
    }
    if (count >= 5) {
      line.push(idxMoveSquare);
      line.sort();
      return {
        winner: player,
        winningLine: line,
      };
    }
  }

  //check theo chieu doc
  i = idxMoveSquare - sizeOfBoard;
  j = idxMoveSquare + sizeOfBoard;
  count = 1;
  line = [];
  while (i >= 0 || j <= sizeOfBoard * sizeOfBoard) {
    if (i >= 0 && squares[i] === player) {
      count++;
      line.push(i);
      i -= sizeOfBoard;
    } else {
      i = -1;
    }
    if (j <= sizeOfBoard * sizeOfBoard && squares[j] === player) {
      count++;
      line.push(j);
      j += sizeOfBoard;
    } else {
      j = sizeOfBoard * sizeOfBoard + 1;
    }

    if (count >= 5) {
      line.push(idxMoveSquare);
      line.sort();
      return {
        winner: player,
        winningLine: line,
      };
    }
  }

  //check theo cheo trai tren - phai duoi
  i = (calculateRow(idxMoveSquare, sizeOfBoard) - calculateRow(idxMoveSquare - (sizeOfBoard + 1), sizeOfBoard) === 1)? idxMoveSquare - (sizeOfBoard + 1) : -1;
  j = (calculateRow(idxMoveSquare - (sizeOfBoard + 1), sizeOfBoard) - calculateRow(idxMoveSquare, sizeOfBoard) === 1)? idxMoveSquare + sizeOfBoard + 1 : sizeOfBoard * sizeOfBoard + 1;
  count = 1;
  line = [];
  while (i >= 0 || j <= sizeOfBoard * sizeOfBoard) {
    if (i >= 0 && squares[i] === player) {
      count++;
      line.push(i);
      if (
        calculateRow(i, sizeOfBoard) -
          calculateRow(i - sizeOfBoard - 1, sizeOfBoard) ===
        1
      ) {
        i -= sizeOfBoard + 1;
      } else {
        i = -1;
      }
    } else {
      i = -1;
    }

    if (j <= sizeOfBoard * sizeOfBoard && squares[j] === player) {
      count++;
      line.push(j);
      if (
        calculateRow(j + sizeOfBoard + 1, sizeOfBoard) -
          calculateRow(j, sizeOfBoard) ===
        1
      ) {
        j += sizeOfBoard + 1;
      } else {
        j = sizeOfBoard * sizeOfBoard + 1;
      }
    } else {
      j = sizeOfBoard * sizeOfBoard + 1;
    }

    if (count >= 5) {
      line.push(idxMoveSquare);
      line.sort();
      return {
        winner: player,
        winningLine: line,
      };
    }
  }

  //check theo cheo phai tren - trai duoi
  i = (calculateRow(idxMoveSquare, sizeOfBoard) - calculateRow(idxMoveSquare - (sizeOfBoard - 1), sizeOfBoard) === 1)? idxMoveSquare - (sizeOfBoard - 1) : -1;
  j = (calculateRow(idxMoveSquare - (sizeOfBoard - 1), sizeOfBoard) - calculateRow(idxMoveSquare, sizeOfBoard) === 1)? idxMoveSquare + sizeOfBoard - 1 : sizeOfBoard * sizeOfBoard + 1;
  count = 1;
  line = [];
  while (i >= 0 || j <= sizeOfBoard * sizeOfBoard) {
    if (i >= 0 && squares[i] === player) {
      count++;
      line.push(i);
      if (
        calculateRow(i, sizeOfBoard) -
          calculateRow(i - sizeOfBoard + 1, sizeOfBoard) ===
        1
      ) {
        i -= sizeOfBoard - 1;
      } else {
        i = -1;
      }
    } else {
      i = -1;
    }
    if (j <= sizeOfBoard * sizeOfBoard && squares[j] === player) {
      count++;
      line.push(j);
      if (
        calculateRow(j + sizeOfBoard - 1, sizeOfBoard) -
          calculateRow(j, sizeOfBoard) ===
        1
      ) {
        j += sizeOfBoard - 1;
      } else {
        j = sizeOfBoard * sizeOfBoard + 1;
      }
    } else {
      j = sizeOfBoard * sizeOfBoard + 1;
    }

    if (count >= 5) {
      line.push(idxMoveSquare);
      line.sort();
      return {
        winner: player,
        winningLine: line,
      };
    }
  }
  return {
    winner: null,
    winningLine: null,
  };
}

export { calculateCol, calculateRow, calculateWinner };

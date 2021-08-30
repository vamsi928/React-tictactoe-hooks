import React, { useState } from "react";
import { calculateWinner } from "../helpers";
import { Board } from "./Board";

const styles = {
  width: "200px",
  margin: "20px auto",
};

export const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setstepNumber] = useState(0);
  const [xIsNext, setxIsNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);

  const handleClick = (i) => {
    const timeInHistory = history.slice(0, stepNumber + 1); //creating a new array until the current point
    const current = timeInHistory[stepNumber];
    const squares = [...current];
    if (winner || squares[i] !== null) return; //if we have a winner or user clicks on the already selected box

    squares[i] = xIsNext ? "X" : "O";
    console.log(timeInHistory);
    setHistory([...timeInHistory, squares]);
    setxIsNext(!xIsNext);
    setstepNumber((prev) => ++prev);
  };

  const jumpTo = (step) => {
    setstepNumber(step);
    setxIsNext(step % 2 === 0);
  };

  const renderMoves = () => {
    const movesResult = history.map((_step, move) => {
      const destination = move ? `Go to move # ${move}` : "Go to Start";

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

    return movesResult;
  };

  return (
    <>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div style={styles}>
        {winner ? `Winner:  ${winner}` : `Next Player: ${xIsNext ? "X" : "O"}`}
        {renderMoves()}
      </div>
    </>
  );
};

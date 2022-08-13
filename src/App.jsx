import React, { useState } from "react";
import Board from "./components/Board";
import { calculateWinner } from "./helpers";
import "./styles/root.scss";

const App = () => {
  const [history, sethistory] = useState([
    { board: Array(9).fill(null), isXNext: true },
  ]);

  const [currentMove, setcurrentMove] = useState(0);
  const current = history[currentMove];
  const winner = calculateWinner(current.board);

  const message = winner
    ? `Winner is ${winner}`
    : `Next player is ${current.isXNext ? "X" : "O"}`;

  const handleSquareClick = (position) => {
    if (current.board[position] || winner) {
      return;
    }
    sethistory((prev) => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? "X" : "O";
        }
        return square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setcurrentMove((prev) => prev + 1);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <h3>{message}</h3>
      <Board board={current.board} handleSquareClick={handleSquareClick} />
    </div>
  );
};

export default App;

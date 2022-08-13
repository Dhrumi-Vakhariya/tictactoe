import React, { useState } from "react";
import Board from "./components/Board";
import History from "./components/History";
import StatusMessage from "./components/StatusMessage";
import { calculateWinner } from "./helpers";
import "./styles/root.scss";

const App = () => {
  const newGame = [{ board: Array(9).fill(null), isXNext: true }];
  const [history, sethistory] = useState(newGame);
  const [currentMove, setcurrentMove] = useState(0);
  const current = history[currentMove];
  const { winner, winningSquares } = calculateWinner(current.board);

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

  const moveTo = (move) => {
    setcurrentMove(move);
  };

  const startNewGame = () => {
    sethistory(newGame);
    setcurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        Tic <span className="text-orange">Tac</span> Toe
      </h1>
      <StatusMessage winner={winner} current={current} />
      <Board
        board={current.board}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={startNewGame}
        className={`btn-reset ${winner ? "active" : ""}`}
      >
        Start New Game
      </button>
      <h2 style={{ fontWeight: "normal" }}>Current game history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls"></div>
    </div>
  );
};

export default App;

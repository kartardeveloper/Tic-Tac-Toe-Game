import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let activePlayer = "X";

const players = {
  X: "Player 1",
  O: "player 2",
};

const getPlayersInfo = (symbol, playerName) => {
  players[symbol] = playerName;
};

const checkPlayerTurn = (turn) => {
  if (turn.length > 0 && turn[0].player === "X") {
    activePlayer = "O";
  } else {
    activePlayer = "X";
  }
};

let winner = {
  isWinner: false,
  winnerPlayer: "X",
};

const checkWinner = (gameBoard) => {
  WINNING_COMBINATIONS.forEach((winningCombination) => {
    const firstBoxSymbol =
      gameBoard[winningCombination[0].row][winningCombination[0].column];
    const secondBoxSymbol =
      gameBoard[winningCombination[1].row][winningCombination[1].column];
    const thirdBoxSymbol =
      gameBoard[winningCombination[2].row][winningCombination[2].column];

    if (
      firstBoxSymbol !== null &&
      firstBoxSymbol === secondBoxSymbol &&
      secondBoxSymbol === thirdBoxSymbol
    ) {
      winner.isWinner = true;
      winner.winnerPlayer = players[firstBoxSymbol];
    }
  });
};

let isDraw = false;

function App() {
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];
  const [gameTurns, setGameTurns] = useState([]);

  checkPlayerTurn(gameTurns);

  const boxClickHandler = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurns) => {
      checkPlayerTurn(prevGameTurns);

      const updatedGameTurns = [
        {
          square: { row: rowIndex, column: colIndex },
          player: activePlayer,
        },
        ...prevGameTurns,
      ];

      return updatedGameTurns;
    });
  };

  gameTurns.forEach((turn) => {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player;
    checkWinner(gameBoard);
  });

  const rematchButtonHandler = () => {
    gameBoard = initialGameBoard;
    winner.isWinner = false;
    isDraw = false;
    setGameTurns([]);
  };

  if (gameTurns.length === 9) {
    isDraw = true;
    winner.isWinner = false;
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActive={activePlayer === "X" && true}
            getPlayersInfo={getPlayersInfo}
          />
          <Player
            name="Player 2"
            symbol="O"
            isActive={activePlayer === "O" && true}
            getPlayersInfo={getPlayersInfo}
          />
        </ol>
        <GameBoard board={gameBoard} boxClickHandler={boxClickHandler} />
        {(winner.isWinner || isDraw) && (
          <GameOver
            winner={winner}
            isDraw={isDraw}
            rematchButtonHandler={rematchButtonHandler}
          />
        )}
      </div>
      <Log turns={gameTurns} players={players} />
    </main>
  );
}

export default App;

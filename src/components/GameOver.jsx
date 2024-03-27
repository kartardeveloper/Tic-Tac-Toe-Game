function GameOver({ winner, isDraw, rematchButtonHandler }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner.isWinner && <p>{winner.winnerPlayer} Won!</p>}
      {isDraw && <p>It's a draw!</p>}
      <p>
        <button onClick={rematchButtonHandler}>Rematch!</button>
      </p>
    </div>
  );
}

export default GameOver;

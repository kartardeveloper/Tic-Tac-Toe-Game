function Log({ turns, players }) {
  return (
    <ol id="log">
      {turns.map((turn) => {
        return (
          <li key={`${turn.square.row}${turn.square.column}`}>
            <span>
              {players[turn.player]}({turn.player})
            </span>{" "}
            selected {turn.square.row}, {turn.square.column}
          </li>
        );
      })}
    </ol>
  );
}

export default Log;

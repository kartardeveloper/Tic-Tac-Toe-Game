import { useRef } from "react";
import { useState } from "react";

function Player({ name, symbol, isActive, getPlayersInfo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  const inputRef = useRef();

  const handleEditClick = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    if (isEditing) {
      if (inputRef.current.value !== "") {
        setPlayerName(inputRef.current.value);
        getPlayersInfo(symbol, inputRef.current.value);
      }
    }
  };

  let playerNameHTML = <span className="player-name">{playerName}</span>;
  let editButtonText = "Edit";

  if (isEditing) {
    playerNameHTML = (
      <input type="text" required defaultValue={playerName} ref={inputRef} />
    );
    editButtonText = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameHTML}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleEditClick}>{editButtonText}</button>
      </span>
    </li>
  );
}

export default Player;

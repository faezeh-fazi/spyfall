import React, { useState } from "react";
import "../style/vote.css";
import Timer from "./Timer";

const Vote = () => {
  const [players, setPlayers] = useState([
    {
      name: "Fazi",
      id: 1,
      vote: 0,
    },
    {
      name: "Mr Amro",
      id: 2,
      vote: 0,
    },
    {
      name: "Ghazal",
      id: 3,
      vote: 0,
    },
    {
      name: "Hyeledi",
      id: 4,
      vote: 0,
    },
  ]);

  function handleVote() {
    players.map((player) => {
      player.vote = player.vote++;
    });
  }

  console.log(players)
  return (
    <>
      <div className="full-screen bg-home">
        <div className="vote-section">
          <h5>Who is the spy</h5>
          {players.map((player) => (
            <button
              className="vote-btn"
              type="button"
              value={player.id}
              onClick={handleVote}
            >
              {player.name}
            </button>
          ))}
          <div className="timer-section">
            <Timer InitialCount={30} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Vote;

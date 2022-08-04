import React from "react";
import Timer from "./Timer";

const GameRoom = () => {
  return (
    <>
      <div className="full-screen bg-home">
        <div className="timer-section">
          <Timer prop="Started" />
        </div>
        <div className="vote-btn">
          <button
            className="vip-start-btn"
            // onClick={navigateToGame}
            type="button"
          >
            start the game
          </button>
        </div>
      </div>
    </>
  );
};

export default GameRoom;

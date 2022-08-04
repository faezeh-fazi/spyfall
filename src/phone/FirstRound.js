import React, { useState } from "react";
import "../style/rounds.css";
import { useNavigate } from "react-router-dom";
import bank from "../assets/bank.jpg";

const FirstRound = () => {
  const navigate = useNavigate();
  const [flip, setFlip] = useState(false);
  const [isSpy, setIsSpy] = useState(false);
  const [isVip, setIsVip] = useState(true);

  const handleFlip = () => {
    setFlip(!flip);
  };

  const navigateToGame = () => {
    navigate("/game");
  };
  return (
    <>
      <div className="full-screen bg-home">
        <div className="scene scene--card">
          <div
            className={flip ? "card is-flipped" : "card"}
            onClick={handleFlip}
          >
            <div className="card_face card_face--front">
              Tap to see the location
            </div>

            <div className="card_face card_face--back">
              {isSpy ? <h7>You are the Spy</h7> : <h6> Bank</h6>}
              {/* <img src={bank} alt="bank"  style={{width: "100%"}}/> */}
            </div>
          </div>
        </div>
        <div className="start-game">
          {isVip ? (
            <button
              className="vip-start-btn"
              onClick={navigateToGame}
              type="button"
            >
              start the game
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FirstRound;

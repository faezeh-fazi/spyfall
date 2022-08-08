import React, { useState } from "react";
import "../style/rounds.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoomReq from "../context/RoomReq";

const FirstRound = () => {
  const navigate = useNavigate();
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [flip, setFlip] = useState(false);
  const [isSpy, setIsSpy] = useState(false);
  const [isVip, setIsVip] = useState(true);

  const handleFlip = () => {
    setFlip(!flip);
  };


  
  const onSubmit = () => {
    axios.post(`${baseUrl}/room/location/confirm`, {}, { headers }).then((response) => {
      if (response.status == 200) {
        console.log(response.data)
          navigate("/game");
      }
    });
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
              onClick={onSubmit}
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

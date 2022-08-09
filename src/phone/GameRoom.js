import React, {useState} from "react";
import Timer from "./Timer";
import "../style/timer.css";
import { useNavigate } from "react-router-dom";
import RoomReq from "../context/RoomReq";
import axios from "axios";

const GameRoom = () => {
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [isSpy, setIsSpy] = useState(false);

  const navigateToVoteRoom = () => {
    axios.post(`${baseUrl}/room/vote/request`, {}, { headers }).then((response) => {
      if (response.status == 200) {
        console.log(response.data)
          navigate("/vote");
      }
    })
  };

  const navigateToGuessRoom = () => {
    navigate("/spy-guess");
  };
  return (
    <>
      <div className="full-screen bg-home">

        <div className="timer-container">
        <div className="timer-section">
          <Timer InitialCount={260} />
        </div>
        <div className="vote-btn">
          {isSpy ? (
            <button
              className="vip-start-btn"
               onClick={navigateToGuessRoom}
              type="button"
            >
             I know the place
            </button>
          ) : (
            <button
              className="vip-start-btn"
               onClick={navigateToVoteRoom}
              type="button"
            >
              Vote for spy
            </button>
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default GameRoom;

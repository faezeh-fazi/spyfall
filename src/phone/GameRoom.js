import React, {useState, useEffect} from "react";
import Timer from "./Timer";
import "../style/timer.css";
import { useLocation, useNavigate } from "react-router-dom";
import RoomReq from "../context/RoomReq";
import axios from "axios";
import jwt_decode from "jwt-decode";

const GameRoom = () => {
  const loc = useLocation();
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [isSpy, setIsSpy] = useState(false);
  const [room, setRoom] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));
  const decodedToken = jwt_decode(token);
  console.log(decodedToken)

  useEffect(() => {
    getRoom();
  }, []);

 
  async function getRoom() {
    try {
      const response = await axios.get(`${baseUrl}/room/data`, { headers });
      setRoom(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const navigateToVoteRoom = () => {
    axios.post(`${baseUrl}/room/vote/request`, {}, { headers }).then((response) => {
      if (response.status == 200) {
          navigate("/vote", {state: loc.state});
      }
    })
  };
console.log(loc)
  const navigateToGuessRoom = () => {
    axios.post(`${baseUrl}/room/vote/request`, {}, { headers }).then((response) => {
      if (response.status == 200) {
        navigate("/spy-guess", {state: loc.state});
      }
    })
  };
  return (
    <>
      <div className="full-screen bg-home">

        <div className="timer-container">
        <div className="timer-section">
          <Timer InitialCount={260} />
        </div>
        <div className="vote-btn">
          {loc.state.location === "Spy" ? (
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

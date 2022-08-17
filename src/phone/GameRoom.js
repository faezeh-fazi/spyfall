import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import "../style/timer.css";
import { useLocation, useNavigate } from "react-router-dom";
import RoomReq from "../context/RoomReq";
import axios from "axios";
import jwt_decode from "jwt-decode";
import useSignalR from "../requests/SignalR";
import Vote from "./Vote";

const GameRoom = () => {
  const loc = useLocation();
  const { connection } = useSignalR();
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [voteData, setVoteData] = useState({});
  const [room, setRoom] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));
  const decodedToken = jwt_decode(token);

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
    axios
      .post(`${baseUrl}/room/vote/request`, {}, { headers })
      .then((response) => {
        if (response.status == 200) {
          navigate("/vote", { state: loc.state });
        }
      });
  };
  const navigateToGuessRoom = () => {
    axios
      .post(`${baseUrl}/room/vote/request`, {}, { headers })
      .then((response) => {
        if (response.status == 200) {
          navigate("/spy-guess", { state: loc.state });
        }
      });
  };

  useEffect(() => {
    if (Object.keys(voteData).length > 0 && voteData.payload === "VoteStart") {
      navigate("/vote", { state: loc.state });
    }
    if (
      Object.keys(voteData).length > 0 &&
      voteData.payload === "SpyGuessStart"
    ) {
      if (voteData.data.spysIds.some((x) => x === decodedToken.playerId)) {
        navigate("/spy-guess", { state: loc.state });
      } else {
        navigate("/waitforspy", { state: loc.state });
      }
    }

    if (
      Object.keys(voteData).length > 0 &&
      voteData.payload === "GameFinished"
    ) {
      if (voteData.data.spysWon === true) {
        navigate("/spyWin", { state: loc.state });
      } else {
        navigate("/spyLose", { state: loc.state });
      }
    }
  }, [voteData]);


  useEffect(() => {
    (async () => {
      try {
        if (connection && room?.code) {
          connection.start().then(() => {
            connection.on("GameNotifications", (message) => {

              setVoteData(message);
            });
            connection.invoke("AssignToGroup", room.code).then((resp) => {
              console.log(resp);
            });
          });
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [connection, room]);


  return (
    <>
      {room && room.settings && (
        <div className="full-screen bg-home">
          <div className="timer-container">
            <div className="timer-section">
                <Timer InitialCount={room.settings.roundSeconds} />
            </div>
            <div className="vote-btn">
              {loc.state.location === "Spy" ? (
                <button
                  className="vip-start-btn"
                  onClick={navigateToGuessRoom}
                  type="button"
                >
                  Vote Room
                </button>
              ) : (
                <button
                  className="vip-start-btn"
                  onClick={navigateToVoteRoom}
                  type="button"
                >
                  Vote Room
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameRoom;

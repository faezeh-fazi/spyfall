import React, { useState, useEffect } from "react";
import "../style/rounds.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import RoomReq from "../context/RoomReq";
import useSignalR from "../requests/SignalR";
import jwt_decode from "jwt-decode";

const FirstRound = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [flip, setFlip] = useState(false);
  const [room, setRoom] = useState({});
  const [startData, setStartData] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));
  const decodedToken = jwt_decode(token);
  const { connection } = useSignalR();

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
  const confirmLoc = () => {
    axios
      .post(`${baseUrl}/room/location/confirm`, {}, { headers })
      .then((response) => {
        if (response.status == 200) {
          // navigate("/game", {state: loc.state});
        }
      });
  };

  const startGame = () => {
    axios
      .post(`${baseUrl}/room/location/confirm`, {}, { headers })
      .then((response) => {
        if (response.status == 200) {
        }
      });
  };

  useEffect(() => {
    if (Object.keys(startData).length > 0) {
      navigate("/game", { state: loc.state });
    }
  }, [startData]);

  useEffect(() => {
    (async () => {
      try {
        if (connection && room?.code) {
          connection.start().then(() => {
            connection.on("PlayerUpdate", (message) => {
              console.log(message);
              //  setStartData(message.payload);
            });

            connection.on("GameNotifications", (message) => {
              console.log(message);
              setStartData(message);

              // setStartData(message.data);
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

  const handleFlip = () => {
    setFlip(!flip);
  };

  return (
    <>
      {room && room.players && (
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
                <h6> {loc.state.location}</h6>
                {/* <img src={bank} alt="bank"  style={{width: "100%"}}/> */}
              </div>
            </div>
          </div>
          <div className="start-game">
            {decodedToken.isVIP == "True" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* <button
            className="vip-start-btn"
            onClick={confirmLoc}
            type="button"
          >
            Confirm 
          </button> */}
                <button
                  className="vip-start-btn"
                  onClick={startGame}
                  type="button"
                >
                  start the game
                </button>
              </div>
            ) : (
              <button
                className="vip-start-btn"
                onClick={confirmLoc}
                type="button"
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FirstRound;

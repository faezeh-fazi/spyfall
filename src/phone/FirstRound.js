import React, { useState, useEffect } from "react";
import "../style/rounds.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import RoomReq from "../context/RoomReq";
import useSignalR from "../requests/SignalR";
import jwt_decode from "jwt-decode";

const FirstRound = () => {
  const {state} = useLocation()
  const navigate = useNavigate();
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [flip, setFlip] = useState(false);
  const [room, setRoom] = useState({});

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

  console.log(state)
  useEffect(() => {
    (async () => {
      try {
        if (connection && room?.code) {
          connection.start().then(() => {

            connection.on("GameNotifications", (message) => {
              console.log(message)
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

  let players =room.players;



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
    {room && room.players &&
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
                <h6> {room.gameLocation}</h6>
              {/* <img src={bank} alt="bank"  style={{width: "100%"}}/> */}
            </div>
          </div>
        </div>
        <div className="start-game">
          {decodedToken.isVIP ? (
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
}
    </>
  );
};

export default FirstRound;

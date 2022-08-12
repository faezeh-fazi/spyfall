import GameTimer from "./GameTimer";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoomReq from "../context/RoomReq";
import axios from "axios";
import jwt_decode from "jwt-decode";
import useSignalR from "../requests/SignalR";

const GameRound = () => {
  const {connection} = useSignalR()
  const loc = useLocation();
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [room, setRoom] = useState({});
  const [roomData, setRoomData] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getRoom();
  }, []);

  async function getRoom() {
    try {
      const response = await axios.get(`${baseUrl}/room/data`, { headers });
      setRoom(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (Object.keys(roomData).length > 0) {
      navigate("/showSpy", {state: roomData})
    }
  }, [roomData]);


  useEffect(() => {
    (async () => {
      try {
        if (connection && room?.code) {
          connection.start().then(() => {
            connection.on("GameNotifications", (message) => {
              console.log(message)
             setRoomData(message)
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
              <GameTimer InitialCount={room.settings.roundSeconds} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameRound;

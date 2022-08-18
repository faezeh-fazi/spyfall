import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoomReq from "../context/RoomReq";
import axios from "axios";
import jwt_decode from "jwt-decode";
import useSignalR from "../requests/SignalR";

const ShowSpy = () => {
  const { connection } = useSignalR();
  const loc = useLocation();
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [room, setRoom] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));
  const spyIds = loc.state.data.spysIds;
  useEffect(() => {
    getRoom();
  }, []);

  async function getRoom() {
    try {
      const response = await axios.get(`${baseUrl}/room/data`, { headers });
      setRoom(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    (async () => {
      try {
        if (connection && room?.code) {
          connection.start().then(() => {
            connection.on("GameNotifications", (message) => {
              if(message.payload === "GameFinished") {
                navigate("/result" , {state: message})
              }

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

  return (
    <>
      {room && room.players && (
        <div className="full-screen bg-home">
          {spyIds.length > 1 ? (
              <div className="xbox">Spys are</div>
            ) : (
              <div className="xbox">Spy is</div>
            )}
          <div className="showSpy">        
            <div className="spy-img">
            {room.players.map((player) =>
              player.isSpy ? (
                <div className="members" key={player.playerId}>
                  <img
                    src={`https://localhost:7154/avatars/${player.playerPicture}.png`}
                    alt="avatar"
                  />
                  <h3>{player.playerId}</h3>
                </div>
              ) : null
            )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowSpy;

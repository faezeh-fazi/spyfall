import React, { useState, useEffect, useRef } from "react";
import "../style/rounds.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import RoomReq from "../context/RoomReq";
import jwt_decode from "jwt-decode";
import useSignalR from "../requests/SignalR";

const CharacterList = () => {
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [room, setRoom] = useState({});
  const [location, setLocation] = useState({});
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
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
  const players = room.players;
  const token = JSON.parse(localStorage.getItem("token"));
  const decodedToken = jwt_decode(token);
  if (token === null) {
    navigate("/");
  }

  const onSubmit = () => {
    axios.post(`${baseUrl}/room/start`, {}, { headers }).then((response) => {
      if (response.status == 200) {
      }
    });
  };

  const onSelectPhoto = (photo) => {
    axios
      .post(`${baseUrl}/room/photo/${photo}`, {}, { headers })
      .then((response) => {
        if (response.status == 200 && response.data == true) {
        }
      });
  };

  useEffect(() => {
    if (Object.keys(location).length > 0) {
      navigate("/startpage", { state: location });
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      try {
        if (connection && room?.code) {
          connection.start().then(() => {
            connection.on("GameNotifications", (message) => {
              console.log(message);
              setLocation(message.data);
            });
            connection.on("PlayerUpdate", (message) => {
              console.log(message);
              //setVoteData(message);
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
      {room && players && decodedToken && (
        <div className="full-screen bg-home">
          <div className="avatar-container">
            <h5>Select Your Character</h5>
            <div className="avatar-images">
              {room.avatars.map((avatar) => (
                <img
                  src={`https://localhost:7154/avatars/${avatar}.png`}
                  alt="avatar"
                  value={avatar}
                  key={avatar}
                  onClick={() => onSelectPhoto(avatar)}
                />
              ))}
            
            </div>
            {decodedToken.isVIP === "True" ? (
              <button
                className="vip-start-btn"
                onClick={() => onSubmit()}
                type="button"
              >
                everyone is in
              </button>
            ) : (
              <>
                <h6>Wait for other players</h6>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterList;

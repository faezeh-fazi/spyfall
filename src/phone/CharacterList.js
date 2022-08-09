import React, { useState, useEffect, useRef } from "react";
import "../style/rounds.css";
import axios from "axios";
import character1 from "../assets/avatars/c1.png";
import character2 from "../assets/avatars/c2.png";
import character3 from "../assets/avatars/c3.png";
import character4 from "../assets/avatars/c4.png";
import character5 from "../assets/avatars/c5.png";
import character6 from "../assets/avatars/c6.png";
import character7 from "../assets/avatars/c7.png";
import character8 from "../assets/avatars/c8.png";
import character9 from "../assets/avatars/c9.png";
import character10 from "../assets/avatars/c10.png";
import character11 from "../assets/avatars/c11.png";
import character12 from "../assets/avatars/c12.png";
import { useNavigate } from "react-router-dom";
import RoomReq from "../context/RoomReq";
import jwt_decode from "jwt-decode";
import useSignalR from "../requests/SignalR";

const CharacterList = () => {
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [room, setRoom] = useState({});
  const [location, setLocation] = useState({})
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
        setTimeout(() => {
          navigate("/startpage", {state: location});
        }, 3000);
      }
    });
  };

  
  useEffect(() => {
    (async () => {
      try {
        if (connection && room?.code) {
          connection.start().then(() => {

            connection.on("GameNotifications", (message) => {
              setLocation(message.data)
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
    
      {room && players && decodedToken &&(
        <div className="full-screen bg-home">
          <div className="avatar-container">
            <h5>Select Your Character</h5>
            <div className="avatar-images">
              <img src={character1} alt="avatar" />
              <img src={character2} alt="avatar" />
              <img src={character3} alt="avatar" />
              <img src={character4} alt="avatar" />
              <img src={character5} alt="avatar" />
              <img src={character6} alt="avatar" />
              <img src={character7} alt="avatar" />
              <img src={character8} alt="avatar" />
              <img src={character9} alt="avatar" />
              <img src={character10} alt="avatar" />
              <img src={character11} alt="avatar" />
              <img src={character12} alt="avatar" />
            </div>
            {decodedToken.isVIP === "True"? (
              <button
                className="vip-start-btn"
                onClick={onSubmit}
                type="button"
              >
                everyone is in
              </button>
            ) : (
              <>
                <h6 >Wait for other players</h6>
              </>
                
              
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterList;

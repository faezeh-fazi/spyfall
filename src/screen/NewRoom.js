import React, { useState, useRef, useEffect } from "react";
import "../style/room.css";
import character1 from "../assets/avatars/c1.png";
import character2 from "../assets/avatars/c2.png";
import character3 from "../assets/avatars/c3.png";
import character4 from "../assets/avatars/c4.png";
import RoomReq from "../context/RoomReq";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSignalR from "../requests/SignalR";

const NewRoom = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { headers } = RoomReq();
  const [room, setRoom] = useState({ players: [] });
  const latestPlayers = useRef(null);
  latestPlayers.current = room.players;
  const token = JSON.parse(localStorage.getItem("token"));
  const { connection } = useSignalR();
  if (!token) {
    navigate("/");
  }

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

   const signalrConnection = async () => {
    try {
      if (connection && room?.code) {
        connection.start().then(() => {
          connection.on("PlayerUpdate", (player) => {
            setRoom((prevState) => {
              return {
                ...prevState,
                players: [...prevState.players, player],
              };
            });
          });

          connection.invoke("AssignToGroup", room.code).then((resp) => {
            console.log(resp);
          });
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    signalrConnection()
  }, [connection, room]);

  return (
    <>
      <div className="full-screen bg-home">
        <div className="room-code">
          <h3>Room code</h3>
          <h2>{room.code}</h2>
        </div>

        <section className="avatars">
          {room.players.map((player) => (
            <div className="memebers" key={player.playerId}>
              <img src={character1} alt="avatar" />
              <h3>{player.playerId}</h3>
            </div>
          ))}
          {/* <div className="memebers">
            <img src={character2} alt="avatar" />
            <h3>hamid</h3>
          </div>
          <div className="memebers">
            <img src={character3} alt="avatar" />
            <h3>ahmad</h3>
          </div>
          <div className="memebers">
            <img src={character4} alt="avatar" />
            <h3>amir</h3>
          </div> */}
        </section>
      </div>
    </>
  );
};

export default NewRoom;

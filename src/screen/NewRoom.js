import React, { useState, useRef, useEffect } from "react";
import "../style/room.css";
import character1 from "../assets/avatars/c1.png";
import character2 from "../assets/avatars/c2.png";
import character3 from "../assets/avatars/c3.png";
import character4 from "../assets/avatars/c4.png";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import RoomReq from "../context/RoomReq";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const { headers } = RoomReq();
  const [connection, setConnection] = useState(null);
  const [room, setRoom] = useState({ players: [] });
  const latestPlayers = useRef(null);
  latestPlayers.current = room.players;

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

  const token = JSON.parse(localStorage.getItem("token"));
  if (token === null) {
    navigate("/");
  }

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${baseUrl}/roomsHub`, {
        accessTokenFactory: () => token,
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);
  useEffect(() => {
    if (connection) {
      connection.on("PlayerUpdate", (message) => {
        const updatedPlayers = [...room.players];
        updatedPlayers.push(message);
        debugger
        setRoom((prevState) => {
          return { ...prevState, players: updatedPlayers };
        });
      });

      connection
        .start()
        .then(() => {
          console.log("Connected!");
          
          connection.invoke('AssignToGroup', room.code);
        
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

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
              <h3>{player.playerName}</h3>
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

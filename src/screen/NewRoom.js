import React, { useState, useRef, useEffect } from "react";
import "../style/room.css";
import character1 from "../assets/avatars/c1.png";
import character2 from "../assets/avatars/c2.png";
import character3 from "../assets/avatars/c3.png";
import character4 from "../assets/avatars/c4.png";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import RoomReq from "../context/RoomReq";
import Intro from "./Intro";
import axios from "axios"


const NewRoom = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const {headers} = RoomReq();

  const [connection, setConnection] = useState(null);
  const [players, setPlayers] = useState([]);
  const [room, setRoom] = useState({});
  // const latestPlayers = useRef(null);
  // latestPlayers.current = players;

  useEffect(() => {
    getRoom();
  }, []);
  
  async function getRoom() {
    try {
      const response = await axios.get(
        `${baseUrl}/room/data`,
        { headers }
        );

        setRoom(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    console.log(room.players)

    
  //   const token = JSON.parse(localStorage.getItem("token"));
  // useEffect(() => {
  //   const newConnection = new HubConnectionBuilder()
  //     .withUrl(`${baseUrl}/roomsHub`, {
  //       accessTokenFactory: () => token,
  //       skipNegotiation: true,
  //       transport: HttpTransportType.WebSockets,
  //     })
  //     .withAutomaticReconnect()
  //     .build();

  //   setConnection(newConnection);
  // }, []);
  // useEffect(() => {
  //   if (connection) {
  //     connection
  //       .start()
  //       .then((result) => {
  //         console.log("Connected!");

  //         connection.on("PlayerUpdate", (message) => {
  //           const updatedPlayers = [...latestPlayers.current];
  //           updatedPlayers.push(message);

  //           setPlayers(updatedPlayers);
  //         });
  //       })
  //       .catch((e) => console.log("Connection failed: ", e));
  //   }
  // }, [connection]);


  return (
    <>
      <div className="full-screen bg-home">
        <div className="room-code">
          <h3>Room code</h3>
          <h2>{room.code}</h2>
        </div>

        <section className="avatars">
          {room.players.map(player =>
          <div className="memebers">
            <img src={character1} alt="avatar" />
            <h3>{player.playerName}</h3>
          </div>
          )}
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

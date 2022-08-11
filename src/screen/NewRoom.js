import React, { useState, useRef, useEffect } from "react";
import "../style/room.css";
import character1 from "../assets/avatars/c1.png";
import character2 from "../assets/avatars/c2.png";
import character3 from "../assets/avatars/c3.png";
import character4 from "../assets/avatars/c4.png";
import RoomReq from "../context/RoomReq";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useSignalR from "../requests/SignalR";

const NewRoom = () => {
  const loc = useLocation();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { headers } = RoomReq();
  const [room, setRoom] = useState({ players: [] });
  const [roomData, setRoomData] = useState({});
  const [photo, setPhoto] = useState("");
  const latestPlayers = useRef(null);
  latestPlayers.current = room.players;
  const token = JSON.parse(localStorage.getItem("token"));
  const { connection } = useSignalR();
  if (!token) {
    navigate("/");
  }

  const signalrConnection = async () => {
    try {
      if (connection && loc.state.room?.code) {
        connection.start().then(() => {
          connection.on("PlayerUpdate", (player) => {
            if(player.payload === "NewJoin")
            {
                    console.log(room.players);
                    // setRoom((prevState) => {
                    //   return {
                    //     ...prevState,
                    //     players: [...prevState.players, player],
                    //   };
                    // });
            }
            if(player.payload === "PhotoUpdate")
            {
              console.log(player);

              setRoom((prevState) => {
                if(!prevState.players.some(x=> x.playerId == player.data.player.playerId)){
                  return {
                    players: [...prevState.players, player.data.player],
                  };
                }else{
                  let oldPlayers = prevState.players.filter(x=>x.playerId != player.data.player.playerId)
                  return {
                    players: [...oldPlayers, player.data.player],
                  };
                }
              });
              console.log(room.players);
              setPhoto(player.data.player.playerPicture);

              // setRoom((prevState) => {
              //   return {
              //     ...prevState,
              //     players: [...prevState.players, player],
              //   };
              // });
            }
     
          });
          connection.on("RoomData", (data) => {
            setRoomData(data);
          });
          connection.on("GameNotifications", (data) => {
            console.log(data)
            setRoomData(data);
          });
          connection
            .invoke("AssignToGroup", loc.state.room.code)
            .then((resp) => {
              console.log(resp);
            });
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(room)
  useEffect(() => {
    signalrConnection();
  }, [connection, room]);

  return (
    <>
      <div className="full-screen bg-home">
        <div className="room-code">
          <h3>Room code</h3>
          <h2>{loc.state.room.code}</h2>
        </div>

        <section className="avatars">
          {room.players.map((player) => (
            <div className="memebers" key={player.playerId}>
              <img
                src={`https://localhost:7154/avatars/${player.playerPicture}.png`}
                alt="avatar"
              />
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

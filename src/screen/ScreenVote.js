import GameTimer from "./GameTimer";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoomReq from "../context/RoomReq";
import axios from "axios";
import jwt_decode from "jwt-decode";
import useSignalR from "../requests/SignalR";

const ScreenVote = () => {
  const { connection } = useSignalR();
  const loc = useLocation();
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [room, setRoom] = useState({});
  const [votes, setVotes] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));

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

  const playersVotes = [];
  useEffect(() => {
    if (Object.keys(votes).length > 0) {
      if(votes.payload === "PlayerVote"){
        debugger
        playersVotes.push(votes.data.playersVotes.map(pv => pv.playerVote))

      }

    }
    else{
      console.log("k")
    }
  }, [votes]);

  console.log(playersVotes)


  useEffect(() => {
    (async () => {
      try {
        if (connection && room?.code) {
          connection.start().then(() => {
            connection.on("GameNotifications", (message) => {
              console.log(message)
              setVotes(message)
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
      {room && room.players && votes && votes.data &&votes.data.playerVote && votes.data.playerVote.playerVote && (
        <div className="full-screen bg-home">
          <section className="avatars">
            {room.players.map((player) => (
              <div className="memebers" key={player.playerId}>
                <img
                  src={`https://localhost:7154/avatars/${player.playerPicture}.png`}
                  alt="avatar"
                />
                <h3>{player.playerId}</h3>
                <h3>2</h3>
              </div>
            ))}
          </section>
        </div>
      )}
    </>
  );
};

export default ScreenVote;

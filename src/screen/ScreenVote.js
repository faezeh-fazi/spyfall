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
  const [playersVotes, setPlayersVotes] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

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

  // room.players?.map(x=> {
  //   setPlayersVotes(prev =>[...prev, {playerName: x.playerId}] )
  // })
  console.log(room);
  useEffect(() => {
    if (Object.keys(votes).length > 0) {
      let vote = 0;

      if (votes.payload === "PlayerVote") {
        room.players?.forEach(function (item) {
          if (item.playerName === votes.data.playerVote.playerVote) {
            if (
              playersVotes.some(
                (p) => p.playerName === votes.data.playerVote.playerVote
              )
            ) {
              const newstate = playersVotes.map((obj) => {
                if (obj.playerName === votes.data.playerVote.playerVote) {
                  return { ...obj, vote: obj.vote++ };
                }
              });
            } else {
              setPlayersVotes((prev) => [
                ...prev,
                { playerName: item.playerName, vote: vote + 1 },
              ]);
            }
          }
        });
      }
    }
  }, [votes]);
  console.log(playersVotes);

  useEffect(() => {
    (async () => {
      try {
        if (connection && room?.code) {
          connection.start().then(() => {
            connection.on("GameNotifications", (message) => {
              setVotes(message);
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
          <section className="avatars">
            {room.players.map((player) => (
              <div className="memebers" key={player.playerId}>
                <img
                  src={`https://localhost:7154/avatars/${player.playerPicture}.png`}
                  alt="avatar"
                />
                <h3>{player.playerId}</h3>
                {playersVotes.map((p) =>
                  p.playerName === player.playerName ? (
                    <h3 key={p.playerName}>{p.vote}</h3>
                  ) : (
                    ""
                  )
                )}
              </div>
            ))}
          </section>
        </div>
      )}
    </>
  );
};

export default ScreenVote;

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

  useEffect(() => {
    console.log(votes);
    if (Object.keys(votes).length > 0) {
      if (votes.payload === "GameFinished") {
        navigate("/result", { state: votes });
      }
      if (votes.payload === "PlayersRightGuess") {
        navigate("/showSpy", { state: votes });
      }
      let initailV = [];
      if (room.players.length !== playersVotes.length) {
        let vote = 0;
        room.players?.forEach(function (item) {
          initailV.push({
            playerName: item.playerName,
            vote: vote,
          });
        });
      }

      if (votes.payload === "PlayerVote") {
        if (playersVotes.length > 0) {
          initailV = playersVotes;
        }
        if (
          initailV.some(
            (p) => p.playerName === votes.data.playerVote.playerVote
          )
        ) {
          console.log(initailV);
          initailV = initailV.map((obj) => {
            if (obj.playerName === votes.data.playerVote.playerVote) {
              obj.vote = obj.vote + 1;
            }
            return obj;
          });
        }
      }
      setPlayersVotes((prev) => {
        const pr = initailV.length > 0 ? initailV : prev;
        return pr;
      });
    }
  }, [votes]);

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

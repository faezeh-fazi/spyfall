import React, { useState, useEffect } from "react";
import "../style/vote.css";
import Timer from "./Timer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoomReq from "../context/RoomReq";
import jwt_decode from "jwt-decode";
import useSignalR from "../requests/SignalR";

const Vote = () => {
  const { connection } = useSignalR();
  const navigate = useNavigate();
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [room, setRoom] = useState([]);
  const [votes, setVotes] = useState({});
  const [playersVotes, setPlayersVotes] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const decodedToken = jwt_decode(token);
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

  const onSubmit = (playerId) => {
    axios
      .post(`${baseUrl}/room/vote/${playerId}`, {}, { headers })
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          // navigate("/vote");
        }
      });
  };
  useEffect(() => {
    if (Object.keys(votes).length > 0) {
      if (votes.payload === "GameFinished") {
        if (votes.data.spysWon) {
          navigate("/spyWin", { state: votes });
        } else {
          navigate("/spyLose", { state: votes });
        }
      }
      if (votes.payload === "PlayersRightGuess") {
        if (votes.data.spysIds.some((id) => id === decodedToken.playerId))
        {
          navigate("/spy-guess", { state: votes.data });


        }else {

          navigate("/waitforspy", { state: votes });

        }
      }
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

  const players = room.players?.filter(
    (p) => p.playerId !== decodedToken.playerId
  );
  return (
    <>
      {players && (
        <div className="full-screen bg-home">
          <div className="timer-section">
            <Timer InitialCount={40} />
          </div>
          <div className="vote-section">
            <h5>Who is the spy</h5>
            {players.map((player) =>
              player === decodedToken.playerId ? null : (
                <button
                  key={player.playerId}
                  className="vote-btn"
                  type="button"
                  value={player.playerId}
                  onClick={(e) => onSubmit(e.target.value)}
                >
                  {player.playerName}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </>
    
  );
};

export default Vote;

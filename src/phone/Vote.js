import React, { useState , useEffect} from "react";
import "../style/vote.css";
import Timer from "./Timer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoomReq from "../context/RoomReq";

const Vote = () => {
  const navigate = useNavigate();
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [room, setRoom] = useState([])

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
    axios.post(`${baseUrl}/room/vote/${playerId}`, {}, { headers }).then((response) => {
      if (response.status == 200) {
        console.log(response.data)
          navigate("/vote");
      }
    })
  };


  const players = room.players;
  console.log(players)
  return (
    <>
    {players &&
      <div className="full-screen bg-home">
           <div className="timer-section">
            <Timer InitialCount={30} />
          </div>
        <div className="vote-section">
          <h5>Who is the spy</h5>
          {players.map((player) => (
            <button
              className="vote-btn"
              type="button"
              value={player.playerId}
              onClick={(e)=>onSubmit(e.target.value)}
            >
              {player.playerName}
            </button>
          ))}
       
        </div>
      </div>
}
    </>
  );
};

export default Vote;

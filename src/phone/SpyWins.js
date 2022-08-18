import React, {useEffect, useState} from "react";
import axios from "axios";
import RoomReq from "../context/RoomReq";
import useSignalR from "../requests/SignalR";

const SpyWins = () => {
  const { headers } = RoomReq();

  const baseUrl = process.env.REACT_APP_BASE_URL;


  const restartGame = (playerId) => {
    axios
      .post(`${baseUrl}/room/start`, {}, { headers })
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          // navigate("/vote");
        }
      });
  };
  const endGame = (playerId) => {
    axios
      .post(`${baseUrl}/room/end`, {}, { headers })
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          // navigate("/vote");
        }
      });
  };
    return (
      <>
      <div className="full-screen bg-home">
        <div className="line">
          <h2 className="won">Spy Won</h2>
        </div>{" "}
        <div className='end'>
        <button className="finish" type="button" onClick={endGame} >End room</button>
        <button className="restart" type="button" onClick={restartGame} >Restart game</button>
        </div>
      </div>

    </>
    )
}

export default SpyWins

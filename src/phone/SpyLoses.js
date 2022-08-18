import React, { useEffect, useState } from "react";
import axios from "axios";
import RoomReq from "../context/RoomReq";
import useSignalR from "../requests/SignalR";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const SpyLoses = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const [room, setRoom] = useState({});
  const [killData, setKillData] = useState("");
  const { headers } = RoomReq();
  const { connection } = useSignalR();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = JSON.parse(localStorage.getItem("token"));
  const decodedToken = jwt_decode(token);

  console.log(loc);
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
  const restartGame = () => {
    axios.post(`${baseUrl}/room/start`, {}, { headers }).then((response) => {
      if (response.status == 200) {
        console.log(response.data);
        // navigate("/vote");
      }
    });
  };
  const endGame = () => {
    axios.post(`${baseUrl}/room/end`, {}, { headers }).then((response) => {
      if (response.status == 200) {
        console.log(response.data);
        //  navigate("/");
      }
    });
  };
  useEffect(() => {
    if (Object.keys(killData).length > 0) {
      if (killData.payload === "KillRoom") {
        navigate("/");
      }
      if (killData.payload === "StartGame") {
        navigate("/startpage", { state: killData.data });
      }
    }
  }, [killData]);

  useEffect(() => {
    (async () => {
      try {
        if (connection && room?.code) {
          connection.start().then(() => {
            connection.on("GameNotifications", (message) => {
              console.log(message);
              setKillData(message);
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
      <div className="full-screen bg-home">
        <div className="line">
          <h2 className="lose">Spy Lose</h2>
        </div>{" "}
        {decodedToken.isVIP == "True" ? (
          <div className="end">
            <button className="finish" type="button" onClick={endGame}>
              End room
            </button>
            <button className="restart" type="button" onClick={restartGame}>
              Restart game
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SpyLoses;

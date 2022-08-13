import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoomReq from "../context/RoomReq";
import useSignalR from "../requests/SignalR";
const WaitForSpy = () => {
  const { connection } = useSignalR();
  const loc = useLocation();
  const { headers } = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [room, setRoom] = useState({});
  const [roomData, setRoomData] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));

  console.log(loc.state)

  useEffect(() => {
    getRoom();
  }, []);

  async function getRoom() {
    try {
      const response = await axios.get(`${baseUrl}/room/data`, { headers });
      setRoom(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (
      Object.keys(roomData).length > 0 &&
      roomData.payload === "GameFinished"
    ) {
      if (roomData.data.spysWon === true) {
        navigate("/spyWin", { state: loc.state });
    }
    else{
      navigate("/spyLose", { state: loc.state });
    }
  }
  }, [roomData]);

  useEffect(() => {
    (async () => {
      
      try {
        if (connection && room?.code) {
          connection.start().then(() => {
            
            connection.on("GameNotifications", (message) => {
              console.log(message);
              setRoomData(message);
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
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>Wait for Spy</span>
      </div>
    </>
  );
};

export default WaitForSpy;

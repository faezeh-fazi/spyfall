import React, { useState, useRef, useEffect } from "react";

import {
    HubConnectionBuilder,
    HttpTransportType,
    LogLevel,
  } from "@microsoft/signalr";



const useSignalR = () => {

  const [players, setPlayers] = useState([]);
  const [connection, setConnection] = useState();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = JSON.parse(localStorage.getItem("token"));


  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${baseUrl}/roomsHub`, {
        accessTokenFactory: () => token,
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(connection);
  }, []);

  return {
    connection,
    players,
  };
};

const disconnectSignalR =() => {
  // if (connection.state == HubConnectionState.Connected) {
  //   connection.stop();
  // }
}

export default useSignalR
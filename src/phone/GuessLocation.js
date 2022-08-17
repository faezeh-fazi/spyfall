import axios from "axios";
import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoomReq from "../context/RoomReq";
import useSignalR from "../requests/SignalR";

const GuessLocation = () => {
  const { connection } = useSignalR();
  const loc = useLocation();
  const { headers } = RoomReq();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState([]);
  const [room, setRoom] = useState({});

  const baseUrl = process.env.REACT_APP_BASE_URL;
  console.log(loc)
  let locations = loc.state.locations
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
      const result = locations.filter((item) => {
        return (
          item.toLowerCase().match(search.toLowerCase())
        );
      });
      setFiltered(result);
    
  }, [search]);

  
  const onSubmit = (location) => {
    
    axios.post(`${baseUrl}/room/spy/${location}`, {}, { headers }).then((response) => {
      if (response.status == 200) {
          // navigate("/spyWin");
      }
      // else {
      //   navigate("/spyLose");
      // }
    })
  };
  

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
      <div className="full-screen bg-home">
        <div className="loc" >
        <h3>The Location is</h3>
        <input
                type="text"
                placeholder="Search here"
                className="w-90 form-control"
                style={{  height: "35px", width:"330px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
        </div>
        <div className="places-list">
          {filtered.map((item) => (
            <button className="location-btn" key={item} value={item} type="button" onClick={(e)=> onSubmit(e.target.value)}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default GuessLocation;

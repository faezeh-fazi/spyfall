import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../style/main.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import RoomReq from "../context/RoomReq";
import { RoomContext} from "../context/RoomContext";
import CreateRoom from "../requests/ApiReq";

const Intro = () => {
  const {room, setRoom } = useContext(RoomContext)
  const { headers } = RoomReq();

  const {create} = CreateRoom()

  const [roomData, setroomData] = useState({});
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [data, setData] = useState({
    spyCount: 0,
    startAsPlayer: false,
    roundMinutes: 0,
  });

  useEffect(() => {
    localStorage.clear();

  }, []);
  debugger
  const handleSubmit = async () => {
    debugger
    try{
      let room = await createRoom(data);
      setRoom(room.data);
    }
    catch(ex){
      debugger
    }
    debugger
  }
    
  // const handleSubmit = () => {
  //   try {
  //     axios.post(`${baseUrl}/room`, data).then(async (response) => {
  //       setroomData(response.data);
  //       localStorage.setItem("token", JSON.stringify(response.data.token));
  //       console.log(roomData);
  //       navigate(`/room`);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <div className="full-screen bg-home">
        <div className="content-area">
          <div className="content">
            <h2>Spyfall</h2>
            <h2>Spyfall</h2>
          </div>
        </div>

        <div className="start-game-btn-area">
          <div className="setting-select">
            <Form.Select
              required
              size="md"
              onChange={(e) =>
                setData((prevState) => {
                  return { ...prevState, spyCount: e.target.value };
                })
              }
            >
              <option>Spy Count </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            {data.spyCount == 0 ? (
              <span className="waviy">Select Spy Count</span>
            ) : null}
          </div>
          <button className="start-btn" onClick={handleSubmit} type="button">
            new game
          </button>
          <button className="start-btn" onClick={() => navigate("/login")}>
            join game
          </button>
        </div>
      </div>
    </>
  );
};

export default Intro;

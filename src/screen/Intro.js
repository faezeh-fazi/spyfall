import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../style/main.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import RoomReq from "../context/RoomReq";


const Intro = () => {
  const [roomData, setroomData] = useState({});
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [data, setData] = useState({
    spyCount: 0,
    startAsPlayer: false,
    roundSeconds: "260",
  });

  useEffect(() => {
    localStorage.clear();

  }, []);

  const handleSubmit = () => {
    try {
      axios.post(`${baseUrl}/room`, data).then(async (response) => {
        setroomData(response.data);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate(`/room`, {state: response.data});
      });
    } catch (error) {
      console.log(error);
    }
  };


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
                  return { ...prevState, roundSeconds: e.target.value };
                })
              }
            >
              <option> Timer</option>
              <option value="260">04:20</option>
              <option value="300">05:00</option>
              <option value="360">06:00</option>
            </Form.Select>
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
            {/* {data.spyCount == 0 ? (
              <span className="waviy">Select Spy Count</span>
            ) : null} */}
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

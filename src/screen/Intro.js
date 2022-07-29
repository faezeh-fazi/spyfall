import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/main.css";
import Form from 'react-bootstrap/Form';

const Intro = () => {
  const navigate = useNavigate();
  const [spyCount, setSpyCount] = useState(0);
  const [playersLimit, setPlayersLimit] = useState(0);

  const handleSpyCount = (event) => {
    setSpyCount(event.target.value);
  };
  const handlePlayersLimit = (event) => {
    setPlayersLimit(event.target.value);
  };
  const navigateToRoom = () => {
    navigate("/room");
  };
  return (
    <>
      <div className="full-screen bg-home">
        <div class="content-area">
          <div class="content">
            <h2>Spyfall</h2>
            <h2>Spyfall</h2>
          </div>
        </div>
      
        <div className="start-game-btn-area">
        <div className="setting-select">
        <Form.Select size="md" onChange={handleSpyCount} >
      <option>Spy Count </option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>

    </div>
          <button className="start-btn" onClick={navigateToRoom} type="button">
            new game
          </button>
          {/* <button className="start-btn">join game</button> */}
        </div>
      </div>
    </>
  );
};

export default Intro;

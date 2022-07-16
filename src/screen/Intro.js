import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import "../style/main.css";
const Intro = () => {
  const navigate = useNavigate();


  const navigateToRoom = () => {
    navigate('/room');
  };
  return (
    <>
      <div class="content-area">
        <div class="content">
          <h2>Spyfall</h2>
          <h2>Spyfall</h2>
        </div>
      </div>
        <div className="start-game-btn-area">
        <button className="start-btn" onClick={navigateToRoom} type="button">new game</button>
        <button className="start-btn">join game</button>

        </div>
    </>
  );
};

export default Intro;

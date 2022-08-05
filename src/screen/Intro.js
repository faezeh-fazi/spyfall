import React, {  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/main.css";
import Form from 'react-bootstrap/Form';
import axios from "axios"

const Intro = () => {
  const [roomData, setroomData] = useState({})
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [data, setData] = useState({
    spyCount:0,
      startAsPlayer: false,
  });



  const handleSubmit = () => {
 
    axios.post(`${baseUrl}/room`, data).then(async (response) => {
      localStorage.setItem('token',JSON.stringify(response.data.token));
      setroomData(response.data)
      console.log(roomData)
      navigate(`/room`);
      
    });

   
}
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
        <Form.Select size="md"  onChange={(e) => setData((prevState) => {
          return{...prevState , spyCount: e.target.value}
        })} >
      <option>Spy Count </option>
      <option value= '1'>One</option>
      <option value='2'>Two</option>
      <option value='3'>Three</option>
    </Form.Select>

    </div>
          <button className="start-btn" onClick={handleSubmit} type="button">
            new game
          
          </button>
          <button className="start-btn" onClick={() =>  navigate('/login')}>join game</button>
        </div>
      </div>

    </>
  );
};

export default Intro;

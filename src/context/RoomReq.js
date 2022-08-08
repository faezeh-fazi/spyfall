
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoomReq(){
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [token,setToken] = useState(null);
    
    const getToken = () =>{
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
       
        return userToken;
    }
    // const getRoom = () =>{
    //     const room = localStorage.getItem('config');
    //     const roomData = JSON.parse(room);
        
    //     return roomData;
    // }
    // const [room,setRoom] = useState(getRoom());
    const headers={
        "Content-type" : "application/json",
        "Authorization" : `Bearer ${getToken()}`
    }

  

    return {
      headers,
      getToken
    }
}
import React, { useState, useEffect, useContex, createContext } from "react";
import { useNavigate } from "react-router-dom";
import "../style/main.css";
import axios from "axios";

const CreateRoom = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const createRoom = async (data) => {
    return axios.post(`${baseUrl}/room`, data);
  };

  return { create };
};

export default CreateRoom;

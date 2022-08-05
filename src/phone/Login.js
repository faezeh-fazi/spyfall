import React from "react";
import "../style/login.css";
import { useForm } from "react-hook-form";
import NavbarComponent from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoomReq from "../context/RoomReq";

const Login = () => {
  const {headers} = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    axios.post(`${baseUrl}/room/join`, data, { headers }).then((response) => {
      console.log(response.status);
      console.log(response.data);
      navigate("/room");
    });
  };

  return (
    <>
      <NavbarComponent />
      <div className="login-cont">
        <form className="login" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name
            <br />
            <input
              className="login-input"
              placeholder="Name"
              type="text"
              {...register("PlayerName", { required: true })}
            />
          </label>
          {errors.PlayerName && <span>This field is required</span>}
          <label>
            Room Code
            <br />
            <input
              className="login-input"
              placeholder="Room Code"
              type="text"
              {...register("roomcode", { required: true })}
            />
          </label>
          {errors.roomcode && <span>Enter the Room Code</span>}
          <br />
          <input className="login-btn" type="submit" value="Play" />
        </form>
      </div>
    </>
  );
};

export default Login;

import React from "react";
import "../style/login.css";
import { useForm } from "react-hook-form";
import NavbarComponent from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoomReq from "../context/RoomReq";

const Login = () => {
  const {getToken} = RoomReq();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.roomcode.toUpperCase()
    axios.post(`${baseUrl}/room/join`, data).then((response) => {
      if(response.status == 200)
      {
        localStorage.setItem('token',JSON.stringify(response.data.token));
        navigate("/characterlist");
      }

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
          {errors.PlayerName  && <span>This field is required</span>}
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

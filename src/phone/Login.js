import React from "react";
import "../style/login.css"
import { useForm } from "react-hook-form";
import NavbarComponent from "./Navbar";

const Login = () => {
  const { login, handleSumbit, error } = useForm();
  const onSubmit = (data) => {};
  return (
    <>
    <NavbarComponent/>
    <div className="login-cont" >
      <form className="login" onSubmit={onSubmit}>
        <label>
          Name
          <br/>
          <input className="login-input" type="text" name="name" />
        </label>
        <label>
          Room Code
          <br/>
          <input type="text" name="roomcode" />
        </label>
        <br/>
        <input className="login-btn" type="submit" value="Play"/>
      </form>
      </div>
    </>
  );
};

export default Login;

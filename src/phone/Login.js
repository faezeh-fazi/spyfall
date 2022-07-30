import React from "react";
import "../style/login.css";
import { useForm } from "react-hook-form";
import NavbarComponent from "./Navbar";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
const navigate= useNavigate();


  const onSubmit = (data) => {
    console.log(data)
    navigate('/characterlist')
    
  }

  return (
    <>
      <NavbarComponent />
      <div className="login-cont">
        <form className="login" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name
            <br />
            <input className="login-input" placeholder="Name" type="text"  {...register("name", { required: true })}/>
          </label>
          {errors.name && <span>This field is required</span>}
          <label>
            Room Code
            <br />
            <input className="login-input" placeholder="Room Code" type="text" {...register("roomcode" , {required: true})} />
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

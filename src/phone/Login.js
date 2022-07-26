import React from "react";

import { useForm } from "react-hook-form";

const Login = () => {
  const { login, handleSumbit, error } = useForm();
  const onSubmit = (data) => {};
  return (
    <>
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input className="login-input" type="text" name="name" />
        </label>
        <label>
          Room Code
          <input type="text" name="roomcode" />
        </label>
        <input type="submit" />
      </form>
    </>
  );
};

export default Login;

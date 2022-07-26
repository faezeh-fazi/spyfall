import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Navbar from "./phone/Navbar";
import Login from "./phone/Login";
import Intro from "./screen/Intro";
import NewRoom from "./screen/NewRoom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Navbar />
          <Route path="/" element={<Intro />} />

          <Route path="/room" element={<NewRoom />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

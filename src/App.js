import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Intro from "./screen/Intro";
import Navbar from "./screen/Navbar/Navbar";
import NewRoom from "./screen/NewRoom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Intro />} />

          <Route path="/room" element={<NewRoom />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

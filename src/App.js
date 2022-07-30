import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Navbar from "./phone/Navbar";
import Login from "./phone/Login";
import Intro from "./screen/Intro";
import NewRoom from "./screen/NewRoom";
import FirstRound from "./phone/FirstRound";
import CharacterList from "./phone/CharacterList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/room" element={<NewRoom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/startpage" element={<FirstRound />} />
          <Route path="/characterlist" element={<CharacterList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

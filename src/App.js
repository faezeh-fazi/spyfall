import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Navbar from "./phone/Navbar";
import Login from "./phone/Login";
import Intro from "./screen/Intro";
import NewRoom from "./screen/NewRoom";
import FirstRound from "./phone/FirstRound";
import CharacterList from "./phone/CharacterList";
import GameRoom from "./phone/GameRoom";
import Vote from "./phone/Vote";
import GuessLocation from "./phone/GuessLocation";
import ScreenVote from "./screen/ScreenVote";
import { RoomContext,CreateRoom } from "./context/RoomContext";

function App() {
  const [room, setRoom] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        <RoomContext.Provider value={{room,setRoom}}>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/room" element={<NewRoom />} />
            <Route path="/screen-vote" element={<ScreenVote />} />
            <Route path="/login" element={<Login />} />
            <Route path="/startpage" element={<FirstRound />} />
            <Route path="/game" element={<GameRoom />} />
            <Route path="/characterlist" element={<CharacterList />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/spy-guess" element={<GuessLocation />} />
          </Routes>
        </RoomContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;

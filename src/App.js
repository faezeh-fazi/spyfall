import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
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
import SpyWins from "./phone/SpyWins";
import SpyLoses from "./phone/SpyLoses";
import GameTimer from "./screen/GameTimer";
import GameRound from "./screen/GameRound";
import PrivateRoute from "./PrivateRoutes";
import WaitForSpy from "./phone/WaitForSpy";
import ShowSpy from "./phone/ShowSpy";


function App() {


  return (
    <BrowserRouter>
      <div className="App">
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/room" element={<PrivateRoute> <NewRoom /></PrivateRoute>} />
            <Route path="/screen-vote" element={<PrivateRoute><ScreenVote /></PrivateRoute> } />
            <Route path="/gametime" element={<PrivateRoute><GameRound /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/startpage" element={<PrivateRoute><FirstRound /></PrivateRoute>} />
            <Route path="/game" element={<PrivateRoute><GameRoom /></PrivateRoute>} />
            <Route path="/characterlist" element={<PrivateRoute><CharacterList /></PrivateRoute>} />
            <Route path="/vote" element={<PrivateRoute><Vote /></PrivateRoute>} />
            <Route path="/spy-guess" element={<PrivateRoute><GuessLocation /></PrivateRoute>} />
            <Route path="/waitforspy" element={<PrivateRoute><WaitForSpy /></PrivateRoute>} />
            <Route path="/showSpy" element={<PrivateRoute><ShowSpy /></PrivateRoute>} />
            <Route path="/spyWin" element={<PrivateRoute><SpyWins /></PrivateRoute>} />
            <Route path="/spyLose" element={<PrivateRoute><SpyLoses /></PrivateRoute>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

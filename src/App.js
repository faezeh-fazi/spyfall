import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Intro from "./screen/Intro";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Intro />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

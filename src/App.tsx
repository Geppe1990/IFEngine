import React from 'react';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Play from "./components/play/Play";
import './App.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
            <Route path="/play" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

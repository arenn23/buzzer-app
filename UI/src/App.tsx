import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Host from "./components/Login/Host";
import Player from "./components/Login/Player";
import Welcome from "./components/Login/Welcome";
import RoomView from "./components/RoomView";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/host" element={<Host />} />
          <Route path="/player" element={<Player />} />
          <Route path="/room" element={<RoomView />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

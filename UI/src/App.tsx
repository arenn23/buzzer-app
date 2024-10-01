import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Host from "./components/Login/Host";
import Player from "./components/Login/Player";
import Welcome from "./components/Login/Welcome";
import RoomView from "./components/RoomView";

const App: React.FC = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  return (
    <div style={{ padding: "20px" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/host"
            element={<Host setRoomId={setRoomId} setName={setName} />}
          />
          <Route
            path="/player"
            element={<Player setRoomId={setRoomId} setName={setName} />}
          />
          <Route
            path="/room"
            element={<RoomView roomId={roomId} name={name} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Host from "./components/Login/Host";
import Player from "./components/Login/Player";
import Welcome from "./components/Login/Welcome";
import Room from "./components/Room";

const App: React.FC = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [host, setHost] = useState<string>("");

  const handleCreateRoom = async (hostName: string) => {
    setHost(hostName);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/host"
            element={<Host onCreateRoom={handleCreateRoom} />}
          />
          <Route path="/player" element={<Player />} />
          {/* Only navigate to Room if roomId is available */}
          <Route
            path="/room"
            element={
              roomId ? (
                <Room roomId={roomId} host={host} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

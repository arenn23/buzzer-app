import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleHostRoom = () => {
    navigate("/host");
  };

  const handleJoinRoom = () => {
    navigate("/player");
  };

  return (
    <div style={{ padding: "10px" }}>
      <h1>Welcome to the Buzzer App</h1>
      <button onClick={handleHostRoom}>Host a Room</button>
      <button onClick={handleJoinRoom}>Join a Room</button>
    </div>
  );
};

export default Welcome;

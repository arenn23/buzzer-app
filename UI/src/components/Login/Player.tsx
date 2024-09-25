import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PlayerProps {
  setRoomId: (roomId: string) => void;
  setName: (name: string) => void;
}

const Player: React.FC<PlayerProps> = ({ setRoomId, setName }) => {
  const [localRoomId, setLocalRoomId] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const navigate = useNavigate();

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/rooms/${localRoomId}/join`, {
        method: "POST",
        body: JSON.stringify({ name: playerName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      setRoomId(localRoomId);
      setName(playerName);
      navigate("/room");
    } catch (error) {
      console.error("Failed to join room:", error);
    }
  };

  return (
    <div>
      <h1>Join a Room</h1>
      <form onSubmit={handleJoinRoom}>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={localRoomId}
          onChange={(e) => setLocalRoomId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
        />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
};

export default Player;

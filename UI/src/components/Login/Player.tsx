import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Player: React.FC = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId === "" || name === "") {
      console.error("name or room cannot be blank");
      return;
    }

    try {
      const response = await fetch(`/api/rooms/${roomId}/join`, {
        method: "POST",
        body: JSON.stringify({ name: name }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      navigate(`/room?roomId=${roomId}&name=${name}`);
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
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
};

export default Player;

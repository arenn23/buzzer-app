import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HostProps {
  setRoomId: (roomId: string) => void;
  setName: (name: string) => void;
}

const Host: React.FC<HostProps> = ({ setRoomId, setName }) => {
  const [hostName, setHostName] = useState<string>("");
  const navigate = useNavigate();

  const handleCreateRoom = async (hostName: string) => {
    try {
      const response = await fetch("/api/rooms/create", {
        method: "POST",
        body: JSON.stringify({ host: hostName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const { roomId } = await response.json();
      setRoomId(roomId);
      setName(hostName);
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hostName.trim()) {
      handleCreateRoom(hostName);
    }
    navigate("/room");
  };

  return (
    <div>
      <h1>Host a Room</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={hostName}
          onChange={(e) => setHostName(e.target.value)}
          required
        />
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default Host;

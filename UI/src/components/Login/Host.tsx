import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Host: React.FC = () => {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const handleCreateRoom = async (hostName: string): Promise<string> => {
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
    return roomId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() !== "") {
      const roomId = await handleCreateRoom(name);
      navigate(`/room?roomId=${roomId}&name=${name}`);
    }
  };

  return (
    <div>
      <h1>Host a Room</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default Host;

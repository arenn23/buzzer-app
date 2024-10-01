import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles.css";

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
    <div className="container">
      <div className="form-container">
        <h1 className="title">Host a Room</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default Host;

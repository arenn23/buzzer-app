import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Player: React.FC = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
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
        setError(`Error: ${response.status} ${await response.text()}`);
        return;
      }

      navigate(`/room?roomId=${roomId}&name=${name}`);
    } catch (error) {
      console.error("Failed to join room:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">Join a Room</h1>
        <form className="form" onSubmit={handleJoinRoom}>
          {error && (
            <>
              <div style={{ color: "red" }}>There was an error</div>
              <div style={{ color: "red" }}>{error}</div>
            </>
          )}
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
            className="input"
          />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
          <button className="button" type="submit">
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default Player;

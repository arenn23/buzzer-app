import React, { useState } from "react";

interface HostProps {
  onCreateRoom: (hostName: string) => void;
}

const Host: React.FC<HostProps> = ({ onCreateRoom }) => {
  const [hostName, setHostName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hostName.trim()) {
      onCreateRoom(hostName); // Call the callback with the host's name
    }
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

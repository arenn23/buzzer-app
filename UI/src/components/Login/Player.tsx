import React from "react";

const Player: React.FC = () => {
  return (
    <div>
      <h1>Join a Room</h1>
      <form>
        <input type="text" placeholder="Enter Room ID" required />
        <input type="text" placeholder="Enter your name" required />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
};

export default Player;

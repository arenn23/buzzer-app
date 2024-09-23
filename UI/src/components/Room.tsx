import React, { useEffect, useState } from "react";

interface RoomProps {
  roomId: string;
  host: string;
}

const Room: React.FC<RoomProps> = ({ roomId, host }) => {
  const [players, setPlayers] = useState<{ name: string; time: Date }[]>([]);
  const [buzzOrder, setBuzzOrder] = useState<{ name: string; time: Date }[]>(
    []
  );

  const fetchRoomData = async () => {
    const response = await fetch(`http://localhost:5000/api/rooms/${roomId}`);
    const data = await response.json();
    setPlayers(data.players);
    setBuzzOrder(data.buzzOrder);
  };

  useEffect(() => {
    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]);

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <h2>Host: {host}</h2>
      {/* Add your buttons and lists here */}
    </div>
  );
};

export default Room;

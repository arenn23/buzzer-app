import React, { useEffect, useState } from "react";

interface RoomProps {
  roomId: string | null;
  name: string | null;
}

const Room: React.FC<RoomProps> = ({ roomId, name }) => {
  const [players, setPlayers] = useState<{ name: string; time: Date }[]>([]);
  const [buzzOrder, setBuzzOrder] = useState<{ name: string; time: Date }[]>(
    []
  );

  console.log(players);
  console.log(buzzOrder);

  const fetchRoomData = async () => {
    const response = await fetch(`api/rooms/${roomId}`);
    const data = await response.json();
    setPlayers(data.players);
    setBuzzOrder(data.buzzOrder);
  };

  useEffect(() => {
    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]);

  if (!roomId) return <>Loading...</>;
  if (!name) return <>Loading...</>;

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <h2>Name: {name}</h2>
      {/* Add your buttons and lists here */}
    </div>
  );
};

export default Room;

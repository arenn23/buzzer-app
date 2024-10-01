import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Room } from "../../../server/src/models/Room";

const RoomView: React.FC = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get("roomId");
  const name = searchParams.get("name");

  if (!roomId || !name) {
    throw new Error("Could not find room or name");
  }

  const fetchRoomData = async () => {
    const response = await fetch(`api/rooms/${roomId}`);
    const data: Room = await response.json();
    setRoom(data);
  };

  useEffect(() => {
    if (roomId) {
      fetchRoomData();

      const intervalId = setInterval(() => {
        fetchRoomData();
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [roomId]);

  const buzz = async () => {
    try {
      const response = await fetch(`api/rooms/${roomId}/buzz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });
      if (!response.ok) {
        console.error("Failed to buzz the room");
      }
    } catch (error) {
      console.error("Error buzzing the room:", error);
    }
  };

  const clearBuzz = async () => {
    try {
      const response = await fetch(`api/rooms/${roomId}/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ host: roomId }),
      });
      if (!response.ok) {
        console.error("Failed to clear the room");
      }
    } catch (error) {
      console.error("Error buzzing the room:", error);
    }
  };

  const deltaTime = (place: number): number => {
    const firstTime = room?.buzzOrder[0].time;
    const myTime = room?.buzzOrder[place].time;

    if (!firstTime || !myTime) {
      throw new Error("Could not get buzz times");
    }

    const diff = myTime - firstTime;
    return diff;
  };

  if (!room) return <>Loading...</>;

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <h2>Name: {name}</h2>
      <button onClick={buzz}>Buzz Room</button>
      {name === room.host && <button onClick={clearBuzz}>Clear</button>}
      {room.buzzOrder.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Place</th>
              <th>User</th>
              <th>Delta</th>
            </tr>
          </thead>
          <tbody>
            {room.buzzOrder.map((buzzedPerson, index) => (
              <tr key={buzzedPerson.name}>
                <td>{index + 1}</td>
                <td>{buzzedPerson.name}</td>
                <td>{index === 0 ? "0" : `+${deltaTime(index)} ms`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoomView;

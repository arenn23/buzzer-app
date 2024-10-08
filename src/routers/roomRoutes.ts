import express from "express";
import { Room } from "../models/Room.js";

const router = express.Router();
const rooms: Record<string, Room> = {};

router.post("/create", (req, res) => {
  const { host } = req.body;
  const room = new Room(host);
  rooms[room.id] = room;
  res.status(201).json({ roomId: room.id });
});

router.post("/:roomId/join", (req, res) => {
  const { roomId } = req.params;
  const { name } = req.body;
  const room = rooms[roomId];

  if (!room) {
    return res.status(404).send("Room not found");
  }

  if (room.players.find((x) => x.name === name)) {
    return res
      .status(404)
      .send("Someone in you room has taken this name. Please select a new one");
  }

  room.players.push({ name });
  return res.status(200).json({ roomId: room.id });
});

router.post("/:roomId/buzz", (req, res) => {
  const { roomId } = req.params;
  const { name } = req.body;
  const room = rooms[roomId];

  if (room) {
    room.buzz(name);
    res.status(200).json(room);
  } else {
    res.status(404).send("Room not found");
  }
});

router.post("/:roomId/reset", (req, res) => {
  const { roomId } = req.params;
  const room = rooms[roomId];

  if (room) {
    room.reset();
    res.status(200).send("Room reset");
  } else {
    res.status(403).send("Only the host can reset the room");
  }
});

router.get("/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms[roomId];

  if (room) {
    res.status(200).json(room);
  } else {
    res.status(404).send("Room not found");
  }
});

export default router;

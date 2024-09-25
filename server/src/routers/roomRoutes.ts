import express from "express";
import { Room } from "../models/Room";

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
  if (room) {
    room.players.push({ name });
    res.status(200).json({ roomId: room.id });
  } else {
    res.status(404).send("Room not found");
  }
});

router.post("/:roomId/buzz", (req, res) => {
  const { roomId } = req.params;
  const { name } = req.body;

  if (rooms[roomId]) {
    rooms[roomId].buzz(name);
    res.status(200).json(rooms[roomId]);
  } else {
    res.status(404).send("Room not found");
  }
});

router.post("/:roomId/reset", (req, res) => {
  const { roomId } = req.params;
  const { host } = req.body;

  if (rooms[roomId] && rooms[roomId].host === host) {
    rooms[roomId].reset();
    res.status(200).send("Room reset");
  } else {
    res.status(403).send("Only the host can reset the room");
  }
});

router.get("/:roomId", (req, res) => {
  const { roomId } = req.params;

  if (rooms[roomId]) {
    res.status(200).json(rooms[roomId]);
  } else {
    res.status(404).send("Room not found");
  }
});

export default router;

import { v4 as uuidv4 } from "uuid";

export class Room {
  id: string;
  host: string;
  players: { name: string }[] = [];
  buzzOrder: { name: string; time: Date }[] = [];

  constructor(host: string) {
    this.id = uuidv4();
    this.host = host;
    this.players.push({ name: this.host });
  }

  buzz(name: string) {
    const time = new Date();
    this.buzzOrder.push({ name, time });
  }

  reset() {
    this.players = [];
    this.buzzOrder = [];
  }
}

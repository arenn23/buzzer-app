import { v4 as uuidv4 } from "uuid";

export class Room {
  id: string;
  host: string;
  players: { name: string }[] = [];
  buzzOrder: { name: string; time: number }[] = [];

  constructor(host: string) {
    this.id = uuidv4().slice(0, 4);
    this.host = host;
    this.players.push({ name: this.host });
  }

  buzz(name: string) {
    const time = new Date();
    const playerHasNotBuzzed =
      this.buzzOrder.find((x) => x.name === name) === undefined;
    if (playerHasNotBuzzed) {
      this.buzzOrder.push({ name, time: time.getTime() });
    }
  }

  reset() {
    this.players = [];
    this.buzzOrder = [];
  }
}

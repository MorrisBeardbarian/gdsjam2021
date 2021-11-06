import { Game } from "phaser";

class GameManager {
  constructor() {
    if (Game._instance) {
      return Game._instance;
    }

    Game._instance = this;
    this.gameVolume = 1;
  }

  setVolume(value) {
    this.gameVolume = value;
  }

  getVolume() {
    return this.gameVolume;
  }
}

export const gameManager = new GameManager()
import Phaser, { Game } from "phaser";
import { Level1 } from "./levels/level1";
import { Level2 } from "./levels/level2";
import { LevelSelect } from "./level_select";
import { MainMenu } from "./main_menu";
import { PauseMenu } from "./pause";

export class GameManager {
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

var possibleSizeHeight = (window.innerWidth * 9) / 16;
var possibleSizeWidth = (window.innerHeight * 16) / 9;

var widthMax =
  possibleSizeWidth == window.innerWidth &&
  possibleSizeHeight < window.innerHeight;
var canvasWidth = widthMax ? window.innerWidth : possibleSizeWidth;
var canvasHeight = widthMax ? possibleSizeHeight : window.innerHeight;

var config = {
  type: Phaser.AUTO,
  width: canvasWidth,
  height: canvasHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [MainMenu, LevelSelect, Level1, Level2, PauseMenu],
};

var game = new Phaser.Game(config);
var gameManager = new GameManager();

import Phaser from "phaser";
import { Level1 } from "./levels/level1";
import { Level2 } from "./levels/level2";

var possibleSizeHeight = window.innerWidth*9/16;
var possibleSizeWidth = window.innerHeight*16/9;

var widthMax = possibleSizeWidth == window.innerWidth && possibleSizeHeight < window.innerHeight;
var canvasWidth = (widthMax? window.innerWidth: possibleSizeWidth);
var canvasHeight = (widthMax? possibleSizeHeight: window.innerHeight);

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
  scene: [Level1, Level2]
};

var game = new Phaser.Game(config);
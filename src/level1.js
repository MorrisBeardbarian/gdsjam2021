import Phaser from "phaser";
import { Player, playerPreloadAssets } from "./player";
import { Door, doorPreloadAssets } from "./door.js"

export class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: "Level1" });
  }

  preload() {
    this.load.image("background", "public/images/test_background.jpg");
    this.load.image("ground", "public/images/platform.png");
    playerPreloadAssets(this);
    doorPreloadAssets(this);
  }

  create() {
    // Background creation
    this.setBackground();
    // Platforms creation
    this.setPlatforms();
    // Door creation
    this.door = new Door(this);
    this.door.createDoor(this.sys.canvas.width - 100, this.sys.canvas.height - 100); // 100 should not be hardcoded, works for now :D

    // Player
    this.player = new Player(this);
    this.player.createPlayer(100, this.sys.canvas.height - 100); // TODO: maybe needs to be changed

    // Add physics
    this.physics.add.collider(this.player.getPlayer(), this.platforms);
    this.physics.add.collider(this.door.getDoor(), this.platforms);
    this.door.setColliderWithPlayer(this.player.getPlayer());

    // Do some logic needed at create time
    this.door.openDoor(); // It is opened by default
  }

  update() {
    this.player.playerMovementUpdate(true);
  }

  setBackground() {
      this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "background").setScale(this.sys.canvas.width / 1920);
  }

  setPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    var groundPlatform = this.platforms.create(this.sys.canvas.width / 2, this.sys.canvas.height, "ground");
    groundPlatform.scaleX = this.sys.canvas.width / 400; // TODO: Change this 400 to image witdth
    groundPlatform.refreshBody();
  }
}

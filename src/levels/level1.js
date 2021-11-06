import Phaser from "phaser";
import { Assets } from '../assets'
import { Player } from "../player";
import { Door } from "../door"
import { PlatformManager } from '../platform'
import { Collectible } from "../collectible";
import { SFX } from '../sfx'
import { PauseManager } from "../pause";

export class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: "Level1" });
    this.collectibles = [];
    this.collected = 0;
  }

  preload() {
    var assets = new Assets(this)
    assets.loadLevel1()
  }

  create() {
    // Sounds creation
    this.setSounds();

    // Background creation
    this.setBackground();

    // Platforms creation
    this.setPlatforms();

    // End Door creation
    this.endDoor = new Door(this);
    this.endDoor.createDoor(this.sys.canvas.width - 100, this.sys.canvas.height - 100); // 100 should not be hardcoded, works for now :D

    // Player
    this.player = new Player(this);
    this.player.createPlayer(100, this.sys.canvas.height - 100); // TODO: maybe needs to be changed

    // Collectibles
    this.createCollectibles();

    // Add physics
    this.platforms.collideWith(this.player.getPlayer())
    this.platforms.collideWith(this.endDoor.getDoor())
    this.collectibles.forEach(collectible => {
      this.platforms.collideWith(collectible.getCollectible());
      collectible.addPlayerOverlap(this.player.getPlayer(), this.collect);
    })

    // pause manager
    this.pauseManager = new PauseManager();
    this.pauseManager.setCurrentScene(this);
    this.pauseManager.setupInputsPause("PauseMenu");
  }

  update() {
    this.player.playerMovementUpdate(true);
    this.player.playerDoorPressUpdate(this.endDoor, "Level2");
  }

  setSounds() {
    this.sfx = new SFX(this.scene, ["door-open"])
  }

  setBackground() {
    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "background").setScale(this.sys.canvas.width / 1920);
  }

  setPlatforms() {
    this.platforms = new PlatformManager(this);
    var groundPlatform = this.platforms.add(this.sys.canvas.width / 2, this.sys.canvas.height, "ground")
    groundPlatform.scaleX = this.sys.canvas.width / 400; // TODO: Change this 400 to image witdth
    groundPlatform.refreshBody();
  }

  collect() {
    this.collected++;
    if (this.collected >= this.collectibles.length) {
      this.sfx["door-open"].play();
      this.endDoor.openDoor();
    }
  }

  createCollectibles() {
    var collectible1 = new Collectible(this);
    collectible1.createCollectible(400, this.sys.canvas.height - 50, "star");
    this.collectibles.push(collectible1)

    var collectible2 = new Collectible(this);
    collectible2.createCollectible(800, this.sys.canvas.height - 50, "star");
    this.collectibles.push(collectible2)
  }
}

import Phaser from "phaser";
import { Assets } from '../assets'
import { Player } from "../player";
import { Door } from "../door"
import { PlatformManager } from '../platform'
import { Collectible } from "../collectible";
import { SFX } from '../sfx'
import { PauseManager } from "../pause";
import EnemyFactory from '../enemyFactory.js';
import Wall from '../wall.js';

export class Level1 extends Phaser.Scene {
  constructor() {
    super({ key: "Level1" });
    this.collectibles = [];
    this.collected = 0;
    this.enemies = [];
    this.walls = [];
  }

  preload() {
    var assets = new Assets(this)
    assets.loadLevel1();

    //Enemy
    this.enemyFactory = new EnemyFactory(this, 'enemy', "../public/images/dude.png", true, {
      frameWidth: 32,
      frameHeight: 48,
    });

    //Walls
    this.wall = new Wall(this, "wall", "../public/images/wall.png");
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

    //Enemies
    this.enemies.push(this.enemyFactory.createEnemy(900, 50, 1));

    //Walls
    this.walls = this.physics.add.staticGroup();
    this.wall.createWall(300, 900, this.walls, 1);
    this.wall.createWall(800, 900, this.walls, 1);

    // Add physics
    this.platforms.collideWith(this.player.getPlayer())
    this.platforms.collideWith(this.endDoor.getDoor())
    this.collectibles.forEach(collectible => {
      this.platforms.collideWith(collectible.getCollectible());
      collectible.addPlayerOverlap(this.player.getPlayer(), this.collect);
    })
    this.enemies.forEach(enemy => {
      this.platforms.collideWith(enemy.getEnemy());
      enemy.setCollidingWith(this.walls);
      enemy.addPlayerOverlap(this.player.getPlayer(), this.playerLoseLife);
    })

    // pause manager
    this.pauseManager = new PauseManager();
    this.pauseManager.setCurrentScene(this);
    this.pauseManager.setupInputsPause("PauseMenu");

  }

  update() {
    this.player.playerMovementUpdate(true);
    this.player.playerDoorPressUpdate(this.endDoor, "Level2");
    for ( var enemy of this.enemies) {
      enemy.update();
    }
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
      this.sfx.play("door-open");
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

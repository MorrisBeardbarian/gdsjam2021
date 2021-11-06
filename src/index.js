import Phaser from "phaser";
import {Player} from "./player.js"

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var platforms;
var player;
var cursors;
var stars;
var bombs;

var gameOver = false;

// score
var score = 0;
var scoreText;

function preload() {
  this.load.image("sky", "public/images/sky.png");
  this.load.image("ground", "public/images/platform.png");
  this.load.image("star", "public/images/star.png");
  this.load.image("bomb", "public/images/bomb.png");
  this.load.spritesheet("dude", "public/images/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

function create() {
  this.add.image(400, 300, "sky");

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, "ground").setScale(2).refreshBody();
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  // player
  player = new Player(this);

  // add colision
  this.physics.add.collider(player.getPlayer(), platforms);

  // Add cursors
  cursors = this.input.keyboard.createCursorKeys();

  // stars
  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player.getPlayer(), stars, collectStar, null, this);

  // score
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000",
  });

  // bombs
  bombs = this.physics.add.group();
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player.getPlayer(), bombs, hitBomb, null, this);
}

function update() {
  if (gameOver) {
    return;
  }

  player.playerMovementUpdate(true);
}

function collectStar(player, star) {
  star.disableBody(true, true);

  score += 10;
  scoreText.setText("Score: " + score);

  // release bomb
  if (stars.countActive(true) === 0) {
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
    var bomb = bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
  }
}

function hitBomb(player, bomb) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play("turn");

  gameOver = true;
}

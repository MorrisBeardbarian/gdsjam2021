export class Player {
  constructor(scene) {
    this.scene = scene;
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  createPlayer(x, y) {
    this.createPlayerObject(x, y);
  }

  playerMovementUpdate(bCanJump) {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (bCanJump && this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  createPlayerObject(x, y) {
    this.player = this.scene.physics.add.sprite(x, y, "dude");
    this.player.setCollideWorldBounds(true);
    this.setPlayerAnimations();
  }

  // TODO: Change accordingly to new assets
  setPlayerAnimations() {
    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  getPlayer() {
    return this.player;
  }
}

// TODO: change accordingly to new assets
export function playerPreloadAssets(scene) {
  scene.load.spritesheet("dude", "public/images/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

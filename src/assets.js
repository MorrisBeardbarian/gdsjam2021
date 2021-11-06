export class Assets {
  constructor(scene) {
    this.scene = scene;
  }

  loadLevel1() {
    // background and platforms
    this.scene.load.image("background", "public/images/test_background.jpg");
    this.scene.load.image("ground", "public/images/platform.png");

    // player assets
    this.scene.load.spritesheet("dude", "public/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    // door assets
    this.scene.load.spritesheet("door", "public/images/door.jpg", {
      frameWidth: 235,
      frameHeight: 367,
    });

    // Collectible assets 
    // Test collectible
    this.scene.load.image("star", "public/images/star.png");
  }
}

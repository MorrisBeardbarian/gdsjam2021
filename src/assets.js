export class Assets {
  constructor(scene) {
    this.scene = scene;
  }

  load() {
    this.load.image("sky", "public/images/sky.png");
    this.load.image("ground", "public/images/platform.png");
    this.load.image("star", "public/images/star.png");
    this.load.image("bomb", "public/images/bomb.png");
    this.load.spritesheet("dude", "public/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
}

export class PlatformManager {
  constructor(scene) {
    this.scene = scene;
    this.platforms = this.scene.physics.add.staticGroup();
  }

  add(x, y, texture, scale) {
    const gameObject = this.platforms.create(x, y, texture);

    if (scale) {
      gameObject.setScale(scale).refreshBody();
    }
  }

  collideWith(object, cb) {
    this.scene.physics.add.collider(object, this.platforms, cb);
  }

  clear() {
    this.platforms.clear(true, true);
  }
}

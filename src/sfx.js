export class SFX {
  constructor(scene, sfx = []) {
    this.scene = scene;
    sfx.forEach(s => this[s] = this.scene.scene.sound.add(s))
  }
}

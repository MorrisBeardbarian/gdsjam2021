import { gameManager } from "./game_manager";

export class SFX {
  constructor(scene, sfx = []) {
    this.scene = scene;
    this.sounds = []
    sfx.forEach((sound) => {
      this.sounds[sound] = this.scene.scene.sound.add(sound);
    });
  }

  play(sound) {
    this.sounds[sound].play({ volume: gameManager.getVolume() });
  }
}

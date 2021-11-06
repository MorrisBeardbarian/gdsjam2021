export class Assets {
  constructor(scene) {
    this.scene = scene;
  }

  loadCommonAudio() {
    this.scene.load.audio("door-open", "public/audio/door-open.mp3")
  }

  loadLevel1() {
    // background and platforms
    this.scene.load.image("background", "public/images/test_background.jpg");
    this.scene.load.image("ground", "public/images/platform.png");

    // audio files
    this.loadCommonAudio()

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

  loadMainMenu() {
    // load the plugin
    this.scene.load.scenePlugin(
      "rexuiplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      "rexUI",
      "rexUI"
    );

    this.scene.load.image("background", "public/images/test_background.jpg");
  }

  loadPauseMenu() {
    // load the plugin
    this.scene.load.scenePlugin(
      "rexuiplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      "rexUI",
      "rexUI"
    );
  }

  loadLevelSelectMenu() {
    // load the plugin
    this.scene.load.scenePlugin(
      "rexuiplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      "rexUI",
      "rexUI"
    );
  }
}

export function createMenuButton(scene, text) {
  return scene.rexUI.add.label({
    width: scene.sys.canvas.width / 8,
    height: scene.sys.canvas.height / 8,
    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xdddddd),
    text: scene.add.text(0, 0, text, {
      fontSize: 32,
      align: "center",
      color: "0x000000",
    }),
    space: {
      left: 10,
      right: 10,
    },
    align: "center",
  });
}

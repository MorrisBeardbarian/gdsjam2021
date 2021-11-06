import { createMenuButton, Assets } from "./assets";

export class PauseManager {
  constructor(scene) {
    if (PauseManager._instance) {
      return PauseManager._instance;
    }

    PauseManager._instance = this;
  }

  setupInputsPause(launchScene = "PauseMenu") {
    var keyObj = this.scene.input.keyboard.addKey("P");
    keyObj.on("down", (event) => {
      // pause
      this.scene.scene.pause();
      this.scene.scene.launch(launchScene);
    });
  }

  resume(currentScene) {
    this.scene.scene.resume();
    currentScene.scene.stop();
  }

  restart(currentScene) {
    this.scene.scene.restart();
    currentScene.scene.stop();
  }

  setCurrentScene(scene) {
    this.scene = scene;
  }

  goToMainMenu(currentScene) {
    this.scene.scene.stop();
    currentScene.scene.start("MainMenu");
    currentScene.scene.stop();
  }
}

export class PauseMenu extends Phaser.Scene {
  constructor() {
    super({ key: "PauseMenu" });
  }

  preload() {
    var assets = new Assets(this)
    assets.loadPauseMenu()
  }

  create() {
    this.pauseManager = new PauseManager();
    var buttons = this.rexUI.add
      .buttons({
        x: this.sys.canvas.width / 2,
        y: this.sys.canvas.height / 2,
        orientation: "y",
        background: this.rexUI.add.roundRectangle(
          0,
          0,
          0,
          0,
          20,
          0x000000,
          0.7
        ),
        buttons: [
          createMenuButton(this, "Resume"),
          createMenuButton(this, "Main Menu"),
          createMenuButton(this, "Restart"),
        ],

        space: { left: 4000, right: 4000, top: 4000, bottom: 4000, item: 8 },
      })
      .layout();

    buttons.on("button.click", (button, index, pointer, event) => {
      // stupid but easier :)
      if (button.text === "Resume") {
        this.pauseManager.resume(this);
      } else if (button.text === "Main Menu") {
        this.pauseManager.goToMainMenu(this);
        // this.scene.start("MainMenu");
      } else if (button.text === "Restart") {
        //  Get a random color
        var red = Phaser.Math.Between(0, 255);
        var green = Phaser.Math.Between(0, 255);
        var blue = Phaser.Math.Between(0, 255);

        this.cameras.main.fade(400, red, green, blue);
        this.cameras.main.on(
          "camerafadeoutcomplete",
          () => {
            this.pauseManager.restart(this);
          },
          this
        );
      }
      buttons.setButtonEnable(false);
      setTimeout(() => {
        buttons.setButtonEnable(true);
      }, 1000);
    });
  }

  update() {}
}

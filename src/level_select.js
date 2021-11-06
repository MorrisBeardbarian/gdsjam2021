import { Assets, createMenuButton } from "./assets";

export class LevelSelect extends Phaser.Scene {
  constructor() {
    super({ key: "LevelSelect" });
  }

  preload() {
    var assets = new Assets(this);
    assets.loadLevelSelectMenu();
  }

  create() {
    // Background creation
    this.setBackground();

    // Add buttons
    this.createSelectButtons();
    this.createBackButton();
  }

  update() {}

  setBackground() {
    this.add
      .image(
        this.sys.canvas.width / 2,
        this.sys.canvas.height / 2,
        "background"
      )
      .setScale(this.sys.canvas.width / 1920);
  }

  createSelectButtons() {
    var buttons = this.rexUI.add
      .buttons({
        x: this.sys.canvas.width / 2,
        y: this.sys.canvas.height / 2,
        orientation: "x",
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
          createMenuButton(this, "1"),
          createMenuButton(this, "2"),
          createMenuButton(this, "3"),
          createMenuButton(this, "4"),
          createMenuButton(this, "5"),
        ],
        space: { left: 4000, right: 4000, top: 4000, bottom: 4000, item: 8 },
      })
      .layout();

    buttons.on("button.click", (button, index, pointer, event) => {
      // stupid but easier :)
      this.scene.start("Level" + button.text);
      buttons.setButtonEnable(false);
      setTimeout(() => {
        buttons.setButtonEnable(true);
      }, 1000);
    });
  }

  createBackButton() {
    var buttons = this.rexUI.add
      .buttons({
        x: this.sys.canvas.width / 2,
        y: this.sys.canvas.height - this.sys.canvas.height / 10,
        orientation: "y",
        buttons: [
          createMenuButton(this, "Back"),
        ],
        space: { left: 4000, right: 4000, top: 4000, bottom: 4000, item: 8 },
      })
      .layout();

    buttons.on("button.click", (button, index, pointer, event) => {
      // stupid but easier :)
      this.scene.start("MainMenu");
      buttons.setButtonEnable(false);
      setTimeout(() => {
        buttons.setButtonEnable(true);
      }, 1000);
    });
  }
}

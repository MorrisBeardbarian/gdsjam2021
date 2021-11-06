import { Assets, createMenuButton } from "./assets";
import Phaser from "phaser";
import { GameManager } from ".";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  preload() {
    var assets = new Assets(this);
    assets.loadMainMenu();
  }

  create() {
    // Background creation
    this.setBackground();

    // Add buttons
    this.createButtons();

    // Add volume slider
    this.createVolumeSlider();
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

  createButtons() {
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
        buttons: [createMenuButton(this, "Play")],

        space: { left: 4000, right: 4000, top: 4000, bottom: 4000, item: 8 },
      })
      .layout();

    buttons.on("button.click", (button, index, pointer, event) => {
      // stupid but easier :)
      if (button.text === "Play") {
        this.scene.start("LevelSelect");
      }
      buttons.setButtonEnable(false);
      setTimeout(() => {
        buttons.setButtonEnable(true);
      }, 1000);
    });
  }

  createVolumeSlider() {
    var gameManager = new GameManager();
    console.log("The volume is: ", gameManager.getVolume());
    var text = this.add.text(
      this.sys.canvas.width / 2 - this.sys.canvas.height / 16,
      this.sys.canvas.height / 2 + this.sys.canvas.height / 10,
      "Volume",
      {
        fontSize: 32,
      }
    );
    text.setTint(0xffffff);
    this.rexUI.add
      .slider({
        x: this.sys.canvas.width / 2,
        y: this.sys.canvas.height / 2 + (this.sys.canvas.height / 10) * 2,
        width: 300,
        height: 30,
        orientation: "x",
        value: gameManager.getVolume(),

        track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x74c9b7),
        indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x41ccad),
        thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x0e6855),

        input: "click", // 'drag'|'click'
        easeValue: { duration: 250 },

        valuechangeCallback: function (value) {
          gameManager.setVolume(value);
          console.log("The volume is: ", gameManager.getVolume());
        },
      })
      .layout();
  }
}

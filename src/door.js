import Phaser from "phaser";

export class Door {
  constructor(scene) {
    this.scene = scene;
    this.bIsOpen = false;
    this.bIsEndDoor = true; // by default all doors are end doors
  }

  setTeleporterDoor(linkedDoor) {
    this.linkedDoor = linkedDoor;
    this.bIsEndDoor = false;
  }

  createDoor(x, y, sprite = "door") {
    this.door = this.scene.physics.add
      .sprite(x - 1200, y, sprite)
      .setScale(0.2); // TODO: Don't use setScale, make the door proper size
    this.door.setCollideWorldBounds(true);
    this.setDoorAnimations();
  }

  setDoorAnimations() {
    this.scene.anims.create({
      key: "close",
      frames: [{ key: "door", frame: 0 }],
      frameRate: 20,
    });
    this.scene.anims.create({
      key: "open",
      frames: [{ key: "door", frame: 1 }],
      frameRate: 20,
    });
  }

  checkOverlapPlayer(player) {
    var boundThis = this.door.getBounds();
    var boundPlayer = player.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundThis, boundPlayer);
  }

  hitDoor(nextLevel, player) {
    if (this.bIsEndDoor) {
      this.endGame(nextLevel);
    } else {
      this.teleport(player);
    }
  }

  endGame(nextLevel) {
    if (!this.bIsOpen) {
      return;
    }

    this.scene.scene.start(nextLevel);
  }

  teleport(player) {
    console.log(this.linkedDoor);
    this.closeDoor();
    this.linkedDoor.openDoor();

    player.setPosition(this.linkedDoor.door.x, this.linkedDoor.door.y);
  }

  openDoor() {
    this.door.anims.play("open");
    this.bIsOpen = true;
  }

  closeDoor() {
    this.door.anims.play("close");
    this.bIsOpen = false;
  }

  getDoor() {
    return this.door;
  }

  isOpen() {
    return this.bIsOpen;
  }
}

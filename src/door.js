import Phaser from "phaser";

export class Door {
    constructor(scene) {
        this.scene = scene;
        this.bIsOpen = false;
    }

    createDoor(x, y) {
        this.door = this.scene.physics.add.sprite(x, y, "door").setScale(.2); // TODO: Don't use setScale, make the door proper size
        this.door.setCollideWorldBounds(true);
        this.setDoorAnimations();
    }

    setDoorAnimations() {
        this.scene.anims.create({
            key: "close",
            frames: [ { key: "door", frame: 0 } ],
            frameRate: 20,
        });
        this.scene.anims.create({
            key: "open",
            frames: [ { key: "door", frame: 1 } ],
            frameRate: 20,
        });
    }

    checkOverlapPlayer(player) {
        var boundThis = this.door.getBounds();
        var boundPlayer = player.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundThis, boundPlayer);
    }


    hitDoor(nextLevel) {
        if (!this.isOpen) {
            return // do nothing, door not opened
        }
    
        this.scene.scene.start(nextLevel);
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
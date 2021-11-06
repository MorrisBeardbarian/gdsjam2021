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

    setColliderWithPlayer(player) {
        this.collider = this.scene.physics.add.collider(player, this.door, this.hitDoor, null, this);
        this.collider.active = this.bIsOpen;
    }

    hitDoor(player, door) {
        // stupid but should work :)
        if (!this.isOpen) {
            return // do nothing, door not opened
        }

        this.scene.start("Level2");
      }

    openDoor() {
        this.door.anims.play("open");
        this.bIsOpen = true;
        this.collider.active = true;
    }

    closeDoor() {
        this.door.anims.play("close");
        this.bIsOpen = false;
        this.collider.active = false;
    }

    getDoor() {
        return this.door;
    }

    isOpen() {
        return this.bIsOpen;
    }
}
export class Collectible {
    constructor(scene) {
        this.scene = scene;
    }

    createCollectible(x, y, image) {
        this.collectible = this.scene.physics.add.image(x, y, image);
        this.collectible.setCollideWorldBounds(true);
    }

    getCollectible() {
        return this.collectible;
    }

    addPlayerOverlap(player, callback = function(player, collectible) {}) {
        this.scene.physics.add.overlap(player, this.collectible, this.collect, callback, this.scene);
    }

    collect(player, collectible) {
        collectible.destroy();
    }
}
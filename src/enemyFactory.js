import ImageAsset  from './imageAsset.js';
import Enemy from './enemy.js';

export default class EnemyFactory extends ImageAsset{

    createEnemy(x = 0, y = 0, scale = 1) {
        return new Enemy(this.scene.physics.add.sprite(x, y, this.name).setScale(scale), this.scene);
    }


}
export default class Wall {

    constructor(scene, name, pathToSprite) {
        this.scene = scene;
        this.name = true;
        this.pathToSprite = pathToSprite;
        this.instance = this.scene.load.image(this.name, this.pathToSprite);
    }

    createWall(x = 0, y = 0, staticGroup = undefined, scale = 1) {
        this.scale = scale;
        if(staticGroup)
            staticGroup.create(x, y, this.name).setScale(scale).refreshBody();
    }
    
    getWall() {
        return this.instance;
    }
}
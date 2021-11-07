export default class ImageAsset {

    constructor(scene, name, pathToSprite, spritesheet = false, args = undefined) {
        this.scene = scene;
        this.name = name;
        this.pathToSprite = pathToSprite;
        this.spritesheet = spritesheet;
        this.args = args;
        if(spritesheet)
            this.scene.load.spritesheet(this.name, this.pathToSprite, this.args);
        else
            this.scene.load.image(this.name, this.pathToSprite);
    }

}
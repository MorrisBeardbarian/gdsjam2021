import ImageAsset from "./imageAsset.js";

export default class Wall extends ImageAsset {

    createWall(x = 0, y = 0, staticGroup = undefined, scale = 1) {
        this.scale = scale;
        if(staticGroup)
            staticGroup.create(x, y, this.name).setScale(scale).refreshBody();
    }
}
export default class Enemy{

    constructor(instance, scene) {
        this.instance = instance;
        this.instance.wrapper = this;
        this.scene = scene;
        this.direction = -1;  //1 = right, 0 = stopped, -1 left
        this.instance.setCollideWorldBounds(true);
    }

    setCollidingWith(staticObjects){
        this.scene.physics.add.collider(this.instance, staticObjects, this.collideToggleDirection);
    }

    changeDirection(direction){
        if([-1, 0, 1].indexOf(direction) == -1)
            console.error( "Bad direction specified" );
        else
            this.direction = direction;
    }

    toggleDirection(){
        this.direction *= -1;
    }

    collideToggleDirection(thisEnemy, objectCollided){
        thisEnemy.wrapper.toggleDirection();
        console.log("direction change " + thisEnemy.wrapper.getDirection());
    }

    checkPlayerOnSameElevation(){
        if(this.player){
            if(this.player.y - this.player.height/2 <= this.instance.y && this.player.y + this.player.height/2 >= this.instance.y)
                return true;
        }
        return false;
    }

    between(min, max) {
        return Math.floor(
            Math.random() * (max - min + 1) + min
        )
    }

    randomlyChangeDirection(){
        if(!this.randDirChangeTimeout){
            let _this = this;
            this.randDirChangeTimeout = setTimeout(() => {
                let chanceForChange = _this.between(1, 10)
                if(_this.direction != 0 && chanceForChange == 1){
                    console.log("Change percentages here");
                    _this.changeDirection(_this.between(-1, 1));
                }
                else if(_this.direction == 0 && chanceForChange <= 3){
                    while(_this.direction == 0)
                        _this.changeDirection(_this.between(-1, 1));
                }
                clearTimeout(this.randDirChangeTimeout);
                this.randDirChangeTimeout = undefined;
            }, 1000);
        }
    }

    addPlayerOverlap(player, callback = function(player, collectible) {}) {
        this.player = player;
        //Deal overlap damage
        this.scene.physics.add.overlap(this.player, this.instance, this.damagePlayer, callback, this.scene);
    }

    getEnemy(){
        return this.instance;
    }

    damagePlayer(){
        if(!this.overlappedPlayer){
            this.overlappedPlayer = true;
            setTimeout(() => {
                this.overlappedPlayer = false;
            }, 3000);
            console.log("minus life");
        }
    }

    getDirection(){
        return this.direction;
    }

    update(){
        this.randomlyChangeDirection();

        if(this.direction == -1)
            this.instance.setVelocityX(-160);
        else if(this.direction == 1)
            this.instance.setVelocityX(160);
        else
            this.instance.setVelocityX(0);
    }
}
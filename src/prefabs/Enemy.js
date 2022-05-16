class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    update() {
        //this.enemyFollows();
        this.y += 5;
        if(this.y > 900) {
            this.reset();
        }
    }

    //might want this function to be in scene
    /*enemyFollows() {
        this.physics.moveToObject(this, Player, 10);
    }*/

    reset(){
        this.y = 0;
    }
    
}
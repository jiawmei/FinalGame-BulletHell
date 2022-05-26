class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);
        this.scene.add.existing(this);

        this.colldideWorldBounds = true;
    }
/*
    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if(this.y <= 0){
            this.setActive(false);
            this.setVisible(false);
        }
    }
*/
    update() {
        if (this.y <= 0) {
           this.destroy();
        }
    }

    gotHit(){
        this.deactivate();
    }

    //might want this function to be in scene
    /*enemyFollows() {
        this.physics.moveToObject(this, Player, 10);
    }*/

    /*reset(){
        this.y = 0;
    }*/
    
}
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    update() {
        //this.enemyFollows();
    }

    //might want this function to be in scene
    enemyFollows() {
        this.physics.moveToObject(this, Player, 10);
    }

    
}
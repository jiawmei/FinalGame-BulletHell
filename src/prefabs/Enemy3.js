class Enemy3 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
    }

    update() {
        if (this.x >= 750) {
           this.setActive(false);
           this.setVisible(false);
        }
    }


    spawn(x, y) {
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(-450);
    }
    
}
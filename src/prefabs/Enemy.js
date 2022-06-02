class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
    }

    update() {
        if (this.y <= 900) {
           this.setActive(false);
           this.setVisible(false);
        }
    }


    spawn(x, y) {
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(450);
    }
    
}
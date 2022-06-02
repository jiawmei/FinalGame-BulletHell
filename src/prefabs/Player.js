class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);
        this.scene.add.existing(this);

        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        
        this.gameOver = false;
    }

    create() {
        this.body.setMaxVelocity(100);
    }
    

    update() {

        if (keyUp.isDown) {

            this.y -= 4;
        }

        if (keyDown.isDown) {
            this.y += 4;
        }

        if (keyLeft.isDown) {
            this.x -= 4;
        }

        if (keyRight.isDown) {
            this.x += 4;
        }

    }

    
}
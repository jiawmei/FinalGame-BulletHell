class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyUp)) {

        }

        if (Phaser.Input.Keyboard.JustDown(keyDown)) {

        }

        if (Phaser.Input.Keyboard.JustDown(keyLeft)) {

        }

        if (Phaser.Input.Keyboard.JustDown(keyRight)) {

        }

        if (Phaser.Input.Keyboard.JustDown(keySpace)) {

        }

        if (game.input.activePointer.leftButton.isDown) {
            
        }
        
    }

    
}
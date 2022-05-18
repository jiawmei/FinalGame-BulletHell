class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.physics.add.existing(this);
        this.scene.add.existing(this);
        
        this.gameOver = false;
    }

    //for this to work may need to be in scene
    //https://phaser.io/examples/v2/arcade-physics/shoot-the-pointer
    
    create() {
        /*bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);*/
        this.body.setMaxVelocity(100);
    }
    

    update() {

        if (keyUp.isDown) {
            //this.setAccelerationY(-200);
            this.y -= 4;
        }

        if (keyDown.isDown) {
            //this.setAccelerationY(200);
            this.y += 4;
        }

        if (keyLeft.isDown) {
            //this.setAccelerationX(-200);
            this.x -= 4;
        }

        if (keyRight.isDown) {
            //this.setAccelerationX(200);
            this.x += 4;
        }

        //dodging mechanic
        /*if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            //move player towards pointer
            this.physics.moveToObject(this, pointer, 10);
        }*/

        /*
        if (game.input.activePointer.leftButton.isDown) {
            shoot();
        }
        */

        /*
        shoot() {
            if (game.time.now > nextFire && bullets.countDead() > 0) {
                nextFire = game.time.now + fireRate;
                var bullet = bullets.getFirstDead();
                bullet.reset(sprite.x - 8, sprite.y - 8);
                game.physics.arcade.moveToPointer(bullet, 300);
            }
        }
        */
    }

    
}
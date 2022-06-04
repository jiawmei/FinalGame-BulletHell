class BulletGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: Bullet,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'bullets'
        })

        scene.physics.world.on('worldbounds', this.onWorldbounds, this);
    }

    onWorldbounds(body) {
        console.log("...");
    }

    fireBulletL(x, y, vX, vY) {
        const bullet = this.getFirstDead(false);
        if(bullet){
            bullet.fireL(x, y, vX, vY);
            bullet.setDisplaySize(30, 80);
            bullet.setSize(50, 20);
        }
    }

    fireBulletR(x, y, vX, vY) {
        const bullet = this.getFirstDead(false);
        if(bullet){
            bullet.fireR(x, y, vX, vY);
            bullet.setDisplaySize(30, 80);
            bullet.setSize(50, 20);
        }
    }

    fireBulletX(x, y, velocity) {
        const bullet = this.getFirstDead(false);
        if(bullet){
            bullet.fireX(x, y, velocity);
            bullet.setDisplaySize(30, 80);
            bullet.setSize(110, 15);
        }
    }

    fireBulletY(x, y, velocity){
        const bullet = this.getFirstDead(false);
        if(bullet){
            bullet.fireY(x, y, velocity);
            bullet.setDisplaySize(30, 80);
            bullet.setSize(15, 110);
        }
    }

}

class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullets');
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }

    fireL(x, y, vX, vY) {
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocity(vX, vY);
        if (this.angle != 135) {
            this.angle = 135;
        }
    }

    fireR(x, y, vX, vY) {
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocity(vX, vY);
        if (this.angle != 45) {
            this.angle = 45;
        }
    }

    fireX(x, y, velocity) {
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(velocity);
        if (this.angle != 90) {
            this.angle = 90;
        }
    }

    fireY(x, y, velocity){
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(velocity);
        if (this.angle != 0) {
            this.angle = 0;
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(this.y <= 0 || this.y >= 900 || this.x <= 0 || this.x >= 750){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
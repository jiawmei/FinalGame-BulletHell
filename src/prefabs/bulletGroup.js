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

    fireBulletX(x, y, velocity) {
        const bullet = this.getFirstDead(false);
        if(bullet){
            bullet.fireX(x, y, velocity);
        }
    }

    fireBulletY(x, y, velocity){
        const bullet = this.getFirstDead(false);
        if(bullet){
            bullet.fireY(x, y, velocity);
        }
    }

}

class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullets');
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }
    fireX(x, y, velocity) {
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(velocity);
    }

    fireY(x, y, velocity){
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(velocity);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(this.y <= 0 || this.y >= 900 || this.x <= 0 || this.x >= 750){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
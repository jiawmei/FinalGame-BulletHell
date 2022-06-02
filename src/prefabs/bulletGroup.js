class BulletGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: Bullet,
            frameQuantity: 3,
            active: false,
            visible: false,
            key: 'bullets'
        })

        scene.physics.world.on('worldbounds', this.onWorldbounds, this);
    }

    onWorldbounds(body) {
        console.log("...");
    }

    fireBullet(x,y){
        const bullet = this.getFirstDead(false);
        if(bullet){
            bullet.fire(x,y);
        }
    }

}

class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullets');
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }

    fire(x,y){
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-900);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(this.y <= 0){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
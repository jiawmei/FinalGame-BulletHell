class EnemyBulletGroup2 extends Phaser.Physics.Arcade.Group{
    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: EnemyBullet2,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'enemyBullets2'
        })
    }

    fireBullet(x,y){
        const bullet = this.getFirstDead(false);
        if(bullet){
            bullet.fire(x,y);
        }
    }

}

class EnemyBullet2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyBullets2');

        scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
    }

    fire(x,y){
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocity(600, Phaser.Math.Between(-250, 250));
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        if(this.y <= 0 || this.y >= 900 || this.x <= 0 || this.x >= 750){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
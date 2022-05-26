class EnemyBulletGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: EnemyBullet,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'enemyBullets'
        })
    }

    fireBullet(x,y){
        const bullet = this.getFirstDead(true);
        if(bullet){
            bullet.fire(x,y);
        }
    }

}

class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyBullets');
    }

    fire(x,y){
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(900);
    }

    update(){

        if(this.y <= 0){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
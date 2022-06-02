class EnemyGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: Enemy,
            frameQuantity: 5,
            active: false,
            visible: false,
            key: 'enemy'
        })
    }

    spawnEnemy() {
        /*
        const enemy = this.add(new Enemy(this.scene, Phaser.Math.Between(0, 750), 0, "enemy"));
        enemy.setVelocityY(500);
        */
        const enemy = this.getFirstDead(false);
        if(enemy){
            enemy.spawn(Phaser.Math.Between(0, 750), 0);
            enemy.setDisplaySize(75, 75);
            enemy.setSize(100, 100);
        }
    }

}


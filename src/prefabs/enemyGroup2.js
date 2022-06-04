class EnemyGroup2 extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: Enemy2,
            frameQuantity: 4,
            active: false,
            visible: false,
            key: 'enemy2'
        })
    }

    spawnEnemy() {
        const enemy = this.getFirstDead(false);
        if(enemy){
            enemy.spawn(0, Phaser.Math.Between(0, 950));
            enemy.setDisplaySize(60, 60);
            enemy.setSize(85, 85);
        }
    }
}
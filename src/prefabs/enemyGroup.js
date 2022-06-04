class EnemyGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: Enemy,
            frameQuantity: 4,
            active: false,
            visible: false,
            key: 'enemy'
        })
    }

    spawnEnemy() {
        const enemy = this.getFirstDead(false);
        if(enemy){
            enemy.spawn(Phaser.Math.Between(0, 750), 0);
            enemy.setDisplaySize(60, 60);
            enemy.setSize(100, 100);
        }
    }
}


class EnemyGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
    }

    spawnEnemy() {
        this.add(new Enemy(this.scene, Phaser.Math.Between(0, 750), 0, "char"));
        this.setVelocityY(500);
    }

}


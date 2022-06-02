class EnemyGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
    }

    spawnEnemy() {
        this.add(new Enemy(this.scene, 0, Phaser.Math.Between(0, 300), "char"));
        this.setVelocityX(300);
        
    }

    hitRight() {
        if(this.x >=750){
            this.setVelocityX(-300);
        }
    }
}


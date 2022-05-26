class LevelOne extends Phaser.Scene{
    constructor(){
        super("level1scene");
        this.bulletGroup;
    }

    preload(){
        this.load.audio('shoot', './assets/Shot4.mp3');
        this.load.image('tempback', './assets/BG5-01.png');
        this.load.image('char', './assets/placeholdercharacter.png');
        this.load.image('bullets', './assets/BulletsBlack1.png');
    }

    create(){
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'tempback').setOrigin(0, 0);
        this.bulletGroup = new BulletGroup(this);
        this.enemyGroup = new EnemyGroup(this);
        this.enemyBulletGroup = new EnemyBulletGroup(this);
        this.player = new Player(this,375, 800, 'char');
        this.physics.add.collider(this.player, this.enemyGroup, function(player) {
            
            player.gameOver = true;
        }); 
        this.physics.add.collider(this.player, this.enemyBulletGroup, function(player) {
            
            player.gameOver = true;
        }); 
        this.physics.add.collider(this.bulletGroup, this.enemyGroup, this.enemyHitEvent, null, this.scene);
        
        //this.enemy1 = new Enemy(this, 50, 0, 'char');
        //this.enemy2 = new Enemy(this, 125, -250, 'char');
        //this.enemy3 = new Enemy(this, 200, -150, 'char');
        //this.enemy4 = new Enemy(this, 275, -25, 'char');
        //this.enemy5 = new Enemy(this, 350, -300, 'char');
        //this.enemy6 = new Enemy(this, 425, -100, 'char');
        Phaser.Actions.Call(this.bulletGroup.getChildren(), function (bullet) {
            bullet.body.onWorldbounds = true;
        });
        Phaser.Actions.Call(this.enemyGroup.getChildren(), function (enemy) {
            enemy.body.onWorldbounds = true;
        });
        this.physics.world.on('worldbounds', this.onWorldbounds, this);
        

        this.player.setCollideWorldBounds(true);
        
        // keyobaord keycodes
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        
        // time to spawn enemies in
        this.enemyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.spawnEnemy,
            args: [this],
            callbackScope: this,
            loop: true
        });

        //timer for enemies shooting
        this.shootTimer = this.time.addEvent({
            delay: 500,
            callback: this.enemyShoot,
            args: [this.enemyGroup, this.enemyBulletGroup],
            callbackScope: this,
            loop: true
        });
        
        
    }

    //destroys bullet when they go off screen
    onWorldbounds(body) {

        const isBullet = this.bulletGroup.contains(body.gameObject);
        if (isBullet) {
            this.bulletGroup.onWorldbounds(body);
            body.gameObject.deactivate();
        }

        const isEnemyBullet = this.enemyBulletGroup.contains(body.gameObject);
        if (isEnemyBullet) {
            body.gameObject.deactivate();
        }

        const isEnemy = this.enemyGroup.contains(body.gameObject);
        if (isEnemy) {
            console.log("?");
            body.gameObject.destroy();
        }
    }

    //for each enemy on the screen shoot
    enemyShoot(enemyGroup, enemyBulletGroup) {
        enemyGroup.children.each(function(enemy) {
            if (enemy.active) {
                enemyBulletGroup.fireBullet(enemy.x, enemy.y);
            }
        })
    }

    //handling enemy/player bullet collision
    enemyHitEvent(bullet, enemy) {
        if (bullet.active && enemy.active) {
            bullet.destroy();
            enemy.destroy();
        }
    }

    
    
    spawnEnemy() {
        this.enemyGroup.spawnEnemy();
        /*
        this.enemy = new Enemy(this, Phaser.Math.Between(0, 750), 0, "char");
        
        //set enemy to fall
        this.enemy.setVelocityY(500);
        
        //when colliding with an player
        this.physics.add.collider(this.player, this.enemy, function(player) {
            
            player.gameOver = true;
        }); 

        // enemy collision (NEEDS FIXING)
        /*this.physics.add.collider(this.bulletGroup, this.enemy, function() {
            this.enemy.destroy();
        });
        */
        //change the timing of enemy spawns
        this.enemyTimer.reset({
            delay: Phaser.Math.Between(100, 500),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
        
    }
    
    shootBullet(){
        this.bulletGroup.fireBullet(this.player.x, this.player.y - 20);
    }

    update(){
        // change background later
        this.background.tilePositionY += 1;

        this.player.update();
        //this.enemyGroup.shootPlayer(this.player.x, this.player.y);
        //this.enemyGroup.spawnEnemy();
        //this.enemy1.update();
        //this.enemy2.update();
        //this.enemy3.update();
        //this.enemy4.update();
        //this.enemy5.update();
        //this.enemy6.update();

        // firing sound, no firing yet
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.shootBullet();
            this.sound.play('shoot', {volume:0.1});
            
        }
        // if you get hit go back to title
        if(this.player.gameOver){
            this.scene.start("titleScene");
        }
    }
}
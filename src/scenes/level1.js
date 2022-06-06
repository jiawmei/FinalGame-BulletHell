class LevelOne extends Phaser.Scene{
    constructor(){
        super("level1scene");
    }

    preload(){
        this.load.audio('shoot', './assets/shot3.mp3');
        this.load.image('tempback', './assets/BG5-01.png');
        this.load.image('char', './assets/character100.png');
        this.load.image('bullets', './assets/AttackPink.png');
        this.load.image('enemy', './assets/Enemies.png');
        this.load.image('enemy2', './assets/GearEnemies.png');
        this.load.image('enemy3', './assets/Series5Enemies.png');
        this.load.image('enemyBullets', './assets/Circle.png');
        this.load.image('enemyBullets2', './assets/RedGear.png');
        this.load.image('enemyBullets3', './assets/YellowGreen.png');
        this.load.image('placeholder', './assets/placeholdercharacter.png');
    }

    create(){
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'tempback').setOrigin(0, 0);
        this.bulletGroup = new BulletGroup(this);
        this.enemyGroup = new EnemyGroup(this);
        this.enemyBulletGroup = new EnemyBulletGroup(this);
        this.player = new Player(this, 375, 800, 'char');
        this.player.setSize(40, 90);
        this.end = new Book (this, 375, 200, 'placeholder');

        //collision for object to move to next level
        this.physics.add.overlap(this.player, this.end, (end)=>{
            this.bgm1.stop();
            this.scene.start('level2scene');
        });
        this.end.body.enable = false;
        
        //score
        this.score = 0;

        //set bullet size
        this.enemyBulletGroup.children.iterate(function(bullet) {
            bullet.setDisplaySize(25, 25);
            bullet.setSize(30, 30);
        })
    
        this.physics.add.collider(this.player, this.enemyGroup, function(player) {
            
            player.gameOver = true;
        }); 
        //enemy collision
        this.physics.add.collider(this.player, this.enemyBulletGroup, function(player) {
            player.gameOver = true;
        }); 
        this.physics.add.collider(this.bulletGroup, this.enemyGroup, (bullet, enemy)=> {
            if (bullet.active && enemy.active) {
                bullet.setActive(false);
                bullet.setVisible(false);
                enemy.setActive(false);
                enemy.setVisible(false);
                this.score += 1;
                console.log(this.score);
            }
        }, null, this.scene);
        
        // keyboard keycodes
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.bgm1 = this.sound.add('bgm1', {volume:0.1});
        this.bgm1.setLoop(true);
        if(!this.bgm1.isPlaying) {
            this.bgm1.play();
        }
        
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
            delay: 750,
            callback: this.enemyShoot,
            args: [this.enemyGroup, this.enemyBulletGroup],
            callbackScope: this,
            loop: true
        });        
        
    }

    //for each enemy on the screen shoot
    enemyShoot(enemyGroup, enemyBulletGroup) {
        enemyGroup.children.each(function(enemy) {
            if (enemy.active) {
                enemyBulletGroup.fireBullet(enemy.x, enemy.y);
            }
        })
    }
    
    //spawn the enemy
    spawnEnemy() {
        this.enemyGroup.spawnEnemy();
       
        //change the timing of enemy spawns
        this.enemyTimer.reset({
            delay: Phaser.Math.Between(100, 500),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
        
    }
    
    //player shoot
    shootBullet(){
        this.bulletGroup.fireBulletY(this.player.x, this.player.y - 20, -900);
    }

    update(){
        this.background.tilePositionY -= 3;
        //after killing x amount of enemies move to next level
        if (this.score >= 20) {
            this.end.setVisible(true);
            this.end.body.enable = true;
            this.enemyTimer.remove();
            this.shootTimer.remove();
            this.scene.start('level2scene');
            this.bgm1.stop();
        }

        this.player.update();

        //out of bounds detection
        this.enemyGroup.children.iterate(function(enemy) {
            if (enemy.y >= 900) {
                enemy.setActive(false);
                enemy.setVisible(false);
            }
        });
        
        // fires a bullet
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.shootBullet();
            this.sound.play('shoot', {volume:0.1});
            
        }
        // if you get hit go back to title
        if(this.player.gameOver){
            this.bgm1.stop();
            this.scene.start("level1scene");
        }
    }
}
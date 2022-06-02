class LevelOne extends Phaser.Scene{
    constructor(){
        super("level1scene");
    }

    preload(){
        this.load.audio('shoot', './assets/Shot4.mp3');
        this.load.image('tempback', './assets/BG5-01.png');
        this.load.image('char', './assets/character100.png');
        this.load.image('bullets', './assets/BulletsBlack1.png');
        this.load.image('enemy', './assets/Enemies.png');
        this.load.image('enemyBullets', './assets/Circle.png');
        this.load.image('placeholder', './assets/placeholdercharacter.png');
    }

    create(){
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'tempback').setOrigin(0, 0);
        this.bulletGroup = new BulletGroup(this);
        this.enemyGroup = new EnemyGroup(this);
        this.enemyBulletGroup = new EnemyBulletGroup(this);
        this.player = new Player(this, 375, 800, 'char');
        this.player.setSize(50, 100);
        //this.end = new Book(this, 375, 200, 'char');

        this.enemyBulletGroup.children.iterate(function(bullet) {
            bullet.setDisplaySize(25, 25);
            bullet.setSize(20, 20);
        })
    
        this.physics.add.collider(this.player, this.enemyGroup, function(player) {
            
            player.gameOver = true;
        }); 
        this.physics.add.collider(this.player, this.enemyBulletGroup, function(player) {
            
            player.gameOver = true;
        }); 
        this.physics.add.collider(this.bulletGroup, this.enemyGroup, this.enemyHitEvent, null, this.scene);
        
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

    
        //pick it up to move to next level
        this.endTimer = this.time.addEvent({
            delay: 500,
            callback: ()=> {
                this.end = new Book (this, 375, 200, 'placeholder');
                this.physics.add.overlap(this.player, this.end, ()=>{
                    this.scene.start('level2scene');
                })
            },
            callbackScope: this
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

    //handling enemy/player bullet collision
    enemyHitEvent(bullet, enemy) {
        if (bullet.active && enemy.active) {
            bullet.setActive(false);
            bullet.setVisible(false);
            enemy.setActive(false);
            enemy.setVisible(false);
        }
    }

    
    
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
    
    shootBullet(){
        this.bulletGroup.fireBullet(this.player.x, this.player.y - 20);
    }

    update(){
        // change background later
        //this.background.tilePositionY += 1;

        this.player.update();

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
            this.scene.start("titleScene");
        }
        this.enemyGroup.hitRight();
    }
}
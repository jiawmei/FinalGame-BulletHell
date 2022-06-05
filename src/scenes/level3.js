class LevelThree extends Phaser.Scene{
    constructor(){
        super("level3scene");
    }

    preload(){
        this.load.image('back3', './assets/BG3-01.png');
    }


    create(){
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'back3').setOrigin(0, 0);
        this.bulletGroup = new BulletGroup(this);
        this.enemyGroup = new EnemyGroup(this);
        this.enemyBulletGroup = new EnemyBulletGroup(this);
        this.enemyGroup2 = new EnemyGroup2(this);
        this.enemyBulletGroup2 = new EnemyBulletGroup2(this);
        this.enemyGroup3 = new EnemyGroup3(this);
        this.enemyBulletGroup3 = new EnemyBulletGroup3(this);
        this.player = new Player(this, 375, 800, 'char');
        this.player.setSize(50, 100);
        this.end = new Book (this, 375, 200, 'placeholder');

        //next level collider
        this.physics.add.overlap(this.player, this.end, (end)=>{
            this.bgm3.stop();
            //this.scene.start('level3scene');
        });
        this.end.body.enable = false;
        
        //amount of enemies killed
        this.score = 0;

        //sets the bullet sizes
        this.enemyBulletGroup.children.iterate(function(bullet) {
            bullet.setDisplaySize(25, 25);
            bullet.setSize(20, 20);
        });
        this.enemyBulletGroup2.children.iterate(function(bullet) {
            bullet.setDisplaySize(25, 25);
            bullet.setSize(30, 30);
        });
        this.enemyBulletGroup3.children.iterate(function(bullet) {
            bullet.setDisplaySize(25, 25);
            bullet.setSize(30, 30);
        });
    
        //player collision
        this.physics.add.collider(this.player, this.enemyBulletGroup, function(player) {
            
            player.gameOver = true;
        }); 

        //bullet collision
        this.physics.add.collider(this.bulletGroup, this.enemyGroup, (bullet, enemy)=> {
            if (bullet.active && enemy.active) {
                bullet.setActive(false);
                bullet.setVisible(false);
                enemy.setActive(false);
                enemy.setVisible(false);
                this.score += 1;
            }
        }, null, this.scene);  

        this.physics.add.collider(this.bulletGroup, this.enemyGroup2, (bullet, enemy)=> {
            if (bullet.active && enemy.active) {
                bullet.setActive(false);
                bullet.setVisible(false);
                enemy.setActive(false);
                enemy.setVisible(false);
                this.score += 1;
            }
        }, null, this.scene); 

        this.physics.add.collider(this.bulletGroup, this.enemyGroup3, (bullet, enemy)=> {
            if (bullet.active && enemy.active) {
                bullet.setActive(false);
                bullet.setVisible(false);
                enemy.setActive(false);
                enemy.setVisible(false);
                this.score += 1;
            }
        }, null, this.scene); 
        
        // keyboard keycodes
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.bgm3 = this.sound.add('bgm3', {volume:0.1});
        this.bgm3.setLoop(true);
        if(!this.bgm3.isPlaying) {
            this.bgm3.play();
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

        //timer for enemies shooting
        this.shootTimer = this.time.addEvent({
            delay: 750,
            callback: this.enemyShoot,
            args: [this.enemyGroup2, this.enemyBulletGroup2],
            callbackScope: this,
            loop: true
        }); 

        //timer for enemies shooting
        this.shootTimer = this.time.addEvent({
            delay: 750,
            callback: this.enemyShoot,
            args: [this.enemyGroup3, this.enemyBulletGroup3],
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

    //handling enemy/player bullet collision
    enemyHitEvent(bullet, enemy) {
        if (bullet.active && enemy.active) {
            bullet.setActive(false);
            bullet.setVisible(false);
            enemy.setActive(false);
            enemy.setVisible(false);
        }
    }
    
    //spawns the enemy
    spawnEnemy() {
        this.enemyGroup.spawnEnemy();
        this.enemyGroup2.spawnEnemy();
        this.enemyGroup3.spawnEnemy();
       
        //change the timing of enemy spawns
        this.enemyTimer.reset({
            delay: Phaser.Math.Between(100, 500),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
        
    }
    
    //player shooting function
    shootBullet(){
        this.bulletGroup.fireBulletR(this.player.x + 20, this.player.y - 20, 900, -900);
        this.bulletGroup.fireBulletL(this.player.x + 20, this.player.y + 20, 900, 900);
        this.bulletGroup.fireBulletL(this.player.x - 20, this.player.y - 20, -900, -900);
        this.bulletGroup.fireBulletR(this.player.x - 20, this.player.y + 20, -900, 900);
        this.bulletGroup.fireBulletX(this.player.x - 20, this.player.y - 20, -900);
        this.bulletGroup.fireBulletX(this.player.x + 20, this.player.y - 20, 900);
        this.bulletGroup.fireBulletY(this.player.x, this.player.y - 20, -900);
        this.bulletGroup.fireBulletY(this.player.x, this.player.y + 20, 900);
    }

    update(){

        //after killing x amount of enemies
        if (this.score >= 60) {
            this.end.setVisible(true);
            this.end.body.enable = true;
            this.enemyTimer.remove();
            this.shootTimer.remove();
            this.bgm3.stop();
        }

        this.player.update();

        //out of bounds detection
        this.enemyGroup.children.iterate(function(enemy) {
            if (enemy.y >= 900) {
                enemy.setActive(false);
                enemy.setVisible(false);
            }
        });

        this.enemyGroup2.children.iterate(function(enemy) {
            if (enemy.x >= 750) {
                enemy.setActive(false);
                enemy.setVisible(false);
            }
        });

        this.enemyGroup3.children.iterate(function(enemy) {
            if (enemy.x <= 0) {
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
            this.bgm3.stop();
            this.scene.start("titleScene");
        }
    }
}
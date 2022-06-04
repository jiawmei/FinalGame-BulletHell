class LevelTwo extends Phaser.Scene{
    constructor(){
        super("level2scene");
    }

    preload(){
        this.load.image('back2', './assets/BG-1-01.png');
    }


    create(){
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'back2').setOrigin(0, 0);
        this.bulletGroup = new BulletGroup(this);
        this.enemyGroup = new EnemyGroup(this);
        this.enemyBulletGroup = new EnemyBulletGroup(this);
        this.enemyGroup2 = new EnemyGroup2(this);
        this.enemyBulletGroup2 = new EnemyBulletGroup2(this);
        this.player = new Player(this, 375, 800, 'char');
        this.player.setSize(50, 100);
        this.end = new Book (this, 375, 200, 'placeholder');

        //collision for next level
        this.physics.add.overlap(this.player, this.end, (end)=>{
            this.bgm2.stop();
            this.scene.start('level3scene');
        });
        this.end.body.enable = false;
        
        //score
        this.score = 0;

        //set bullet size
        this.enemyBulletGroup.children.iterate(function(bullet) {
            bullet.setDisplaySize(25, 25);
            bullet.setSize(20, 20);
        })
        this.enemyBulletGroup2.children.iterate(function(bullet) {
            bullet.setDisplaySize(25, 25);
            bullet.setSize(30, 30);
        })
    
        //player collsion
        this.physics.add.collider(this.player, this.enemyBulletGroup, function(player) {
            
            player.gameOver = true;
        }); 
        this.physics.add.collider(this.player, this.enemyBulletGroup2, function(player) {
            
            player.gameOver = true;
        }); 
        
        //enemy collision
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
        
        // keyboard keycodes
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.bgm2 = this.sound.add('bgm3', {volume:0.1});
        this.bgm2.setLoop(true);
        if(!this.bgm2.isPlaying) {
            this.bgm2.play();
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
        this.enemyGroup2.spawnEnemy();
       
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
        this.bulletGroup.fireBulletX(this.player.x - 20, this.player.y - 20, -900);
        this.bulletGroup.fireBulletX(this.player.x + 20, this.player.y - 20, 900);
        this.bulletGroup.fireBulletY(this.player.x, this.player.y - 20, -900);
        this.bulletGroup.fireBulletY(this.player.x, this.player.y + 20, 900);
    }

    update(){

        //after killing x amount of enemies move to next stage
        if (this.score >= 40) {
            this.end.setVisible(true);
            this.end.body.enable = true;
            this.enemyTimer.remove();
            this.shootTimer.remove();
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
        
        // fires a bullet
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
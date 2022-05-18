class LevelOne extends Phaser.Scene{
    constructor(){
        super("level1scene");
    }

    preload(){
        this.load.audio('shoot', './assets/Shot4.mp3');
        this.load.image('tempback', './assets/BG5-01.png');
        this.load.image('char', './assets/placeholdercharacter.png')
    }

    create(){
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'tempback').setOrigin(0, 0);
        this.player = new Player(this,375, 800, 'char');
        //this.enemy1 = new Enemy(this, 50, 0, 'char');
        //this.enemy2 = new Enemy(this, 125, -250, 'char');
        //this.enemy3 = new Enemy(this, 200, -150, 'char');
        //this.enemy4 = new Enemy(this, 275, -25, 'char');
        //this.enemy5 = new Enemy(this, 350, -300, 'char');
        //this.enemy6 = new Enemy(this, 425, -100, 'char');
        
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
    }
    spawnEnemy() {
        this.enemy = new Enemy(this, Phaser.Math.Between(0, 750), 0, "char");
        
        //set enemy to fall
        this.enemy.setVelocityY(500);
        
        //when colliding with an arrow
        this.physics.add.collider(this.player, this.enemy, function(player) {
            
            player.gameOver = true;
        }); 
        //change the timing of enemy spawns
        this.enemyTimer.reset({
            delay: Phaser.Math.Between(100, 500),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
    }


    update(){
        // change background later
        this.background.tilePositionY += 1;
        
        this.player.update();
        //this.enemy1.update();
        //this.enemy2.update();
        //this.enemy3.update();
        //this.enemy4.update();
        //this.enemy5.update();
        //this.enemy6.update();
        
        // firing sound, no firing yet
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.sound.play('shoot', {volume:0.1});
            
        }
        // if you get hit go back to title
        if(this.player.gameOver){
            this.scene.start("titleScene");
        }
    }
}
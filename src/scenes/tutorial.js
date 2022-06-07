class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialscene");
    }

    preload(){
        this.load.audio('shoot', './assets/shot3.mp3');
        this.load.image('background', './assets/BG-1-01.png');
        this.load.image('char', './assets/character100.png');
        this.load.image('bullets', './assets/AttackPink.png');
        this.load.image('enemy', './assets/Enemies.png');
        this.load.image('enemy2', './assets/GearEnemies.png');
        this.load.image('enemy3', './assets/Series5Enemies.png');
        this.load.image('enemyBullets', './assets/Circle.png');
        this.load.image('enemyBullets2', './assets/Redgear.png');
        this.load.image('enemyBullets3', './assets/YellowGreen.png');
        this.load.image('placeholder', './assets/placeholdercharacter.png');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#964B00',
            align: 'middle',
            fixedWidth: 0
        }
        
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0,0);
        this.bulletGroup = new BulletGroup(this);
        
        this.enemy1 = this.add.sprite(200, 270, 'enemy').setScale(0.2);
        this.enemy2 = this.add.sprite(350, 270, 'enemy2').setScale(0.2);
        this.enemy2 = this.add.sprite(500, 270, 'enemy3').setScale(0.2);
        //enemy1.setScale(0.5);
        
        
        // keyboard controls
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // create the player
        this.player = new Player(this, 375, 800, 'char');
        this.player.setSize(40, 90);


        // tutorial text
        this.line1 = this.add.text(175, 100, "Use the arrow keys to move", menuConfig).setOrigin(0);
        this.line2 = this.add.text(175, 150, "Press the Spacebar to fire", menuConfig).setOrigin(0);
        this.line3 = this.add.text(180, 200, "These are the enemies", menuConfig).setOrigin(0);
        this.line4 = this.add.text(150, 325, "Getting hit will cause you to lose", menuConfig).setOrigin(0);
        this.line5 = this.add.text(150, 375, "Defeat the enemies by firing at them", menuConfig).setOrigin(0);
        this.line6 = this.add.text(275, 500, "Press A to Start", menuConfig).setOrigin(0);  
    }

    shootBullet(){
        this.bulletGroup.fireBulletY(this.player.x, this.player.y - 20, -900);
    }
    update(){
        this.player.update();
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            this.scene.start("level1scene");
            //this.scene.start("level3scene");
        }
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.shootBullet();
            this.sound.play('shoot', {volume:0.1});
            
        }
        
    }
}
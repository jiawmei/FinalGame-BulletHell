class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialscene");
    }

    preload(){
        this.load.audio('shoot', './assets/Shot3.mp3');
        this.load.image('background', './assets/white.jpg');
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
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#000000',
            align: 'right',
            fixedWidth: 0
        }
        
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0,0);
        
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

        this.line1 = this.add.text(250, 100, "This is Elira", menuConfig).setOrigin(0);
        this.line2 = this.add.text(250, 100, "She is lost", menuConfig).setOrigin(0);
        
    }


    update(){
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            this.scene.start("level1scene");
        }
        this.player.update();
    }
}
class Start extends Phaser.Scene{
    constructor(){
        super("titleScene");
    }

    preload(){
        this.load.audio('bgm3', './assets/bgm1-skyward.mp3');
        this.load.audio('bgm2', './assets/bgm2-formation.mp3');
        this.load.audio('bgm1', './assets/3R2 - Pancake is Love.mp3');
        this.load.image('title', './assets/Title Page-01.png');
    }

    create(){
        //some temp menu config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }
        
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'title').setOrigin(0, 0);

        // basic instructions on how to play
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        /*this.add.text(200, 300, "Arrow keys to move",menuConfig).setOrigin(0);
        this.add.text(100, 350, "Space to fire(only sound currently)",menuConfig).setOrigin(0);*/
        this.add.text(250, 600, "Press A to start",menuConfig).setOrigin(0);
        //this.add.text(200, 450, "Collision is also bugged",menuConfig).setOrigin(0);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            this.scene.start("tutorialscene");
            //this.scene.start('creditsscene');
        }
    }
}
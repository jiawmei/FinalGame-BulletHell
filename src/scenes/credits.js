class Credits extends Phaser.Scene{
    constructor(){
        super("creditsscene");
    }

    preload(){
        this.load.image('credits', './assets/CreditScenes-01.png');
    }
    create(){
        //this.add.text(300, 300, "Credits").setOrigin(0);
        
        this.background = this.add.tileSprite(0,0, config.width, config.height, 'credits').setOrigin(0,0);
    
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            this.game.sound.stopAll();
            this.scene.start("titleScene");
            
        }
    }
}
class Ending extends Phaser.Scene{
    constructor(){
        super("endscene");
    }
    preload(){
        this.load.image('end', './assets/EndScenes-01.png');
    }
    
    create(){
        //this.add.text(300, 300, "The End").setOrigin(0);
        this.background = this.add.tileSprite(0,0, config.width, config.height, 'end').setOrigin(0,0);
        
        
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyC)){
            this.scene.start("creditsscene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("titleScene");
        }
    }
}
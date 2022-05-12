class Start extends Phaser.Scene{
    constructor(){
        super("titleScene");
    }

    preload(){
        this.load.audio('shoot', './assets/Shot4.mp3');
    }

    create(){
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.sound.play('shoot', {volume:0.1});
            
        }
    }
}
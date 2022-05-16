class Start extends Phaser.Scene{
    constructor(){
        super("titleScene");
    }

    preload(){

    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 0
        }
        
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.add.text(200, 300, "Arrow keys to move",menuConfig).setOrigin(0);
        this.add.text(100, 350, "Space to fire(only sound currently)",menuConfig).setOrigin(0);
        this.add.text(200, 400, "Press A to start",menuConfig).setOrigin(0);
        this.add.text(200, 450, "Collision is also bugged",menuConfig).setOrigin(0);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            this.scene.start("level1scene")
        }
    }
}
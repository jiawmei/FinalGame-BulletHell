class Credits extends Phaser.Scene{
    constructor(){
        super("creditsscene");
    }
    create(){
        this.add.text(300, 300, "Credits").setOrigin(0);
    }
}
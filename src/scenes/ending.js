class Ending extends Phaser.Scene{
    constructor(){
        super("endscene");
    }
    create(){
        this.add.text(300, 300, "The End").setOrigin(0);
    }
}
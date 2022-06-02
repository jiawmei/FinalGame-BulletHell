let config = {
    type: Phaser.CANVAS,
    width: 750,
    height: 900, 
    scene: [ Start , LevelOne , LevelTwo, LevelThree],
    //display: block,
    //margin: auto,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }
    
}

let game = new Phaser.Game(config);

let keyUp, keyDown, keyLeft, keyRight, keySpace, keyMouse1, keyA;
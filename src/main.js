let config = {
    type: Phaser.CANVAS,
    width: 750,
    height: 900, 
    scene: [ Start , Tutorial, LevelOne , LevelTwo, LevelThree, Ending, Credits],
    //display: block,
    //margin: auto,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
    
}

let game = new Phaser.Game(config);

let keyUp, keyDown, keyLeft, keyRight, keySpace, keyMouse1, keyA, keyS, keyM, keyC;
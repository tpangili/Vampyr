// Thurmann Pangilinan
// Vampyr
// project

// more strict about accuracy
'use strict';

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 780,
    fps: {
        target: 60,
        forceSetTimeOut: false
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            },
            fps: 60
        }
    },
    scene: [ Load, Menu, Scene1, Scene2, Scene3, Credits ]
}

// create game object
let game = new Phaser.Game(config);
// reserve keyboard names
let keySpace, keyH, keyC, keyM, keyA, keyD;
// miscellaneous variables for future scenes
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const playerWidth = 48;
const playerHeight = 48;
let cursors;
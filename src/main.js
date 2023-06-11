// Thurmann Pangilinan
// Movie Adapted: Vampyr
//
// Major Phaser Components Used:
// - Physics system
// - Camera
// - Tilemaps
// - Timer
// - Animation Manager

// more strict about accuracy
'use strict';

let config = {
    type: Phaser.CANVAS,
    width: 768,
    height: 768,
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
    scene: [ Load, Menu, Scene1, Scene2 ]
}

// create game object
let game = new Phaser.Game(config);
// reserve keyboard names
let keyC, key1, key2, key3;
// miscellaneous variables for future scenes
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const playerWidth = 32;
const playerHeight = 32;
let cursors;
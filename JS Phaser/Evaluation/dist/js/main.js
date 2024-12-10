import Menu from "./scenes/menu.js";
import Game from "./scenes/game.js";
import End from "./scenes/end.js";

window.config = {
    type: Phaser.AUTO,
    scene: [Menu, Game, End],
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_BOTH,  
        width: 1024,
        height: 576
    }
};

const game = new Phaser.Game(window.config);
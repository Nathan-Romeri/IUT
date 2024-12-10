import Menu from "./scenes/menu.js";
import Game from "./scenes/game.js";
import End from "./scenes/end.js";

window.config = {
    width: window.innerWidth / 1.5,
    height: window.innerHeight,
    type: Phaser.AUTO,
    scene: [Menu, Game, End],
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: false
        }
    },
};

const game = new Phaser.Game(window.config);
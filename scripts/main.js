import {MainMenuScene} from './scenes/MainMenuScene.js';
import {GameScene} from './scenes/GameScene.js';
import {GameOverScene} from './scenes/GameOverScene.js';
import { BootScene } from './scenes/BootScene.js';
import { ShipSelectionScene } from './scenes/ShipSelectionScene.js';



var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [BootScene, MainMenuScene, ShipSelectionScene, GameScene, GameOverScene]
};

var game = new Phaser.Game(config);

game.scene.start('BootScene');
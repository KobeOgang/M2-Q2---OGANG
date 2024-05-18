export class ShipSelectionScene extends Phaser.Scene {
    constructor() {
        super('ShipSelectionScene');
    }

    preload() {
        this.load.image('shipBlue', '../assets/images/shipBlue.png');
        this.load.image('shipRed', '../assets/images/shipRed.png');
        this.load.image('shipGreen', '../assets/images/shipGreen.png');
    }

    create() {
        //Background
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'space');
        this.background.setOrigin(0, 0);

        //Select
        this.add.image(this.sys.game.config.width / 2, 100, 'selectShip').setOrigin(0.5);

        //Ship options
        const shipBlue = this.add.image(300, 300, 'shipBlue').setScale(0.5).setInteractive();
        const shipRed = this.add.image(500, 300, 'shipRed').setScale(0.5).setInteractive();
        const shipGreen = this.add.image(700, 300, 'shipGreen').setScale(0.5).setInteractive();

        //Ship selection
        shipBlue.on('pointerup', () => this.selectShip('shipBlue'));
        shipRed.on('pointerup', () => this.selectShip('shipRed'));
        shipGreen.on('pointerup', () => this.selectShip('shipGreen'));
    }

    selectShip(ship) {
        //get scene
        const mainMenuScene = this.scene.get('MainMenuScene');
        mainMenuScene.menuMusic.stop();
        
        //get selected ship
        this.registry.set('selectedShip', ship);
        this.scene.start('GameScene');
    }

    update(){
        this.background.tilePositionY -= 3.4;
    }
}

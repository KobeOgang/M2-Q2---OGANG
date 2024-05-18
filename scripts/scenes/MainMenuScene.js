export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    preload() {
        this.load.image('space', '../assets/images/space.jpg');
        this.load.image('title', '../assets/images/title.png');
        this.load.image('play', '../assets/images/play.png');
        this.load.image('exit', '../assets/images/exit.png');
        this.load.image('reset', '../assets/images/reset.png');
        this.load.image('menu', '../assets/images/menu.png');
        this.load.image('selectShip', '../assets/images/selectShip.png');
        this.load.image('gameOver', '../assets/images/gameOver.png');
        this.load.audio('menuMusic', '../assets/music/menuMusic.ogg');
        this.load.audio('gameMusic', '../assets/music/gameMusic.mp3');  
        this.load.audio('shoot', '../assets/sound/shoot.ogg'); 
        this.load.audio('explosion1', '../assets/sound/explosion1.ogg'); 
        this.load.audio('explosion2', '../assets/sound/explosion2.ogg'); 
        this.load.audio('explosion3', '../assets/sound/explosion3.ogg'); 
        this.load.audio('reload', '../assets/sound/reload.ogg');
        this.load.audio('gameOver', '../assets/sound/gameOver.ogg');
        this.load.image('shipBlue', '../assets/images/shipBlue.png');
        this.load.image('shipRed', '../assets/images/shipRed.png');
        this.load.image('shipGreen', '../assets/images/shipGreen.png');
    }

    create() {

        //Music
        this.menuMusic = this.sound.add('menuMusic', { volume: 0.3 });
        this.menuMusic.play();

        //Background
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'space');
        this.background.setOrigin(0, 0);

        //title
        const title = this.add.image(50, 50, 'title').setOrigin(0);

        //Center
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        //Play
        const playButton = this.add.image(centerX, 300, 'play');
        playButton.setOrigin(0.5);
        playButton.setScale(0.5);
        playButton.setInteractive();
        playButton.on('pointerup', () => {
            this.scene.start('ShipSelectionScene');
        });

        //Quit
        const quitButton = this.add.image(centerX, 450, 'exit');
        quitButton.setOrigin(0.5);
        quitButton.setScale(0.5);
        quitButton.setInteractive();
        quitButton.on('pointerup', () => {
            this.quitGame();
        });
    }

    quitGame() {
        alert('You exited the game.');
    }
    
    update() {
        this.background.tilePositionY -= 3.4;
    }
}

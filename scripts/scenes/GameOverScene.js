export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.finalScore = data.score;
        this.timeSurvived = data.timeSurvived;
    }

    create() {
        //Sound
        this.gameOver = this.sound.add('gameOver');
        this.gameOver.play();

        //Background
        var space = this.add.image(0, 0, 'space');
        space.setOrigin(0, 0);
        space.setScale(this.sys.game.config.width / space.width, this.sys.game.config.height / space.height);

        //Game Over text
        const gameOverText = this.add.image(this.sys.game.config.width / 2, 130, 'gameOver'); 

        //Score text
        const scoreText = this.add.text(this.sys.game.config.width / 2, 200, `Score: ${this.finalScore}`, {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        scoreText.setOrigin(0.5);

        //Time survived text
        const timeText = this.add.text(this.sys.game.config.width / 2, 250, `Time Survived: ${this.timeSurvived}s`, {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        timeText.setOrigin(0.5);

        //Retry button
        const retryButton = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 100, 'reset');
        retryButton.setScale(0.3);
        retryButton.setInteractive();
        retryButton.on('pointerup', () => {
            this.scene.start('GameScene');
        });

        //Main Menu button
        const menuButton = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 210, 'menu');
        menuButton.setScale(0.4);
        menuButton.setInteractive();
        menuButton.on('pointerup', () => {
            this.scene.start('MainMenuScene');
        });
    }
}

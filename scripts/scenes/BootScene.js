export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('loading', '../assets/images/loading.png');
    }

    create() {
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        //Loading text
        const loading = this.add.image(centerX, centerY, 'loading').setOrigin(0.5);

        //Click start for bypassing audio bug
        this.time.delayedCall(3000, () => {
            const startText = this.add.text(centerX, centerY + 100, 'Click to start', {
                fontSize: '32px',
                fill: '#fff'
            }).setOrigin(0.5);

            this.input.once('pointerdown', () => {
                this.scene.start('MainMenuScene');
            });
        });
    }
}
export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('asteroid', '../assets/images/asteroid.png');
        this.load.image('spaceship', '../assets/images/spaceship.png');
        this.load.image('projectile', '../assets/images/projectile.png'); 
    }

    create() {
        // Music
        this.gameMusic = this.sound.add('gameMusic', { volume: 0.3 });
        this.gameMusic.play();

        //SFX
        this.explosionSounds = [
            this.sound.add('explosion1', { volume: 0.7 }),
            this.sound.add('explosion2', { volume: 0.7 }),
            this.sound.add('explosion3', { volume: 0.7 })
        ];
        this.shoot = this.sound.add('shoot', { volume: 0.5 });
        this.reload = this.sound.add('reload', { volume: 0.5 });

        //Background
        this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'space');
        this.background.setOrigin(0, 0);

        //Selected ship
        const selectedShip = this.registry.get('selectedShip') || 'shipBlue';

        //Player
        this.player = this.physics.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height - 80, selectedShip);
        this.player.setScale(0.5);
        this.player.setCollideWorldBounds(true);

        //Projectiles
        this.projectiles = this.physics.add.group({
            defaultKey: 'projectile',
            maxSize: 10
        });

        //Asteroids
        this.asteroids = this.physics.add.group();

        //Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Colliders
        this.physics.add.overlap(this.projectiles, this.asteroids, this.hitAsteroid, null, this);
        this.physics.add.overlap(this.player, this.asteroids, this.GameOver, null, this);

        // Spawn asteroids
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnAsteroid,
            callbackScope: this,
            loop: true
        });

        //reloading
        this.shotsFired = 0;
        this.reloading = false;
        this.reloadText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Reloading...', {
            fontSize: '32px',
            fill: '#ff0000',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.reloadText.setOrigin(0.5);
        this.reloadText.setDepth(1);
        this.reloadText.setVisible(false);

        //Score
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
        });
        this.scoreText.setDepth(1);

        //Timer
        this.startTime = Date.now();

        //Difficulty progression
        this.difficultyFactor = 1;
        this.time.addEvent({
            delay: 4000,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        //Background scrolling
        this.background.tilePositionY -= 0.4; 

        //Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-260);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(260);
        } else {
            this.player.setVelocityX(0);
        }

        //Shoot projectile
        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && !this.reloading) {
            this.shootProjectile();
        }

        //Out of bounds management
        this.asteroids.children.iterate((asteroid) => {
            if (asteroid && asteroid.y > 800) {
                asteroid.destroy();
            }
        });
  
        this.projectiles.children.iterate((projectile) => {
            if (projectile && projectile.y < 0) {
                this.projectiles.killAndHide(projectile);
                projectile.body.enable = false;
            }
        });
    }

    shootProjectile() {
        if (this.shotsFired < 5) {
            var projectile = this.projectiles.get(this.player.x, this.player.y - 20);

            if (projectile) {
                projectile.setActive(true);
                projectile.setVisible(true);
                projectile.setScale(0.2);
                projectile.body.enable = true;
                projectile.body.velocity.y = -500;
                this.shotsFired++;
                this.shoot.play();
            }
        }

        if (this.shotsFired >= 5) {
            this.startReloading();
        }
    }

    startReloading() {
        this.reloading = true;
        this.reloadText.setVisible(true);
        this.reload.play();

        this.time.delayedCall(3000, () => {
            this.shotsFired = 0;
            this.reloading = false;
            this.reloadText.setVisible(false);
        }, [], this);
    }

    spawnAsteroid() {
        var x = Phaser.Math.Between(0, 1000);
        var asteroid = this.asteroids.create(x, -200, 'asteroid');
        asteroid.setVelocityY(100 * this.difficultyFactor);
        asteroid.setScale(Phaser.Math.FloatBetween(0.05, 0.3));
        asteroid.setCollideWorldBounds(false);
    }

    hitAsteroid(projectile, asteroid) {
        this.projectiles.killAndHide(projectile);
        projectile.body.enable = false;
        asteroid.destroy();
        var randomExplosionSound = Phaser.Math.RND.pick(this.explosionSounds);
        randomExplosionSound.play();

        //Scoring
        this.score += 100;
        this.scoreText.setText('Score: ' + this.score);
    }

    GameOver(player, asteroid) {
        this.gameMusic.stop();
        this.reload.stop();
        this.scene.start('GameOverScene', { score: this.score, timeSurvived: ((Date.now() - this.startTime) / 1000).toFixed(2) });
    }

    increaseDifficulty() {
        this.difficultyFactor += 0.25;
    }
}

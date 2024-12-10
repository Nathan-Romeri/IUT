class Game extends Phaser.Scene {

    constructor() {
        super('Game');
        //Gestion Jeu
        this.player = null;
        this.bombs = null;

        //Maps
        this.map = null;
        this.groundLayer = null;
        this.coinLayer = null;
        this.picLayer = null;

        //Vie
        this.health = 100;
        this.healthBar = null;

        //Timer
        this.timer = 180;

        //Score
        this.score = 0;
 
        //Message textes
        this.scoreText = null;
        this.messageText = null;
        this.timerText = null; 

        //Stocker le timer
        this.timerEvent = null;
        this.cursors = null;

        //Jeu en pause
        this.gamePaused = false; 
    }

    preload() {
        //Load img
        this.load.image('ground_1x1', 'dist/assets/ground_1x1.png');
        this.load.image('pic', 'dist/assets/spike.png');
        this.load.image('bomb', 'dist/assets/bomb.png');
        
        //Load spritesheet
        this.load.spritesheet('coin', 'dist/assets/coin.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('dude', 'dist/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('fullscreen', 'dist/assets/fullscreen.png', { frameWidth: 64, frameHeight: 64 });

        //Load map
        this.load.tilemapTiledJSON('map', 'dist/assets/tile-collision-test-2.json');  

    }

    create() {
        //Génération de map
        this.map = this.make.tilemap({ key: 'map' });
        const groundTiles = this.map.addTilesetImage('ground_1x1');
        const coinTiles = this.map.addTilesetImage('coin');
        const picsTiles = this.map.addTilesetImage('pic');

        this.backgroundLayer = this.map.createLayer('Background Layer', groundTiles, 0, 0);
        this.groundLayer = this.map.createLayer('Ground Layer', groundTiles, 0, 0);
        this.coinLayer = this.map.createLayer('Coin Layer', coinTiles, 0, 0);
        this.picLayer = this.map.createLayer('Pics Layer', picsTiles, 0, 0);

        //Création personnage
        this.player = this.physics.add.sprite(180, 450, 'dude').setDepth(4);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(false);

        // Animations personnage
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        //Gestion collision

        this.groundLayer.setCollisionBetween(1, 25);
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.overlap(this.player, this.coinLayer);
        this.physics.add.overlap(this.player, this.picLayer);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.coinLayer.setTileIndexCallback(26, this.récupererBanane, this);
        this.picLayer.setTileIndexCallback(32, this.hitPic, this);

        // Texte du score
        this.scoreText = this.add.text(700, 4, 'Banane mangée: 8', { font: '28px "Press Start 2P"', fill: '#2d2d2d' });
        this.scoreText.setScrollFactor(0);

        // Message d'affichage central
        this.messageText = this.add.text(512, 288, '', { font: '40px Arial', fill: '#fff' });
        this.messageText.setOrigin(0.5, 0.5);
        this.messageText.setScrollFactor(0);

        // Affichage du timer
        this.timerText = this.add.text(350, 4, 'Temps restant: ' + this.timer + " s", { font: '28px "Press Start 2P"', fill: '#2d2d2d' ,});
        this.timerText.setScrollFactor(0);

        // Bouton pour le mode plein écran
        var fullscreenButton = this.add.image(980, 30, 'fullscreen', 0).setInteractive().setScale(0.75);
        fullscreenButton.setScrollFactor(0);

        // Barre de santé
        this.healthBar = this.add.graphics();
        this.healthBar.setScrollFactor(0);
        this.majBarredevie();

        //Gestion clic sur le fullscreen
        fullscreenButton.on('pointerup', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
                fullscreenButton.setFrame(0);
            } else {
                this.scale.startFullscreen();
                fullscreenButton.setFrame(1);
            }
        });

        // Groupes d'ennemis et de bombes
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.groundLayer);
        this.physics.add.collider(this.player, this.bombs, this.toucherBomb, null, this);
        // Interval de bombe
        setInterval(() => {
            this.createBomb();
        }, 2000);

        //Timer
        this.timerEvent = this.time.addEvent({
            delay: 1000, // Correspond à 1 seconde
            callback: this.majTimer,
            callbackScope: this,
            loop: true 
        });

        // Gestion des entrées clavier
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Logique du mouvement du joueur
        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-290);  
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
    }

    //Update Timer et gestion des cas
    majTimer() {
        this.timer -= 1; 
        this.timerText.setText('Temps restant: ' + this.timer + " s"); // Met à jour l'affichage
    
        // Vérifiez si le temps est écoulé
        if (this.timer <= 0) {
            this.timerEvent.remove(); 
            this.messageText.setText('Temps écoulé !');
            this.physics.pause(); 
            this.gamePaused = true; 
            this.resetGame();
            this.time.delayedCall(2000, () => {
                this.scene.start('End'); 
            });
        }
    }

    //Création de bombe
    createBomb() {
        var x = Phaser.Math.Between(0, 2048);  // Position aléatoire en X
        var bomb = this.bombs.create(x, 16, 'bomb');  // Créer la bombe
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(false);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);  // Vitesse aléatoire
    }

    //Player récupere Banane
    récupererBanane(player, tile) {
        this.score += 1;
        this.scoreText.setText('Banane mangée: ' + this.score);
        this.coinLayer.removeTileAt(tile.x, tile.y);
        if (this.score == 28) {
            this.messageText.setText('Gagné ! Vous avez mangez toute les bananes');
        }
    }

    //Player se fait tocuher par la bombe
    toucherBomb(player, bomb) {
        this.health -= 15;
        bomb.disableBody(true, true);
        if (this.health < 0 && !this.gamePaused) {
            this.health = 0;
            this.GameOver();
        }
        this.majBarredevie(); 
    }

    //Mise à jour couleur la barre de vie en fonction de la vie
    majBarredevie() {
        this.healthBar.clear();
        this.healthBar.fillStyle(0x000000, 1);
        this.healthBar.fillRect(35, 7, 200, 20);
        this.healthBar.lineStyle(6, 0x000000);
        this.healthBar.strokeRect(35, 7, 200, 20);
        this.healthBar.fillStyle(0xff0000, 1);
        this.healthBar.fillRect(35, 7, 2 * this.health, 20); 
    }

//Gamer over et gestion des réinitialisation des donnés (prochaine partie)
    GameOver() {
        this.messageText.setText('Perdu !');
        this.player.setTint(0xff0000);
        this.physics.pause();
        this.gamePaused = true;
        this.resetGame(); 
        //Délai pour le message fin avant la transition au menu
        this.time.delayedCall(2000, () => {
            this.scene.start('End');
        });
    }

    //Réinitialiser le jeu et les constantes
    resetGame() {
        this.score = 0;
        this.health = 100;
        this.timer = 60;
        this.majBarredevie();
        this.bombs.clear(true, true);
        this.gamePaused = false;
    }
}


export default Game;
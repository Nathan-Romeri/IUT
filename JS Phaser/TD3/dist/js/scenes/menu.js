class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('background', 'dist/assets/img/background.png'); 
        this.load.image('button', 'dist/assets/img/button.png');
    }

    create() {
        this.add.image(400, 300, 'background'); 

        this.add.text(140, 100, 'Lego Joyride', { 
            fontSize: '79px', 
            fontFamily: 'Calibri', 
            color: '#DB1102', 
            fontStyle: 'bold'
            
            
        });

        const startButton = this.add.image(350, 500, 'button')
            .setInteractive()
            .on('pointerdown', () => this.scene.start('Game')) // Commence la scène du jeu
            .on('pointerover', () => this.enterButtonHoverState(startButton))
            .on('pointerout', () => this.enterButtonRestState(startButton));

        this.tweens.add({
            targets: startButton,
            scaleX: 0.95,
            scaleY: 0.95,
            yoyo: true,
            repeat: -1,
            duration: 800,
            ease: 'Sine.easeInOut'
        });
    }

    enterButtonHoverState(button) {
        button.setTint(0x44ff44); 
    }

    enterButtonRestState(button) {
        button.clearTint(); 
    }

    update(time, delta) {
    }
}

export default Menu;
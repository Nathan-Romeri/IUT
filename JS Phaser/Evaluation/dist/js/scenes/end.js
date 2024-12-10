class End extends Phaser.Scene {
    constructor() {
        super('End');
    }

    preload() {
    }

    create() {
        //Relancer le jeu
        this.rejouerButton = this.add.text(100, 100, 'Rejouer', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Game'); 
            })
            .on('pointerover', () => this.enterButtonHoverState(this.rejouerButton))
            .on('pointerout', () => this.enterButtonRestState(this.rejouerButton));

        //Quitter le jeu
        this.quitterButton = this.add.text(100, 200, 'Quitter', { fill: '#f00' })
            .setInteractive()
            .on('pointerdown', () => {
                this.game.destroy(true); 
            })
            .on('pointerover', () => this.enterButtonHoverState(this.quitterButton))
            .on('pointerout', () => this.enterButtonRestState(this.quitterButton));
    }

    update() {
    }

    enterButtonHoverState() {
        this.clickButton.setStyle({ fill: '#ff0'});
    }
    enterButtonRestState(button) {
        button.setStyle({ fill: button.text === 'Rejouer' ? '#0f0' : '#f00' });
    }
}

export default End;
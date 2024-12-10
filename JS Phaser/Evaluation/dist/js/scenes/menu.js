class Menu extends Phaser.Scene {
    constructor() {
    super('Menu');
    }
    preload() {
        this.load.image('Menu', 'dist/assets/Menu.png');
    }
    create() {
        this.add.image(510, 300, "Menu");
        this.clickButton = this.add.text(100, 100, 'Start Game', { fill: '#0f0' }).setInteractive().on('pointerdown', () => 
            { this.scene.start('Game');});
    }
    update() {
    }
   }
   export default Menu;
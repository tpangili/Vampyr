class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            color: '#FFFFFF',
            stroke: '#FFFFFF',
            strokeThickness: 1,
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        // show credits text
        this.add.text(centerX - 200, centerY - 290, 'Sprite Art and Programming', menuConfig);
        this.add.text(centerX - 170, centerY - 260, 'by Thurmann Pangilinan', menuConfig);

        this.add.text(centerX - 200, centerY - 130, 'Adaptation of Vampyr (1932),', menuConfig);
        this.add.text(centerX - 230, centerY - 100, 'directed by Carl Theodor Dreyer', menuConfig);

        this.add.text(centerX - 230, centerY + 30, 'Title image taken from the film', menuConfig);
        
        this.add.text(centerX - 200, centerY + 160, 'Music from the film\'s score,', menuConfig);
        this.add.text(centerX - 190, centerY + 190, 'composed by Wolfgang Zeller', menuConfig);
        this.add.text(centerX - 230, centerY + 315, 'Press (R) to return to the menu', menuConfig);

        // enable return to menu key
        this.reload = this.input.keyboard.addKey('R');
    }

    update() {
         // return to menu
         if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.start("menuScene");
        }
    }
}
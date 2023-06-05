class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // Adds tile sprite for the title screen
        //this.title_screen = this.add.tileSprite(0, 0, 640, 640, 'title').setOrigin(0, 0);

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '40px',
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

        // show menu text
        this.add.text(centerX - 170, centerY + 180, 'Press Space to start', menuConfig);
        this.add.text(centerX - 100, centerY + 250, '(H) for help', menuConfig);
        this.add.text(centerX - 100, centerY + 300, '(C) for credits', menuConfig);

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        /*
        // menu background music
        this.music = this.sound.add('bgm_menu');
        let musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);*/
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // starts scene 1
            //this.scene.start('firstScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // starts scene 2
            //this.scene.start('secondScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // starts scene 3
            //this.scene.start('thirdScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // Display credits
            //this.scene.start('creditsScene');
        }
    }
}
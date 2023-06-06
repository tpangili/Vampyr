class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // Adds tile sprite for the title screen
        //this.title_screen = this.add.tileSprite(0, 0, 780, 780, 'title').setOrigin(0, 0);

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

        // show menu text
        this.add.text(centerX - 180, centerY + 100, 'Press (1) to play Scene 1', menuConfig);
        this.add.text(centerX - 180, centerY + 150, 'Press (2) to play Scene 2', menuConfig);
        this.add.text(centerX - 180, centerY + 200, 'Press (3) to play Scene 3', menuConfig);
        this.add.text(centerX - 180, centerY + 300, '(C) for credits', menuConfig);

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
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
        if (Phaser.Input.Keyboard.JustDown(key1)) {
            // starts scene 1
            this.scene.start('firstScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(key2)) {
            // starts scene 2
            //this.scene.start('secondScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(key3)) {
            // starts scene 3
            //this.scene.start('thirdScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // Display credits
            //this.scene.start('creditsScene');
        }
    }
}
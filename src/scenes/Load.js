class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        // load graphics assets
        this.load.image('title', 'img/title_screen.png');
        this.load.image('player', 'img/person.png');
        this.load.image('player_out', 'img/person_out.png');
        this.load.image('shadow', 'img/shadow.png');
        this.load.image('vampColor', 'img/vampColor.png');
        this.load.image('vampire', 'img/vampire.png');
        // load tileset assets
        this.load.image('tilesetImage', 'img/vampyr atari tileset.png');   
        this.load.tilemapTiledJSON("scene1_JSON", "img/scene1.json");
        this.load.tilemapTiledJSON("scene2_JSON", "img/scene2.json");
        this.load.tilemapTiledJSON("scene3_JSON", "img/scene3.json");
        this.load.tilemapTiledJSON("coffin_JSON", "img/coffin.json");
        // load texture atlases
        this.load.atlas('window_atlas', 'img/window.png', 'img/window.json');
        // load audio assets
        this.load.audio('bgm_menu', 'audio/bgm_menu.mp3');
        this.load.audio('bgm_scene1', 'audio/bgm_scene1.mp3');
        this.load.audio('bgm_scene2', 'audio/bgm_scene2.mp3');
        this.load.audio('bgm_scene3', 'audio/bgm_scene3.mp3');
    }

    create() {
        // go to Menu scene
        this.scene.start('menuScene');
    }
}
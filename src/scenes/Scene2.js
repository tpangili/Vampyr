class Scene2 extends Phaser.Scene {
    constructor() {
        super("secondScene");

        this.VEL = 145;
        this.VAMPVEL = 100;
    }

    create() {
        // setup tilemap
        const map = this.add.tilemap("scene2_JSON");
        const tileset = map.addTilesetImage("vampyr atari tileset", "tilesetImage");
        const bgLayer = map.createLayer("bgLayer", tileset, 0, 0);
        const collisionLayer = map.createLayer("collisionLayer", tileset, 0, 0);

        // set map collision
        collisionLayer.setCollisionByProperty({ collides: true });

        // tilemap collision debug
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        // collisionLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(255, 135, 50, 255),
        //     //faceColor: new Phaser.Display.Color(40, 40, 40, 255)
        // });

        // background music
        this.music = this.sound.add('bgm_scene2');
        let musicConfig2 = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        this.music.play(musicConfig2);

        // controls player movement
        this.endScene = false;
        // controls movement after convert to vampire
        this.vampTime = false;
        
        // controls npc movement
        this.move1 = true;
        this.move2 = false;
        this.move3 = false;
        this.move4 = false;
        
        // create player with physics properties
        this.p1 = this.physics.add.sprite(385, 1840, 'player');
        this.p1.body.setCollideWorldBounds(true);

        // create vampire object with physics properties
        this.vamp = this.physics.add.sprite(385, 1840, 'vampire');
        this.vamp.body.setCollideWorldBounds(true);
        this.vamp.alpha = 0;

        // create sister npc with physics properties
        this.npc = this.physics.add.sprite(385, 1500, 'player');

        // set camera properties
        this.cam = this.cameras.main;
        this.cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cam.centerOn(this.p1.x, this.p1.y);
        
        // set physics bounds
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // set physics colliders
        this.physics.add.collider(this.p1, collisionLayer);
        this.physics.add.collider(this.vamp, collisionLayer);

        // define cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // enable return to menu key
        this.reload = this.input.keyboard.addKey('R');
        // debug to go vamp
        this.vamping = this.input.keyboard.addKey('v');

        // end scene after timer expires
        this.time.delayedCall(140000, () => { 
            this.music.stop();
            this.scene.start("menuScene");
        });
        /*
        // activate vampire time at this cue
        this.time.delayedCall(88000, () => { 
            this.goVamp(this.p1);
        });*/

        // debug text
        //this.debug = this.add.bitmapText(16, h-48, 'gem', '', 12);
        //this.debug.setScrollFactor(0); 

        // update instruction text
        //document.getElementById('info').innerHTML = '<strong>SnapScroll.js</strong>: Move w/ arrows. S for next scene, R to Restart scene';
    }

    update() {
        // check player against camera bounds (in case we need to scroll)
        this.checkCamBounds(this.p1, this.cam);

        // Debug logs to see player position
        //console.log(this.p1.x);
        //console.log(this.p1.y);

        if (this.vampTime) {
            this.physics.moveTo(this.vamp, this.npc.x, this.npc.y, this.VAMPVEL);
        }

        // player movement
        this.p1.body.setVelocity(0);

        if(cursors.left.isDown && !this.endScene) {
            this.p1.body.setVelocityX(-this.VEL);
        } 
        if(cursors.right.isDown && !this.endScene) {
            this.p1.body.setVelocityX(this.VEL);
        } 
        if(cursors.up.isDown && !this.endScene) {
            this.p1.body.setVelocityY(-this.VEL);
        } 
        if(cursors.down.isDown && !this.endScene) {
            this.p1.body.setVelocityY(this.VEL);
        }

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.music.stop();
            this.scene.start("menuScene");
        }
        if(Phaser.Input.Keyboard.JustDown(this.vamping)) {
            this.goVamp(this.p1);
        }

        // debug text
        //this.debug.text = `CAMSCROLLX:${this.cam.scrollX.toFixed(2)}, CAMSCROLLY:${this.cam.scrollY.toFixed(2)}\nPX:${this.p1.x.toFixed(2)}, PY:${this.p1.y.toFixed(2)}`;
    }

    // changes things to handle vampire conversion
    goVamp(obj) {
        obj.alpha = 0;
        this.vamp.x = obj.x;
        this.vamp.y = obj.y;
        this.vamp.alpha = 1;
        // show score text
        this.add.image(0, 0, 'vampColor').setOrigin(0, 0);
        this.vampTime = true;
    }

    // check passed obj against passed camera bounds to scroll camera
    // assumes object origin is 0.5
    // also relies upon player tile & physics world collisions to keep player inside world
    checkCamBounds(obj, cam) {
        if(obj.x + obj.width/2 > cam.width + cam.scrollX) {
            // move camera
            cam.setScroll(cam.scrollX + cam.width, cam.scrollY);
            // move player
            obj.x = cam.scrollX + obj.width/2;
        } else if(obj.x - obj.width/2 < cam.scrollX) {
            cam.setScroll(cam.scrollX - cam.width, cam.scrollY);
            obj.x = cam.scrollX + w - obj.width/2;
        } else if(obj.y + obj.height/2 > cam.height + cam.scrollY) {
            cam.setScroll(cam.scrollX, cam.scrollY + cam.height);
            obj.y = cam.scrollY + obj.height/2;
        } else if(obj.y - obj.height/2 < cam.scrollY) {
            cam.setScroll(cam.scrollX, cam.scrollY - cam.height);
            obj.y = cam.scrollY + cam.height - obj.height/2;
        }
    }
}
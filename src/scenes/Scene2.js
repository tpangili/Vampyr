class Scene2 extends Phaser.Scene {
    constructor() {
        super("secondScene");

        this.VEL = 145;
        this.VAMPVEL = 80;
    }

    create() {
        // setup tilemap
        this.map = this.add.tilemap("scene2_JSON");
        this.tileset = this.map.addTilesetImage("vampyr atari tileset", "tilesetImage");
        this.bgLayer = this.map.createLayer("bgLayer", this.tileset, 0, 0);
        this.collisionLayer = this.map.createLayer("collisionLayer", this.tileset, 0, 0);

        // set map collision
        this.collisionLayer.setCollisionByProperty({ collides: true });

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
        this.move5 = false;
        this.move6 = false;
        
        // create player with physics properties
        this.p1 = this.physics.add.sprite(385, 1840, 'player');
        this.p1.body.setCollideWorldBounds(true);

        // create vampire object with physics properties
        this.vamp = this.physics.add.sprite(385, 1840, 'vampire');
        this.vamp.body.setCollideWorldBounds(true);
        this.vamp.alpha = 0;

        // create sister npc with physics properties
        this.npc = this.physics.add.sprite(740, 1342, 'player');

        // set camera properties
        this.cam = this.cameras.main;
        this.cam.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cam.centerOn(this.p1.x, this.p1.y);
        
        // set physics bounds
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // set physics colliders
        this.physics.add.collider(this.p1, this.collisionLayer);
        this.physics.add.collider(this.vamp, this.collisionLayer);

        // enable return to menu key
        this.reload = this.input.keyboard.addKey('R');
        // debug to go vamp
        //this.vamping = this.input.keyboard.addKey('V');    
        
        cursors = this.input.keyboard.createCursorKeys();
        
        // end scene after timer expires
        this.time.delayedCall(95000, () => { 
            this.npc.destroy();
            this.music.stop();
            this.scene.start("menuScene");
        });

        // activate vampire time at this cue
        this.time.delayedCall(48000, () => { 
            this.goVamp(this.p1);
            this.move3 = true;
        });

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
        //console.log(`X: ${this.p1.x}`);
        //console.log(`Y: ${this.p1.y}`);

        // makes vampire move towards npc
        if (this.vampTime) {
            this.physics.moveTo(this.vamp, this.npc.x, this.npc.y, this.VAMPVEL);
        }

        // controls npc movement
        if (this.move1) {
            this.physics.moveTo(this.npc, 165, 1438, this.VEL);
            if (this.npc.x <= 165) {
                this.npc.body.setVelocity(0);
                this.move1 = false;
                this.move2 = true;
            }
        }
        if (this.move2) {
            this.physics.moveTo(this.npc, 203, 1784, this.VEL);
            if (this.npc.y >= 1784) {
                this.npc.body.setVelocity(0);
                this.move2 = false;
            }
        }
        if (this.move3) {
            this.physics.moveTo(this.npc, 148, 1731, 15);
            this.time.delayedCall(5000, () => { 
                this.npc.body.setVelocity(0);
                this.move3 = false;
                this.move4 = true;
            });
        }
        if (this.move4) {
            this.physics.moveTo(this.npc, 206, 1578, 15);
            if (this.npc.x >= 206 && this.npc.y <= 1578) {
                this.npc.body.setVelocity(0);
                this.move4 = false;
                this.move5 = true;
            }
        }
        if (this.move5) {
            this.move5 = false;
            this.physics.moveTo(this.npc, 800, 1354, 25);
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

        // return to menu
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.music.stop();
            this.scene.start("menuScene");
        }
        /*
        if(Phaser.Input.Keyboard.JustDown(this.vamping)) {
            this.goVamp(this.p1);
            this.move3 = true;
        }*/

        // debug text
        //this.debug.text = `CAMSCROLLX:${this.cam.scrollX.toFixed(2)}, CAMSCROLLY:${this.cam.scrollY.toFixed(2)}\nPX:${this.p1.x.toFixed(2)}, PY:${this.p1.y.toFixed(2)}`;
    }

    // changes things to handle vampire conversion
    goVamp(obj) {
        obj.alpha = 0;
        this.vamp.x = obj.x;
        this.vamp.y = obj.y;
        this.vamp.alpha = 1;
        // vamp color border
        this.add.image(0, 0, 'vampColor').setOrigin(0, 0);
        this.endScene = true;
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
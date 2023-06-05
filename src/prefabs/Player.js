class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.endScene = false;      // used to stop player for end of some scenes
        this.cursors = this.input.keyboard.createCursorKeys();  // keyboard input
        this.body.setCollideWorldBounds(true); // sets body to collide with world bounds
        this.VEL = 50 // player speed
    }

    update() {
        this.direction = new Phaser.Math.Vector2(0);
        // directional movement
        if(this.cursors.left.isDown && !this.endScene) {
            this.direction.x = -1;
        } else if (this.cursors.right.isDown && !this.endScene) {
            this.direction.x = 1;
        }
        if(this.cursors.up.isDown && !this.endScene) {
            this.direction.y = -1;
        } else if (this.cursors.down.isDown && !this.endScene) {
            this.direction.y = 1;
        }
        this.direction.normalize();
        this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);
    }
}
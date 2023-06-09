class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.endScene = false;      // used to stop player for end of some scenes
        //this.cursors = this.input.keyboard.createCursorKeys();  // keyboard input
        //this.body.setCollideWorldBounds(true); // sets body to collide with world bounds
        this.VEL = 150 // player speed
    }

    update() {
        this.direction = new Phaser.Math.Vector2(0);
        // directional movement
        if(cursors.left.isDown) {
            this.body.setVelocityX(-this.VEL);
        } 
        if(cursors.right.isDown) {
            this.body.setVelocityX(this.VEL);
        } 
        if(cursors.up.isDown) {
            this.body.setVelocityY(-this.VEL);
        } 
        if(cursors.down.isDown) {
            this.body.setVelocityY(this.VEL);
        }
    }
}
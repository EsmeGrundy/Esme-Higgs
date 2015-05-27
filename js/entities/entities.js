game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this.setSuper(x, y, settings);
        this.setAttributes();
        this.type = "Proton";
        this.setFlags();
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.addAnimation();
        this.renderable.setCurrentAnimation("idle");
    },
    setSuper: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
                image: "proton",
                height: 128,
                width: 128,
                spriteheight: "128",
                spritewidth: "128",
                getShape: function() {
                    return(new me.Rect(0, 0, 128, 128)).toPolygon();
                }

            }]);
    },
    setAttributes: function() {
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
    },
    setFlags: function() {
        this.facing = "right";
    },
    addAnimation: function() {
       this.renderable.addAnimation("idle", [8]);
        this.renderable.addAnimation("walk", [8, 9, 10, 11, 12, 13, 14, 15], 80);
        this.renderable.addAnimation("explode", [4, 5], 80);
    },
    update: function(delta) {
        this.checkKeyPressesAndMove();
        this.setAnimation();

        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;

    },
    checkKeyPressesAndMove: function() {
        //if the player presses the right arrow key..
        if (me.input.isKeyPressed("right")) {
            //the player moves right as dictated by the moveRight function
            this.moveRight();
        }
        //if the player presses the left arrow key...
        else if (me.input.isKeyPressed("left")) {
            //the player moves left as dictated by the moveLeft function
            this.moveLeft();
        }
        //if no arrow key is pressed
        else {
            //the player does not move
            this.body.vel.x = 0;
        }
    },
    moveRight: function() {
        //sets the direction the player is facing to right
        this.facing = "right";
        //moves the player's position to the right
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        //flips the animation
        this.flipX(true);
    },
    moveLeft: function() {
        //sets the direction the player is facing to left
        this.facing = "left";
        //moves the position of the player to the left
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        //the animation stays the same
        this.flipX(false);
    },
    setAnimation: function() {
        //if the player is moving and it is not attacking
        if (this.body.vel.x !== 0) {
            //and if the player is not already walking
            if (!this.renderable.isCurrentAnimation("walk")) {
                //the animation is set to walk
                this.renderable.setCurrentAnimation("walk");
            }
        }
        //if the player is not attacking
        else if(this.body.vel.x === 0 && game.data.collided)
        {
            //the player is idle
            this.renderable.setCurrentAnimation("explode");
        }
        else
        {
            //the player is idle
            this.renderable.setCurrentAnimation("idle");
        }
    },
    collideHandler: function(response) {
        //if the player collides with something, then a function containing the response is called
        if (response.b.type === 'Neutron') {
            game.data.collided = true;
            this.renderable.setCurrentAnimation("explode");
            game.data.win = true;
            game.data.particles = 3;
            game.data.discovered = "3 up quarks and 3 down quarks";
            this.body.vel.x = 0;
        }
    }
});

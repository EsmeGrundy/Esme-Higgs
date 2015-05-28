game.Electron = me.Entity.extend({
    init: function(x, y, settings) {
        this.setSuper(x, y, settings);
        this.setAttributes();
        this.type = "Electron";
        this.setFlags();
        this.particle = game.data.character;
        this.particle2 = game.data.character2;
        if (this.particle === "electron") {
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        }
        this.addAnimation();
        this.renderable.setCurrentAnimation("idle");
    },
    setSuper: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
                image: "electron",
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
        game.data.collided = false;
    },
    addAnimation: function() {
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("walk", [0, 1, 2, 3, 4, 5, 6, 7], 80);
        this.renderable.addAnimation("explode", [9, 10], 80);
    },
    update: function(delta) {
//        this.now = new Date().getTime();
//        this.dead = this.checkIfDead();
        this.checkKeyPressesAndMove();
//        this.checkAbilityKeys();
        this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;

    },
    checkKeyPressesAndMove: function() {
        if (this.particle2 === "electron"){
            //if the player presses the right arrow key..
            if (me.input.isKeyPressed("right2")) {
                //the player moves right as dictated by the moveRight function
                this.moveRight();
            }
            //if the player presses the left arrow key...
            else if (me.input.isKeyPressed("left2")) {
                //the player moves left as dictated by the moveLeft function
                this.moveLeft();
            }
            //if no arrow key is pressed
            else {
                //the player does not move
                this.body.vel.x = 0;
            }
        } else if (this.particle === "electron"){
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
        if (this.body.vel.x !== 0 && !game.data.collided) {
            //and if the player is not already walking
            if (!this.renderable.isCurrentAnimation("walk")) {
                //the animation is set to walk
                this.renderable.setCurrentAnimation("walk");
            }
        }
        //if the player is not attacking
        else if (this.body.vel.x === 0 && game.data.collided)
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
            game.data.win = true;
            game.data.particles = 4;
            game.data.discovered = "2 down quarks, 1 up quark, and 1 electron";
            game.data.collided = true;
            this.body.vel.x = 0;
            console.log(game.data.win);
            this.renderable.setCurrentAnimation("explode");
        } else if (response.b.type === 'Proton') {
            game.data.win = true;
            game.data.particles = 4;
            game.data.discovered = "2 up quarks, 1 down quark, and 1 electron";
            game.data.collided = true;
            this.body.vel.x = 0;
            console.log(game.data.win);
            this.renderable.setCurrentAnimation("explode");
        }
    }
});



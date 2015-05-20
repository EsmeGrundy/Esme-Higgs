game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // reset the score
        game.data.score = 0;

        me.levelDirector.loadLevel("Switz01");

        this.resetPlayer(10, 0);
        this.resetParticle(2600, 0);

        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.A, "left2");
        me.input.bindKey(me.input.KEY.D, "right2");
        
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    },
    resetPlayer: function(x, y) {
        //adds the entities needed for the game when the player resets
        game.data.player = me.pool.pull(game.data.character, x, y, {});
        me.game.world.addChild(game.data.player, 5);
    },
    resetParticle: function(x, y){
        game.data.particle2 = me.pool.pull(game.data.character2, x, y, {});
        me.game.world.addChild(game.data.particle2, 5);
    }
});

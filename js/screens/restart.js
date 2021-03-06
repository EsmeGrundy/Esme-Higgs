game.RestartScreen = me.ScreenObject.extend({
    onResetEvent: function() {	
//		var titleImage = new me.Sprite(0, 0, me.loader.getImage("restart-screen"));
                me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("restart-screen")), -10);
                me.input.bindKey(me.input.KEY.ENTER, "start");
                
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function(){
                        this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
                        this.font = new me.Font("Helvetica", 32, "yellow");
                    },
                    
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "Game Over!", 450, 130);
                        //tells which particles are discovered at the end of the game
                        this.font.draw(renderer.getContext(), "You discovered:" + game.data.discovered, 50, 330);
                        this.font.draw(renderer.getContext(), "Press ENTER to go back to the menu!", 250, 530);
                    }
                    
                })));
                
                this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
                    if(action === "start"){
                        me.state.change(me.state.MENU);
                    }
                });
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER); 
                me.event.unsubscribe(this.handler);
	}
});





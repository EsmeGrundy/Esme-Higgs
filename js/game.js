
/* Game namespace */
var game = {
    // an object where to store game information
    data: {
        // score
        score: 0,
        option1: "",
        option2: "",
        playerMoveSpeed: 5,
        character: "",
        character2: "",
        player: "",
        particle2: "",
        win: "",
        exp: 0,
        particles: "",
        collided: ""
    },
    // Run on page load.
    "onload": function() {
        // Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, 1067, 600, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function() {
                me.plugin.register.defer(this, debugPanel, "debug");
            });
        }

        //create new states for each new screen created
        //creates the spend experience state
        me.state.SPENDEXP = 112;

        //creates the new user state
        me.state.NEW = 113;

        //created the load user state
        me.state.LOAD = 114;

        //creates the character state
        me.state.CHAR = 115;

        //creates the collider state
        me.state.COLL = 116;

        //creates the collider state
        me.state.CHAR2 = 117;

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
    // Run on game resources loaded.
    "loaded": function() {
        me.pool.register("proton", game.PlayerEntity, true);

        me.pool.register("neutron", game.Neutron, true);

//        me.pool.register("GameTimerManager", game.GameTimerManager, true);
//        me.pool.register("HeroDeathManager", game.HeroDeathManager, true);
        me.pool.register("ExperienceManager", game.ExperienceManager);

        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.RESTART, new game.RestartScreen());
        me.state.set(me.state.SPENDEXP, new game.SpendExp());
        me.state.set(me.state.NEW, new game.NewProfile());
        me.state.set(me.state.LOAD, new game.LoadProfile());
        me.state.set(me.state.CHAR, new game.Characters());
        me.state.set(me.state.CHAR2, new game.Characters2());
        me.state.set(me.state.COLL, new game.Colliders());

        // Start the game.
        me.state.change(me.state.MENU);
    }
};

game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        //sets timers and flags to use to create creeps and produce gold
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
//        this.lastBubble = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    update: function() {
        this.now = new Date().getTime();
        //calls functions
//        this.goldTimerCheck();
        this.creepTimerCheck();
        return true;
    },
//    goldTimerCheck: function() {
//        //if a second has passed and the time minus the last time a creep was spawned is less than a second...
//        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= game.data.creepAttackTimer)) {
//            //the gold is increased by the exp1 variable plus 1
//            game.data.gold += (Number(game.data.exp1) + 1);
//        }
//    },
    creepTimerCheck: function() {
        //if two seconds have passed and the time minus the last time a creep was spawned is less than two seconds...
        if (Math.round(this.now / 2000) % 10 === 0 && (this.now - this.lastCreep >= game.data.creepAttackTimer)) {
            //the lastCreep timer is reset
            this.lastCreep = this.now;
            //a new creep is added
            var creep = me.pool.pull("EnemyCreep", 2700, 0, {});
            me.game.world.addChild(creep, 5);
        } 
        //if a second has passed and the time minus the last time a creep was spawned is less than a second...
//        else if (Math.round(this.now / 1000) % 10 === 0 && ((this.now - this.lastTeamCreep) >= game.data.teamCreepAttackTimer)) {
//            //the last teamCreep timer is reset
//            this.lastTeamCreep = this.now;
//            //a new team creep is added
//            var creept = me.pool.pull("TeamCreep", 2700, 0, {});
//            me.game.world.addChild(creept, 5);
//        } 
//        //if half a second has passed and the time minus the last time a creep was spawned is less than half a second...
//        else if (Math.round(this.now / 500) % 10 === 0 && ((this.now - this.lastTeamCreep2) >= game.data.teamCreep2AttackTimer)) {
//            //the lastTeamCreep2 timer is reset
//            this.lastTeamCreep2 = this.now;
//            //a second team creep is added
//            var creept2 = me.pool.pull("TeamCreep2", 2700, 0, {});
//            me.game.world.addChild(creept2, 5);
//        }
    }
});
//manages what happens of the player's health is less than 0
game.HeroDeathManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
    },
    update: function() {
        //if the player dies...
        if (game.data.player.dead) {
            //the player and the player tracker on the miniMap is reset to the beginning of the level
            me.game.world.removeChild(game.data.player);
            me.game.world.removeChild(game.data.miniPlayer);
            me.state.current().resetPlayer(10, 0);
        }
        return true;
    }
});
game.ExperienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        //the game is not over yet
        this.gameover = false;
    },
    update: function() {
        //if the player has killed the enemy base and the game is not already over
        if (game.data.win === true && !this.gameover) {
            //the gameOver function is called and passed a value of true
            this.gameOver(true);
        } 
        //if the player has not killed the enemy base and the game is not already over
        else if (game.data.win === false && !this.gameover) {
            //the gameOver function is called and passed a value of false
            this.gameOver(false);
        }
        return true;
    },
    gameOver: function(win) {
        //if the value passed to the function is win
        if (win) {
            //the exp variable goes up by 10
            game.data.exp += 10;
        } else {
            //otherwise the exp only goes up by 1
            game.data.exp += 1;
        }
        //the game is over
        this.gameover = true;
        me.save.exp = game.data.exp;
        $.ajax({
            type: "POST",
            url: "php/controller/save-user.php",
            data: {
                exp: game.data.exp,
                exp1: game.data.exp1,
                exp2: game.data.exp2,
                exp3: game.data.exp3,
                exp4: game.data.exp4
            },
            dataType: "text"
        })
                .success(function(response) {
                    //if the value passed to the function is true
                    if (response === "true") {
                        //the state changes to the game over screen
                        me.state.change(me.state.RESTART);
                    } else {
                        //if this fails then an alert with the error is created
                        alert(response);
                    }
                })
                //if the variables fail to save
                .fail(function(response) {
                    //an alert is created that says "fail"
                    alert("fail");
                });

    }
});



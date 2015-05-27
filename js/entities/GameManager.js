game.ExperienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        //the game is not over yet
        this.gameover = false;
    },
    update: function() {
        //if the player has killed the enemy base and the game is not already over
        if (game.data.win === true) {
            //the gameOver function is called and passed a value of true
            this.gameOver(true);
            console.log("gameOver activated");
        } 
        //if the player has not killed the enemy base and the game is not already over
        else if (game.data.win === false) {
            //the gameOver function is called and passed a value of false
            this.gameOver(false);
        }
        return true;
    },
    gameOver: function(win) {
        //if the value passed to the function is win
        if (win) {
            //the exp variable goes up by 10
            game.data.exp += game.data.particles;
            console.log("updated exp");
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
                exp: game.data.exp
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



var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = [0];
var started = false;

function nextSequence () {
    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var i = level [level.length - 1] + 1;
    level.push(i);
    $("#level-title").html("Level " + i);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();
    playSound(randomChosenColour);
};

$(".btn").click(function() {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        // var audio = new Audio("sounds/" + userChosenColour + ".mp3");
        // audio.play();
        playSound(userChosenColour);
        animatePress(this);
        checkAnswer();
});

function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress (currentColour) {
    $(currentColour).addClass("pressed");
     setTimeout(function() {
         $(currentColour).removeClass("pressed");
     }, 100);
};

$(document).keypress(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});

$("#level-title").click(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});

function checkAnswer() {
     if (gamePattern.length === userClickedPattern.length && gamePattern.every((v, i) => v === userClickedPattern[i])) {
        setTimeout(nextSequence, 1000);
        userClickedPattern.length = 0;
     } else if (gamePattern.length === userClickedPattern.length) {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
        gamePattern.length = 0;
        userClickedPattern.length = 0;
     } else if (gamePattern.length < userClickedPattern.length) {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
        gamePattern.length = 0;
        userClickedPattern.length = 0;
     };
};

function startOver() {
        level = [0];
        started = false;
};
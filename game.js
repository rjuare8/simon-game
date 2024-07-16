var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//Add animation
function animateElement(color) {
    $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");

    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];

    var randomNum = Math.floor(Math.random() * 4);
    
    var randomColor = buttonColours[randomNum];

    gamePattern.push(randomColor);

    //Play animation and sound
    animateElement(randomColor);
    playSound(randomColor);

    level += 1;
    $("h1").text("level " + level);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


$(".btn").click(function() {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function() {
    if (!started) {
        level = 0;
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length == userClickedPattern.length) {
            console.log("done");

            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        

        

    } else {
        console.log("wrong");

        //Play wrong audio and change the style of the body
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}





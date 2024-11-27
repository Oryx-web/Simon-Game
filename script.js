var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).one("keydown", function() {
  nextSequence();
})

$(".btn").on("click", function(){
    if (level >= 1)
    {
        var userChosenColour = $(this).attr("id");
        animatePress(userChosenColour);
        playSound(userChosenColour);
        userClickedPattern.push(userChosenColour);  //PATRÓN USUARIO
        checkAnswer(userClickedPattern);
    }
})

function nextSequence(){    
    level++;
    userClickedPattern = [];
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(secuenciaUsuario){
    if (gamePattern.length == secuenciaUsuario.length){
        if (secuenciaUsuario[userClickedPattern.length-1] == gamePattern[userClickedPattern.length-1]){
            setTimeout(function(){
                nextSequence();
            }, 500);
        }
        else{
            startOver();
        }
    }else{
        if (secuenciaUsuario[userClickedPattern.length-1] != gamePattern[userClickedPattern.length-1]){
            startOver();
        }
    }
}

function playSound(name) {
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    userChosenColour = [];
    level = 0;
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    $(document).one("keydown", function() {
        nextSequence();
    })
}
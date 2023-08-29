
var colorPallette = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        // $("#level-title").html("level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click",function(){
    
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatepress(userChosenColor);
    playaudio(userChosenColor);
if(userClickedPattern.length === gamePattern.length){
    checkanswer();
}

});



function nextSequence(){

userClickedPattern = [];

    level = level + 1;
    $("#level-title").html("level " + level);


var randomNumber = Math.floor(Math.random() * 4) ;
var randomChosenColor =  colorPallette[randomNumber];

gamePattern.push(randomChosenColor);

var chosenButton = $("#" + randomChosenColor);

chosenButton.fadeIn(100).fadeOut(100).fadeIn(100);

playaudio(randomChosenColor);

}

function checkanswer() {
    var valid = true;
    for (var i = 0; i < gamePattern.length; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            valid = false;
            break; 
        }
    }

    console.log("User clicked pattern:", userClickedPattern);
    console.log("Game pattern:", gamePattern);
    console.log("Valid:", valid);

    if (valid) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    } else {
        playaudio("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").html("Game Over");
        setTimeout(function(){
            location.reload();
        },2000);
    }
}





function animatepress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
    },100);
}


function playaudio(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}





var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    setTimeout(function() {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }, 300);
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  playAnimation(userChosenColour);
  checkAnswer(userClickPattern.length - 1);
})

function nextSequence() {
  userClickPattern = [];
  level++;
  $("h1").html("Level " + level);

  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(input) {
  var audio = new Audio("sounds/" + input + ".mp3");
  audio.play();
}

function playAnimation(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function() {
    $("#" + name).removeClass("pressed");
  }, 200);
}

function gameOver() {
  $("h1").text("Game Over, Press Any Key to Restart")
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  var gameOverSound = new Audio('sounds/wrong.mp3')
  gameOverSound.play();
  starOver();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    gameOver();
  }
}

function starOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

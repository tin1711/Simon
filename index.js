// Generadores
var buttonColours=["red","blue","yellow","green"];
var gamePattern=[];
var randomChosenColour;
var userClickedPattern=[];
var userChosenColour;
var level=0;
// sonido
  function playsound(name){
    var audio =new Audio("sounds/"+name+".mp3");
    audio.play();
  }
// Press animation

  function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
      $("."+currentColor).removeClass("pressed")
   
      },100);
      

  }



function nextSequence(){

    $("#level-title").text("level "+level);
      level++;
      console.log(level)
  

        var randomNumber=Math.floor(Math.random()*4);
        randomChosenColour= buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        $("."+randomChosenColour).fadeIn(50).fadeOut(50).fadeIn(50);
        playsound(randomChosenColour);
      
     
  };

  function starOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    
    $("#level-title").text("level "+level);
    nextSequence();

  }
   
    

function checkAnswer(index){
  if(userClickedPattern[index]==gamePattern[index]){
    console.log(gamePattern.length)
    if(userClickedPattern.length==gamePattern.length){
      console.log(gamePattern,userClickedPattern);
       userClickedPattern=[];
       setTimeout(nextSequence,1000);
      }
    
  }else{
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playsound("wrong")
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
      
    },1000);
    
    $(document).one("keydown",function(){
      starOver();
     
    });
    

  }
}



$(document).one("keydown",function(){
  $("#level-title").text("level "+level);
  nextSequence();
});


$(".btn").on("click",function(){
  userChosenColour=this.id;
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColour))
});
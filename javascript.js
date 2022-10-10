//if clicked on start/reset button
    //if we are playing
        //reload page
    //if we are not playing
        //set score to zero
        // show time
        //reduce time by  1 sec
        //timeleft?
          // yes -> continue
          //no -> gameover
        //change button to reset
        //generate new Q&A

//if we click on answr box
    //if we are playing
      //correct?
        //yes
          //increase score by 1
          //correct box show 1sec
          // new Q&A
        //no 
          //try again bax 1sec

var playing = false;
var score;
var action;
var timeRem;
var correctAns
document.getElementById("startreset").onclick = function(){
  if(playing){
    location.reload(); //reload
  }
  else{
    document.getElementById("time").style.color = "cornflowerblue";
    playing = true;
    score = 0;
    document.getElementById("scoreValue").innerHTML = "Score: " + score;
    show("time");
    hide("gameover");

    document.getElementById("startreset").innerHTML = "Reset Game";
    //start countdown
    timeRem = 60;
    document.getElementById("timeValue").innerHTML = timeRem;
    startCountdown();

    //generate new ques and answers
    generateQuesAns();

  }
}

for(i=1;i<5;i++){
  document.getElementById("box" + i).onclick = function(){
    if(playing == true){
      if(this.innerHTML == correctAns){
        score++;
        document.getElementById("scoreValue").innerHTML = "Score: " + score;
        hide("wrong");
        show("correct");
        setTimeout(function(){
          hide("correct")
        },1000);
        generateQuesAns();
      }
      else{
        show("wrong");
        hide("correct");
        setTimeout(function(){
          hide("wrong")
        },1000);
      }
    }
  }
}

function startCountdown(){
  action = setInterval(function(){
    timeRem--;
    document.getElementById("timeValue").innerHTML = timeRem;
    if(timeRem <= 10 ){
      document.getElementById("time").style.color = "red";
    }
    if(timeRem == 0){
      stopCountdown();
      show("gameover");
      document.getElementById("gameover").innerHTML = 
      "<p>Game Over!</p> <p>YOUR score is " + score + "  </p>";
      hide("time");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
      
    }
  },1000);
}
function stopCountdown(){
  clearInterval(action);
}

function hide(id){
  document.getElementById(id).style.display = "none";
}
function show(id){
  document.getElementById(id).style.display = "block";
}

function generateQuesAns(){
  var x,y;
  x = 1 + Math.round(Math.random()*9 );
  y = 1 + Math.round(Math.random()*9  );
  correctAns = x*y;
  document.getElementById("question").innerHTML = x + "x" + y;
  var randomPos =  1+Math.round(Math.random()*3 );
  document.getElementById("box" + randomPos).innerHTML = correctAns;

  var ans = [correctAns];
  for(i= 1;i<=4;i++){
    if(i != randomPos){
      var wrongAns;
      
      do{
        wrongAns = (1 + Math.round(Math.random()*9 ))*(1 + Math.round(Math.random()*9  ));
        
      }while(ans.indexOf(wrongAns) > -1);
      
      document.getElementById("box" + i).innerHTML = wrongAns;
      ans.push(wrongAns);
    }
  }

}

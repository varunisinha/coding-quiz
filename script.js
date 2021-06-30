
//Defining global variables for use 

var questionsEl = document.getElementById("questions");

var highscoreInputName = document.getElementById("initials");

var highscoreDisplayName = document.getElementById("highscore-initials");

var endGameBtns = document.getElementById("endGameBtns");

var submitScoreBtn = document.getElementById("submitScore");

var highscoreDisplayScore = document.getElementById("highscore-score");

var quizTimer = document.getElementById("timer");

var startQuizButton = document.getElementById("startbtn");

var startQuizDiv = document.getElementById("startpage");

var highscoreContainer = document.getElementById("highscoreContainer");

var highscoreDiv = document.getElementById("high-scorePage");

var quizBody = document.getElementById("quiz");

var resultsEl = document.getElementById("result");

var finalScoreEl = document.getElementById("finalScore");

var gameoverDiv = document.getElementById("gameover");



var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// An array that contains all the questions

var quizQuestions = [
  {
    question: "What HTML attribute references an external JavaScript file?",
    choiceA: "A. href",
    choiceB: "B. src",
    choiceC: "C. class",
    choiceD: "D. index",
    correctAnswer: "b"},
    
    {
    question: "How many elements can you apply an 'ID' attribute to?",
    choiceA: "A. As many as you want",
    choiceB: "B. 3",
    choiceC: "C. 1",
    choiceD: "D. 128",
    correctAnswer: "c"},
  
    {
    question: "The condition in an if/else statement is enclosed within _________",
    choiceA: "A. quotes",
    choiceB: "B. parenthesis",
    choiceC: "C. curly brackets",
    choiceD: "D. square brackets",
    correctAnswer: "b"},
   
    {
    question: "Commonly used data types DO NOT include:",
    choiceA: "A. strings",
    choiceB: "B. booleans",
    choiceC: "C. alerts",
    choiceD: "D. numbers",
    correctAnswer: "c"},
    
    {
    question: "What HTML tags are JavaScript code wrapped in?",
    choiceA: "A. &lt;div&gt;",
    choiceB: "B. &lt;link&gt;",
    choiceC: "C. &lt;head&gt;",
    choiceD: "D. &lt;script&gt;",
    correctAnswer: "d"},
    
    {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choiceA: "A. console.log",
    choiceB: "B. for loops",
    choiceC: "C. terminal/bash",
    choiceD: "D. JavaScript",
    correctAnswer: "a"},  
    
    {
    question: "What does WWW stand for?",
    choiceA: "A. Web World Workings",
    choiceB: "B. Weak Winter Wind",
    choiceC: "C. World Wide Web",
    choiceD: "D. Wendy Wants Waffles",
    correctAnswer: "c"},
    
    ];

//Other global variables

var finalQuestionIndex = quizQuestions.length;

var currentQuestionIndex = 0;

var timeLeft = 76;

var timerInterval;

var score = 0;

var correct;

// This function loops through the array of questions and outputs one at a time

function generateQuizQuestion(){

    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 

    var currentQuestion = quizQuestions[currentQuestionIndex];

    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// This function starts the quiz and sets off the timer

function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Defining the timer by using set Interval

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

// Once we have answered all the questions or the timer ends the showScore function is triggered

function showScore(){

    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}


submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {

        alert("You cannot leave it blank. Please fill out your initials!");

        return false;

    }else{

        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

        var currentUser = highscoreInputName.value.trim();

        var currentHighscore = {

            name : currentUser,

            score : score

        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});



//This resets the highest score and outputs the highest score list by pulling from the local storage

function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages from the user

function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears out the local storage of the high scores as well as clears out the high score board

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

//This function returns us to the beginning, to restart the quiz

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks whether each answer is right or wrong

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("This is the correct answer!");
        currentQuestionIndex++;
        generateQuizQuestion();

        

    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That is the incorrect answer.")
        currentQuestionIndex++;
        generateQuizQuestion();
        
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);
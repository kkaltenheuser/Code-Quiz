// Organizing HTML elements that will be manipulated throughout user interaction
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz question object - all centering topics concerning JS
var quizQuestions = [
  {
    // question one
    question: "How many elements can you apply an 'ID' attribute to?",
    choiceA: "As many as you want",
    choiceB: "3",
    choiceC: "1",
    choiceD: "128",
    correctAnswer: "c",
  },
  {
    // question two
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a",
  },
  {
    // question three
    question: "What is used primarily to add styling to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Python",
    choiceD: "React.js",
    correctAnswer: "b",
  },
  {
    // question four
    question: "Which of the following is not a unit of data?",
    choiceA: "python",
    choiceB: "boolean",
    choiceC: "string",
    choiceD: "numbers",
    correctAnswer: "a",
  },
  {
    // question five
    question: "When is localStorage data cleared?",
    choiceA: "No expiration time",
    choiceB: "On page reload",
    choiceC: "On browser close",
    choiceD: "On computer restart",
    correctAnswer: "a",
  },
  {
    // question six
    question: "Which operator is used to assign meaning to a variable?",
    choiceA: "-",
    choiceB: "=",
    choiceC: "*",
    choiceD: "x",
    correctAnswer: "b",
  },
  {
    // question seven
    question: "What HTML attribute references an external JavaScript file?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b",
  },
  {
    // question eight
    question: "How do you add a comment in a Javascript file?",
    choiceA: "/  /",
    choiceB: "/*   */",
    choiceC: "<!--- --->",
    choiceD: "//",
    correctAnswer: "d",
  },
  {
    // question nine
    question:
      "What is the correct place to put Javascript into an HTML document?",
    choiceA: "<body>",
    choiceB: "<header>",
    choiceC: "<body> and <header>",
    choiceD: "you link a separate file",
    correctAnswer: "a",
  },
  {
    // question ten
    question: "Inside what HTML element do we enter Javascript?",
    choiceA: "<script>",
    choiceB: "<js>",
    choiceC: "<scripting>",
    choiceD: "<javascript>",
    correctAnswer: "a",
  },
];
// Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// This function moves through the object array containing the quiz questions to move between questions and sort out answers (inputted by creator and those inputted by user) for the index to work through
function generateQuizQuestion() {
  gameoverDiv.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
}

// Start Quiz function inititages the TimeRanges, minimizes the start button, and begins by loading the first question in to the user's view.
function startQuiz() {
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "none";
  generateQuizQuestion();

  //Timer
  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}
// This function operates on the end page screen where the final score is displayed after either completeing the quiz or upon the timer running out
function showScore() {
  quizBody.style.display = "none";
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreEl.innerHTML =
    "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// Upon clicking the submit button, the function highscore that saves and stringifies the array of high scores already saved in local stoage is inititated;
// as well as pushing the new user's initials and score sinto the array that is being saved in local storage. Then it runs the function to display the high scores.
submitScoreBtn.addEventListener("click", function highscore() {
  if (highscoreInputName.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score,
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

// This function serves to clear the user available list for the high scores and generates a new high score list from local storage
function generateHighscores() {
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
  }
}

// This function displays the high scores page
function showHighscore() {
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighscores();
}

// This function wipes the local storage of high scores as well as text featured on the high score board
function clearScore() {
  window.localStorage.clear();
  highscoreDisplayName.textContent = "";
  highscoreDisplayScore.textContent = "";
}

// This function sets all variables back to their original values and allows the home page to reappear to grant the option to replay the quiz
function replayQuiz() {
  highscoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 76;
  score = 0;
  currentQuestionIndex = 0;
}

// This function compares the response to the correct answer
function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    alert("That Is Correct!");
    currentQuestionIndex++;
    generateQuizQuestion();
    //display in the results that the answer is correct.
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
    alert("That Is Incorrect.");
    currentQuestionIndex++;
    generateQuizQuestion();
    //display in the results that the answer is incorrect
  } else {
    showScore();
  }
}

// This button initiates the quiz!! Have fun!
startQuizButton.addEventListener("click", startQuiz);

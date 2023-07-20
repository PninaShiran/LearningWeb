//questions array
var questions = [
  {
    question: 'How do you write "Hello, World!" in JavaScript?',
    answers: [
      'console.log("Hello, World!");',
      'print("Hello, World!");',
      'echo "Hello, World!";',
      'log("Hello, World!");',
    ],
    correctAnswer: 'console.log("Hello, World!");',
  },
  {
    question:
      "What is the correct syntax for creating a function in JavaScript?",
    answers: [
      "function myFunction()",
      "function = myFunction()",
      "function:myFunction()",
      "function => myFunction()",
    ],
    correctAnswer: "function myFunction()",
  },
  {
    question: "How do you declare a variable in JavaScript?",
    answers: ["var = myVar", "v myVar", "variable myVar", "var myVar"],
    correctAnswer: "var myVar",
  },
];

// this code run whan page finish load
document.addEventListener("DOMContentLoaded", function () {
  var video = document.querySelector(".video");
  var buttonContainer = document.querySelector(".button-container");
  var questionContainer = document.getElementById("question-container");
  var quiz = document.querySelector(".quiz");
  var answerContainer = document.getElementById("answers");
  var feedbackElement = document.getElementById("feedback");
  var progressElement = document.getElementById("progress");
  var scoreElement = document.getElementById("score");
  var nextButton = document.getElementById("next-button");

  //questions index and score
  var currentQuestionIndex = 0;
  var score = 0;

  //claen pervious question and disply next
  function displayQuestion() {
    while (answerContainer.children.length > 0) {
      answerContainer.removeChild(answerContainer.lastChild);
    }
    clearFeedback();
    var currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach(function (answer) {
      var li = document.createElement("li");
      li.textContent = answer;
      li.addEventListener("click", function () {
        var selectedAnswer = this.textContent;
        var isCorrect = checkAnswer(selectedAnswer);
        displayFeedback(isCorrect);
        disableAnswerButtons();
        updateScore(isCorrect);
        showNextButton(); // Show the "Next" button after an answer is selected
      });
      answerContainer.appendChild(li);
    });
    progressElement.textContent =
      "Question " + (currentQuestionIndex + 1) + " of " + questions.length;
  }

  function clearFeedback() {
    feedbackElement.textContent = "";
  }

  function displayFeedback(isCorrect) {
    feedbackElement.textContent = isCorrect ? "Correct!" : "Wrong!";
    feedbackElement.style.color = isCorrect ? "green" : "red";
  }

  // disable mounse event
  function disableAnswerButtons() {
    var answerButtons = document.querySelectorAll("#answers li");
    answerButtons.forEach(function (button) {
      button.style.pointerEvents = "none";
    });
  }

  function updateScore(isCorrect) {
    if (isCorrect) {
      score++;
    }
    scoreElement.textContent = "Score: " + score + "/" + questions.length;
  }

  function showNextButton() {
    nextButton.style.display = "initial";
    nextButton.disabled = false;
    if (currentQuestionIndex === questions.length - 1) {
      nextButton.textContent = "Finish";
    } else {
      nextButton.textContent = "Next";
    }
  }

  function checkAnswer(selectedAnswer) {
    var currentQuestion = questions[currentQuestionIndex];

    return selectedAnswer === currentQuestion.correctAnswer;
  }

  function displayCompletion() {
    questionContainer.textContent = "Quiz completed!";
    answerContainer.innerHTML = "";
    feedbackElement.textContent = "";
    progressElement.textContent = "";
    nextButton.style.display = "none";
  }

  //event handler
  nextButton.addEventListener("click", function () {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion();
    } else {
      displayCompletion();
    }
  });

  buttonContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("play-button")) {
      video.play();
    } else if (target.classList.contains("pause-button")) {
      video.pause();
    }
  });

  video.addEventListener("ended", () => {
    quiz.classList.remove("hide-quiz");
  });

  displayQuestion();
});

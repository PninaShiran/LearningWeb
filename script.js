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
  const video = document.querySelector(".video");
  const buttonContainer = document.querySelector(".button-container");
  const questionContainer = document.getElementById("question-container");
  const quiz = document.querySelector(".quiz");
  const answerContainer = document.getElementById("answers");
  const feedbackElement = document.getElementById("feedback");
  const progressElement = document.getElementById("progress");
  const scoreElement = document.getElementById("score");
  const nextButton = document.getElementById("next-button");

  //questions index and score
  var currentQuestionIndex = 0;
  var score = 0;

  //claen pervious question and disply next
  function displayQuestion() {
    while (answerContainer.children.length > 0) {
      answerContainer.removeChild(answerContainer.lastChild);
    }
    clearFeedback();
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach(function (answer) {
      const li = document.createElement("li");
      li.textContent = answer;
      li.addEventListener("click", function () {
        const selectedAnswer = this.textContent;
        const isCorrect = checkAnswer(selectedAnswer);
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
    const answerButtons = document.querySelectorAll("#answers li");
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
    const currentQuestion = questions[currentQuestionIndex];

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

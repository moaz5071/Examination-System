import Question from "./Question.js";
import Answer from "./Answer.js";
const questions = [
  new Question(
    "Which language runs in a Web Browser?",
    [
      new Answer("Javascript"),
      new Answer("C"),
      new Answer("Python"),
      new Answer("Java"),
    ],
    "Javascript"
  ),
  new Question(
    "What does CSS stand for?",
    [
      new Answer("Central Cascading Sheet"),
      new Answer("Cascading Style Sheet"),
      new Answer("Central Style Sheet"),
      new Answer("Cascading Central Sheet"),
    ],
    "Cascading Style Sheet"
  ),
  new Question(
    "What does HTML stand for?",
    [
      new Answer("HyperLoop MarkUp Language"),
      new Answer("HyperText Machine Language"),
      new Answer("HyperText MarkUp Language"),
      new Answer("HyperLoop Markdown Language"),
    ],
    "HyperText MarkUp Language"
  ),
  new Question(
    "What year was JavaScript launched?",
    [
      new Answer("1999"),
      new Answer("2000"),
      new Answer("1997"),
      new Answer("1995"),
    ],
    "1995"
  ),
  new Question(
    "What was the original name of the Apple Macintosh XL computer?",
    [
      new Answer("Lisa 2"),
      new Answer("Mac Daddy"),
      new Answer("Granny Smith"),
      new Answer("Orange XL"),
    ],
    "Lisa 2"
  ),
  new Question(
    "What was the title of Beethoven's only completed opera?",
    [
      new Answer("Faust"),
      new Answer("The Silence"),
      new Answer("Immortal Beloved"),
      new Answer("Fidelio"),
    ],
    "Fidelio"
  ),
  new Question(
    "What's the third letter of the Greek alphabet?",
    [
      new Answer("delta"),
      new Answer("gamma"),
      new Answer("phi"),
      new Answer("theta"),
    ],
    "gamma"
  ),
  new Question(
    "Where is the Louvre museum?",
    [
      new Answer("Paris"),
      new Answer("Lyon"),
      new Answer("Geneva"),
      new Answer("Vichy"),
    ],
    "Paris"
  ),
  new Question(
    "Which of the following is a sports award?",
    [
      new Answer("Oscar"),
      new Answer("Emmy"),
      new Answer("Nobel"),
      new Answer("Espy"),
    ],
    "Espy"
  ),
  new Question(
    "Which of these countries is not in Europe?",
    [
      new Answer("Italy"),
      new Answer("Spain"),
      new Answer("Greece"),
      new Answer("Egypt"),
    ],
    "Egypt"
  ),
];

let nextButton = document.getElementById("next-btn");
let previousButton = document.getElementById("previous-btn");
let submitButton = document.getElementById("submit-btn");
let markButton = document.getElementById("mark-btn");

let currentQuestionIndex = 0;
let selectedAnswers = new Array(questions.length).fill(null);
let markedQuestions = [];
const examDuration = 10 * 1; // 10 seconds
let timeRemaining = examDuration;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadQuestion() {
  const examDiv = document.getElementById("exam");
  const que = document.querySelector("#que");
  examDiv.innerHTML = "";
  que.innerHTML = `Question ${currentQuestionIndex + 1}`;

  const question = questions[currentQuestionIndex];
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");

  const title = document.createElement("div");
  title.classList.add("question-title", "card-head", "p-4");
  title.innerText = question.title;
  questionDiv.appendChild(title);

  const answersList = document.createElement("ul");
  answersList.classList.add("answers");
  question.answers.forEach((answer, answerIndex) => {
    const answerItem = document.createElement("li");
    const answerInput = document.createElement("input");
    answerInput.type = "radio";
    answerInput.id = `question${answerIndex}`;
    answerInput.name = `question${currentQuestionIndex}`;
    answerInput.value = answer.body;
    if (selectedAnswers[currentQuestionIndex] === answer.body) {
      answerInput.checked = true;
    }
    answerItem.appendChild(answerInput);

    const answerLabel = document.createElement("label");
    answerLabel.setAttribute("for", `question${answerIndex}`);
    answerLabel.innerText = answer.body;
    answerItem.appendChild(answerLabel);

    answerItem.addEventListener("click", () => {
      answerInput.checked = true;
      selectedAnswers[currentQuestionIndex] = answer.body;
    });

    answersList.appendChild(answerItem);
    answerItem.classList.add("card-body", "p-3", "m-2");
  });
  questionDiv.appendChild(answersList);

  examDiv.appendChild(questionDiv);

  document.getElementById("previous-btn").style.display =
    currentQuestionIndex === 0 ? "none" : "inline";

  document.getElementById("next-btn").style.display =
    currentQuestionIndex === questions.length - 1 ? "none" : "inline";

  const markButton = document.getElementById("mark-btn");
  markButton.innerText = markedQuestions.includes(currentQuestionIndex)
    ? "Unmark"
    : "Mark";
}

function saveAnswer() {
  const selectedAnswer = document.querySelector(
    `input[name="question${currentQuestionIndex}"]:checked`
  );
  if (selectedAnswer) {
    selectedAnswers[currentQuestionIndex] = selectedAnswer.value;
    // Add 'selected' class to the chosen answer
    document
      .querySelectorAll(`input[name="question${currentQuestionIndex}"]`)
      .forEach((input) => {
        input.parentElement.classList.toggle("selected", input.checked);
      });
  }
}

nextButton.addEventListener("click", function nextQuestion() {
  saveAnswer();
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
});

previousButton.addEventListener("click", function previousQuestion() {
  saveAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
});

markButton.addEventListener("click", function toggleMarkQuestion() {
  const markButton = document.getElementById("mark-btn");
  if (markedQuestions.includes(currentQuestionIndex)) {
    markedQuestions = markedQuestions.filter(
      (index) => index !== currentQuestionIndex
    );
    markButton.innerText = "Mark";
  } else {
    markedQuestions.push(currentQuestionIndex);
    markButton.innerText = "Unmark";
  }
  updateMarkList();
});

function updateMarkList() {
  const markListDiv = document.getElementById("mark-list");
  const markListContent = markListDiv.querySelector(".mark-container");

  markListContent.classList.add("w-100");

  // Clear previous list but keep the header
  markListContent.innerHTML = "";

  markedQuestions.forEach((index) => {
    const markButton = document.createElement("button");
    markButton.classList.add("btn", "btn-success", "w-100", "mb-2");
    markButton.innerText = `Question ${index + 1}`;
    markButton.onclick = () => goToQuestion(index);
    markListContent.appendChild(markButton);
  });
}

function goToQuestion(index) {
  saveAnswer();
  currentQuestionIndex = index;
  loadQuestion();
}
function submitExam() {
  saveAnswer();
  let score = 0;
  questions.forEach((question, index) => {
    if (selectedAnswers[index] === question.modelAnswer) {
      score++;
    }
  });

  const percentage = (score / questions.length) * 100;

  localStorage.setItem("score", score);
  localStorage.setItem("total", questions.length);
  localStorage.setItem("percentage", percentage);

  location.replace("results.html");
}

submitButton.addEventListener("click", function submitExam() {
  saveAnswer();
  let score = 0;
  questions.forEach((question, index) => {
    if (selectedAnswers[index] === question.modelAnswer) {
      score++;
    }
  });

  const percentage = (score / questions.length) * 100;

  localStorage.setItem("score", score);
  localStorage.setItem("total", questions.length);
  localStorage.setItem("percentage", percentage);

  location.replace("results.html");
});

function startTimer() {
  const progressBar = document.getElementById("progress-bar");
  const timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      const progressPercent =
        ((examDuration - timeRemaining) / examDuration) * 100;
      progressBar.style.width = `${progressPercent}%`;
    } else {
      clearInterval(timerInterval);
      submitExam();
    }
  }, 1000);
}

window.onload = () => {
  shuffle(questions);
  loadQuestion();
  startTimer();
};

const questions = [
  {
    question: "Which animal has three hearts?",
    options: ["Dolphin", "Octopus", "Shark", "Whale"],
    correct: "Octopus"
  },
  {
    question: "Which country is the home to kangaroos?",
    options: ["Brazil", "Germany", "South Africa", "Australia"],
    correct: "Australia"
  },
  {
    question: "What movie features the quote, I'm the king of the world?",
    options: ["Avatar", "Titanic", "Inception", "Me Before You"],
    correct: "Titanic"
  },
  {
    question: "Which musical instrument has 88 keys?",
    options: ["Guitar", "Harp", "Piano", "Drums"],
    correct: "Piano"
  },
  {
    question: "What is the chemical symbol for potassium?",
    options: ["Ag", "Fe", "Au", "K"],
    correct: "K"
  }
];

let currentQuestion = 0;
let score = 0;
let quizStarted = false;

const startBtn = document.getElementById('start-btn');
const quizContent = document.getElementById('quiz-content');
const questionContainer = document.getElementById('question-container');
const resultDiv = document.getElementById('result');

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
  quizStarted = true;
  startBtn.classList.add('hidden');
  quizContent.classList.remove('hidden');
  showQuestion();
}

/* ✅ MISSING FUNCTION — NOW ADDED */
function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const question = questions[currentQuestion];

  questionContainer.innerHTML = `
    <div>
      <h2 class="text-xl font-semibold mb-4">
        Question ${currentQuestion + 1} of ${questions.length}
      </h2>
      <p class="mb-6">${question.question}</p>
      <div class="space-y-3">
        ${question.options.map((option, index) => `
          <button
            class="option-btn w-full bg-gray-100 hover:bg-gray-200 py-3 px-4 rounded"
            onclick="checkAnswer(${index})">
            ${option}
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function checkAnswer(selectedIndex) {
  if (!quizStarted) return;

  const question = questions[currentQuestion];
  const buttons = document.querySelectorAll('.option-btn');
  const selectedOption = question.options[selectedIndex];

  buttons.forEach(btn => btn.disabled = true);

  if (selectedOption === question.correct) {
    buttons[selectedIndex].classList.add('bg-green-500', 'text-white');
    score++;
  } else {
    buttons[selectedIndex].classList.add('bg-red-500', 'text-white');

    const correctIndex = question.options.indexOf(question.correct);
    buttons[correctIndex].classList.add('bg-green-500', 'text-white');
  }

  setTimeout(() => {
    currentQuestion++;
    showQuestion();
  }, 1500);
}

function showResult() {
  questionContainer.innerHTML = '';
  resultDiv.classList.remove('hidden');

  resultDiv.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Quiz Complete!</h2>
    <p>Your score: ${score} / ${questions.length}</p>
    <button onclick="resetQuiz()"
      class="mt-4 bg-blue-500 text-white px-6 py-3 rounded">
      Try Again
    </button>
  `;
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  quizStarted = false;
  resultDiv.classList.add('hidden');
  startBtn.classList.remove('hidden');
  quizContent.classList.add('hidden');
}

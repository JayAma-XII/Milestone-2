const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const restartButton = document.getElementById("restart");

// Contains the list of questions and answers that are used within the quiz
const quizQuestions = [
  {
    question: "What is the Emperor of Mankind’s throne called?",
    answers: { a: "The Golden Throne", b: "The Iron Throne", c: "The Throne of Terra" },
    correctAnswer: "a"
  },
  {
    question: "Which Chaos God is known as the Blood God?",
    answers: { a: "Tzeentch", b: "Khorne", c: "Slaanesh" },
    correctAnswer: "b"
  },
  {
    question: "What are the Space Marines’ gene-seed derived from?",
    answers: { a: "Primarchs", b: "Custodians", c: "Adeptus Mechanicus" },
    correctAnswer: "a"
  },
  {
    question: "Which xenos race is obsessed with unending war and fighting?",
    answers: { a: "Orks", b: "Eldar", c: "Tau" },
    correctAnswer: "a"
  },
  {
    question: "What is the name of the psychic storm that spans the galaxy?",
    answers: { a: "The Maelstrom", b: "The Warp", c: "The Cicatrix Maledictum" },
    correctAnswer: "c"
  },
  {
    question: "Who betrayed the Emperor during the Horus Heresy?",
    answers: { a: "Magnus the Red", b: "Lorgar", c: "Horus Lupercal" },
    correctAnswer: "c"
  },
  {
    question: "What is the battle cry of the Imperial Guard?",
    answers: { a: "Blood for the Blood God!", b: "For the Greater Good!", c: "For the Emperor!" },
    correctAnswer: "c"
  },
  {
    question: "Which Chaos God is known as the Lord of Change?",
    answers: { a: "Nurgle", b: "Tzeentch", c: "Khorne" },
    correctAnswer: "b"
  },
  {
    question: "What are Tyranids known for?",
    answers: { a: "Worshipping Chaos", b: "Devouring entire worlds", c: "Creating WAAAGH! energy" },
    correctAnswer: "b"
  },
  {
    question: "What is the name of the Adeptus Astartes’ main infantry unit?",
    answers: { a: "Tactical Marines", b: "Guardsmen", c: "Pathfinders" },
    correctAnswer: "a"
  },
  {
    question: "Which Primarch is still loyal and missing in the Warp?",
    answers: { a: "Leman Russ", b: "Perturabo", c: "Fulgrim" },
    correctAnswer: "a"
  },
  {
    question: "What is the Tau Empire’s central philosophy?",
    answers: { a: "The Path of Glory", b: "The Greater Good", c: "Unity through Chaos" },
    correctAnswer: "b"
  },
  {
    question: "Who is the Chaos God of decay and disease?",
    answers: { a: "Khorne", b: "Slaanesh", c: "Nurgle" },
    correctAnswer: "c"
  },
  {
    question: "What are Necrons famous for?",
    answers: { a: "Being immortal machine warriors", b: "Using psychic powers", c: "Spreading corruption" },
    correctAnswer: "a"
  },
  {
    question: "What is the Black Library?",
    answers: { a: "A Chaos artifact", b: "The Eldar’s repository of forbidden knowledge", c: "An Imperial databank" },
    correctAnswer: "b"
  }
];

// Fisher-Yates shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Grabs 5 questions at random from the list of questions above
function getRandomQuestions(questions, num = 5) {
  const shuffled = shuffleArray([...questions]);
  return shuffled.slice(0, num);
}

let selectedQuestions = [];

function buildQuiz() {
  const output = [];
  selectedQuestions = getRandomQuestions(quizQuestions, 5);

  selectedQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    const answerKeys = ["a", "b", "c"]; // fixed order

    answerKeys.forEach(letter => {
      if (currentQuestion.answers[letter]) {
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter}: ${currentQuestion.answers[letter]}
          </label>`
        );
      }
    });

    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
      <div class="answers"> ${answers.join("")} </div>`
    );
  });

  quizContainer.innerHTML = output.join("");
  resultsContainer.innerHTML = ""; // clear old results
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");
  let numCorrect = 0;

  selectedQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainer.style.color = "gold";
    } else {
      answerContainer.style.color = "red";
    }
  });

  resultsContainer.innerHTML = `You got ${numCorrect} out of ${selectedQuestions.length} correct.`;
}

// Restart quiz
function restartQuiz() {
  buildQuiz();
}

buildQuiz();
submitButton.addEventListener("click", showResults);
restartButton.addEventListener("click", restartQuiz);
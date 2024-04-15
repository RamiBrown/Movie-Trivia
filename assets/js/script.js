const startButton = document.getElementById('startButton');
const nextButton = document.getElementById('nextButton');
const questionContainerElement = document.getElementById('questionContainer');
const questionElement = document.getElementById('question');
const questionImage = document.getElementById('questionImage');
const answerButtonsElement = document.getElementById('answerButtons');
const resultElement = document.getElementById('result');
let shuffledQuestions, currentQuestionIndex;
let score = 0;

const questions = [
    {
        question: "Who directed the movie 'Inception'?",
        answers: [
            { text: "Christopher Nolan", correct: true },
            { text: "Steven Spielberg", correct: false },
            { text: "Martin Scorsese", correct: false },
            { text: "Quentin Tarantino", correct: false }
        ],
        image: "images/inception.jpg"
    },
    {
        question: "What year was 'The Godfather' released?",
        answers: [
            { text: "1972", correct: true },
            { text: "1968", correct: false },
            { text: "1979", correct: false },
            { text: "1980", correct: false }
        ],
        image: "images/godfather.jpg"
    }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hidden');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hidden');
    setNextQuestion();
    score = 0;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    questionImage.src = question.image;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hidden');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hidden');
        resultElement.innerText = `Quiz completed. Your score: ${score}`;
        resultElement.classList.remove('hidden');
    }
    if (correct) {
        score++;
    }
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
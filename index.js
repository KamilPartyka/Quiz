// targeting
const startSection = document.querySelector('.start');
const startButton = document.querySelector('.start__button');
const quizSection = document.querySelector('.quiz');
const scoreSection = document.querySelector('.score');

const quizImg = document.querySelector('.quiz__img');
const quizQuestion = document.querySelector('.quiz__question');
const timerCouter = document.querySelector('.quiz__timer-couter');
const timeGauge = document.querySelector('.quiz__timer-gaugeB');
const quizAnswers = document.querySelector('.quiz__answers');
const questionCounter = document.querySelector('.quiz__questionCounter');

// variables

const questionsArr = [
	{
		question: 'Ile jest 2+2?',
		answerA: '22',
		answerB: '4',
		answerC: '512',
		correctAnswer: 'B',
	},
	{
		question: 'Ile jest 2+2 w JS?',
		answerA: '16',
		answerB: '4',
		answerC: '22',
		correctAnswer: 'C',
	},
	{
		question: 'co to jest: małe czarne i dydna?',
		answerA: 'małe czarne dyndadałko',
		answerB: 'mały pająk na skakance',
		answerC: 'duży niebieski pająk na hulajnodze',
		correctAnswer: 'A',
	},
];

let lastQuestionIndex = questionsArr.length - 1;
let runingQuestionIndex = 0;

const timeForAnwser = 15;
const gaugeWidth = 150;
let count = timeForAnwser;
const gaugeProgress = gaugeWidth / timeForAnwser;

let TIMER;
let score = 0;
// render question function

function renderQuestion() {
	let question = questionsArr[runingQuestionIndex];
	quizImg.innerHTML = `<img src="https://via.placeholder.com/150" alt="question img" />`;
	quizQuestion.innerHTML = `<p> ${question.question} </p>`;
	quizAnswers.innerHTML = `
					<div class="quiz__answers-choice" onclick="checkAnswer('A')">
						${question.answerA}
					</div>
					<div class="quiz__answers-choice" onclick="checkAnswer('B')">
						${question.answerB}
					</div>
					<div class="quiz__answers-choice" onclick="checkAnswer('C')">
						${question.answerC}
					</div>`;
}

// render counter

function renderCounter() {
	if (count >= 0) {
		timerCouter.innerHTML = count;
		timeGauge.style.width = gaugeProgress * count + 'px';
		count--;
	} else {
		count = timeForAnwser;
		timerCouter.innerHTML = count;
		timeGauge.style.width = gaugeProgress * count + 'px';
		if (runingQuestionIndex < lastQuestionIndex) {
			runingQuestionIndex++;
			renderQuestion();
			renderQuestionCounter();
		} else {
			clearInterval(TIMER);
			renderScore();
			quizSection.classList.toggle('hide');
			scoreSection.classList.toggle('hide');
		}
	}
}

// check answer

function checkAnswer(answer) {
	if (answer === questionsArr[runingQuestionIndex].correctAnswer) {
		score++;
	}
	count = timeForAnwser;
	if (runingQuestionIndex < lastQuestionIndex) {
		runingQuestionIndex++;
		renderQuestion();
		renderQuestionCounter();
	} else {
		clearInterval(TIMER);
		renderScore();
		quizSection.classList.toggle('hide');
		scoreSection.classList.toggle('hide');
	}
}

// render question counter

function renderQuestionCounter() {
	questionCounter.innerHTML = `<p class="score__text">Pytanie: ${runingQuestionIndex} z ${questionsArr.length}</p>`;
}

// render Score

function renderScore() {
	const scorePerCent = Math.round((100 * score) / questionsArr.length);
	scoreSection.innerHTML = `
				<img
					class="score__img"
					src="${scorePerCent > 50 ? 'img/happy-icon.png' : 'img/sad-icon.png'}"
					alt="score img"
				/>
				<p class="score__text">Poprawne odpowiedzi: ${score} z ${
		questionsArr.length
	}</p>
	<button class="score__restartButton" onclick='restartButton()'>Od nowa</button>
	`;
}

// startButton event listener

startButton.addEventListener('click', () => {
	startSection.classList.toggle('hide');
	quizSection.classList.toggle('hide');
	renderQuestion();
	renderQuestionCounter();
	TIMER = setInterval(renderCounter, 1000);
});

// restartButton function

function restartButton() {
	location.reload();
}

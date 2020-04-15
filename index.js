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
let TIMER;

// render question function

function renderQuestion() {
	let question = questionsArr[runingQuestionIndex];
	quizImg.innerHTML = `<img src="https://via.placeholder.com/150" alt="question img" />`;
	quizQuestion.innerHTML = `<p> ${question.question} </p>`;
	quizAnswers.innerHTML = `
					<div class="quiz__answers-choice" id="A">
						${question.answerA}
					</div>
					<div class="quiz__answers-choice" id="B">
						${question.answerB}
					</div>
					<div class="quiz__answers-choice" id="C">
						${question.answerC}
					</div>`;
}

// render counter
const timeForAnwser = 15;
const gaugeWidth = 150;
let count = timeForAnwser;
const gaugeProgress = gaugeWidth / timeForAnwser;

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
		} else {
			clearInterval(TIMER);
			quizSection.classList.toggle('hide');
			scoreSection.classList.toggle('hide');
		}
	}
}

// startButton event listener

startButton.addEventListener('click', () => {
	startSection.classList.toggle('hide');
	quizSection.classList.toggle('hide');
	renderQuestion();
	TIMER = setInterval(renderCounter, 1000);
});

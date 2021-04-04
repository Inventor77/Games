let elements = document.querySelectorAll('.flex-box div');
let flexBox = document.querySelector('.flex-box');

elements.forEach((element) => {
	element.addEventListener('click', () => {
		let humanChoice, botChoice;
		humanChoice = element.className;

		botChoice = randomRPS();

		let results = compete(humanChoice, botChoice);
		message = finalMessage(results);
		
		uiDisplay(element.className, botChoice, message);
	});
});

let randomRPS = () => {
	let arr = ['rock', 'paper', 'scissor'];
	let random_num = Math.floor(Math.random() * 3);
	return arr[random_num];
};

let compete = (humanChoice, computerChoice) => {
	let rpsDataBase = {
		rock: {
			scissor: 1,
			rock: 0.5,
			paper: 0,
		},
		paper: {
			scissor: 0,
			rock: 1,
			paper: 0.5,
		},
		scissor: {
			scissor: 0.5,
			rock: 1,
			paper: 1,
		},
	};

	let humanScore = rpsDataBase[humanChoice][computerChoice];
	let computerScore = rpsDataBase[computerChoice][humanChoice];

	return [humanScore, computerScore];
};

let finalMessage = ([humanScore, computerScore]) => {
	if (humanScore === 0) {
		return {
			message: 'You Lost!',
			color: 'red',
		};
	} else if (humanScore === 0.5) {
		return {
			message: 'You Tied!',
			color: 'yellow',
		};
	} else {
		return {
			message: 'You Won!',
			color: 'blue',
		};
	}
};

let uiDisplay = (humanImgChoice, botImgChoice, finalMessage) => {
	let elementsDatabase = {
		rock: document.querySelector('.rock'),
		paper: document.querySelector('.paper'),
		scissor: document.querySelector('.scissor'),
	};

	document.querySelector('.rock').remove();
	document.querySelector('.paper').remove();
	document.querySelector('.scissor').remove();

	let humanChoiceUI = document.createElement('div');
	let botChoiceUI = document.createElement('div');
	let finalMessageUI = document.createElement('span');

	humanChoiceUI.innerHTML = `${elementsDatabase[humanImgChoice].className}`;
	humanChoiceUI.className = `${elementsDatabase[humanImgChoice].className}`;
	humanChoiceUI.style.boxShadow = '0 10px 40px rgb(37, 50, 233)';
	finalMessageUI.innerHTML = `<h3 class="final-message" style="color:${finalMessage['color']};
	">${finalMessage['message']}</h3>`;
	botChoiceUI.innerHTML = `${elementsDatabase[botImgChoice].className}`;
	botChoiceUI.className = `${elementsDatabase[botImgChoice].className}`;
	botChoiceUI.style.boxShadow = '0 10px 40px rgb(243, 38, 23)';

	flexBox.appendChild(humanChoiceUI);
	flexBox.appendChild(finalMessageUI);
	flexBox.appendChild(botChoiceUI);
};

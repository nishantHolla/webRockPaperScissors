
// DOM elements

const DOM_PLAYER_STATUS = document.querySelector('.player-status')
const DOM_COMPUTER_STATUS = document.querySelector('.computer-status')
const DOM_GAME_RESULT = document.querySelector('.game-result')
const DOM_GAME_SCORE = document.querySelector('.game-score')

const DOM_MOVE_BUTTONS = document.querySelectorAll('.player-move-btn')
const DOM_ROCK_CARD = document.querySelector('.move-card-rock')
const DOM_PAPER_CARD = document.querySelector('.move-card-paper')
const DOM_SCISSORS_CARD = document.querySelector('.move-card-scissors')


// Game data

const CHOICES = ['rock', 'paper', 'scissors']
const TITLES = {'rock': 'Rock', 'paper': 'Paper', 'scissors': 'Scissors'}
let playerScore = 0;
let computerScore = 0;

// Game functions

function getComputerChoice() {
	const SELECTION = Math.floor(Math.random() * CHOICES.length)
	return CHOICES[SELECTION]
}

function play(playerSelection, computerSelection) {
	playerSelection = playerSelection.toLowerCase()
	computerSelection = computerSelection.toLowerCase()

	if (!CHOICES.includes(playerSelection) || !CHOICES.includes(computerSelection))
		throw "Error: Invalid selection"

	if (playerSelection === computerSelection)
		return -1

	let playerWon = false;
	if (
		playerSelection === "rock" && computerSelection === "scissors" ||
		playerSelection === "paper" && computerSelection === "rock" ||
		playerSelection === "scissors" && computerSelection === "paper"
	) {
		playerWon = true
	}

	if (playerWon)
		return 1
	else
		return 0
}

function updateStatus(_statusElement, _move) {
	const previousCard = _statusElement.querySelector('.status-card')
	if (previousCard)
		_statusElement.removeChild(previousCard)

	let card;
	switch (_move) {
		case 'rock':
			card = DOM_ROCK_CARD
			break
		case 'paper':
			card = DOM_PAPER_CARD
			break
		case 'scissors':
			card = DOM_SCISSORS_CARD
			break
	}

	card = card.cloneNode(true)
	card.classList.add('status-card')
	_statusElement.appendChild(card)
}

function updateScore() {
	DOM_GAME_SCORE.innerText = `Player score: ${playerScore} | Computer score: ${computerScore}`
}

function updateVerdict(_result, _playerMove, _computerMove) {
	let verdict = ''
	switch (_result) {
		case -1:
			verdict = `Both played ${_playerMove}. It\'s a draw`
			break;
		case 0:
			verdict = `${TITLES[_computerMove]} beats ${TITLES[_playerMove]}. Computer wins!`
			computerScore++;
			break;
		case 1:
			verdict = `${TITLES[_playerMove]} beats ${TITLES[_computerMove]}. You win!`
			playerScore++;
			break;
	}
	console.log(verdict)
	DOM_GAME_RESULT.innerText = verdict
}

// Set game actions

DOM_MOVE_BUTTONS.forEach(BUTTON => {
	BUTTON.addEventListener('click', function(event) {
		const PLAYER_MOVE = this.dataset.moveId
		updateStatus(DOM_PLAYER_STATUS, PLAYER_MOVE)

		const COMPUTER_MOVE = getComputerChoice()
		updateStatus(DOM_COMPUTER_STATUS, COMPUTER_MOVE)

		const RESULT = play(PLAYER_MOVE, COMPUTER_MOVE)
		updateVerdict(RESULT, PLAYER_MOVE,COMPUTER_MOVE)
		updateScore()
	})
})

// Init game

updateScore()

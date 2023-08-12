
const CHOICES = ["rock", "paper", "scissors"]

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

function game() {	
	let playerScore = 0;
	let computerScore = 0;

	for (let i=0; i<5; i++) {
		const playerSelection = prompt("Your selection: ")
		const computerSelection = getComputerChoice()
		const result = play(playerSelection, computerSelection)

		if (result === 1) {
			playerScore++;
			console.log(`You win! ${playerSelection} beats ${computerSelection}`)
		}
		else if (result == 0) {
			computerScore++;
			console.log(`You lose! ${computerSelection} beats ${playerSelection}`)
		}
		else {
			console.log(`Draw`)
		}

	}

	console.log(`Player Score: ${playerScore} | Computer Score: ${computerScore}`)
	if (playerScore === computerScore)
		console.log("It's a draw!")
	else if (playerScore >= computerScore)
		console.log("You win!")
	else
		console.log("You lose!")
}

var yDivideOffset;
var xOffset;
var xDivideOffset;
var yDivideOffset;
var PieceSize;
var BorderX;
var DepthOfAI = 6;
let game;
let coloum;
let ForwardButton;
let legit = true
var HintOutcome = null

async function setup() {  
	createCanvas(1000, 600);
	game = new Connect4();
	PieceSize = 80;  
	yOffset = (height * 17) / 350 + 14; 
	xOffset = (width * 20) / 350 -3;  
	xDivideOffset = 10;
	yDivideOffset = 6;
	BorderX = (width * 250) / 350;
	ForwardButton = createButton("Forward");
	BackButton = createButton("Back");
	BackButton.mouseClicked(MoveBack);
	ForwardButton.mouseClicked(MoveForward);
	DepthSlider = createSlider(2, 12, 6,1);
	hintButton = createButton("HINT");
	hintButton.mouseClicked(hint)
	RedAICheckBox = createCheckbox("RED AI", false);
	BLACKAICheckBox = createCheckbox("BLACK AI", true);

}
function hint(){
	legit = false
	console.log(player)
	if (player == 'red'){
		decision = minimax(
			game,
			8,
			-Infinity,
			Infinity,
			true,
			true
		);
		HintOutcome = argmax(decision)+1;

	}else{
		decision = minimax(
			game,
			8,
			-Infinity,
			Infinity,
			false,
			true
		);
		HintOutcome = argmin(decision)+1;
		console.log(decision)

	}
}
function MoveBack() {
	console.log(Logs);
	console.log(currentState);
	if (!playing) {
		currentState -= 1;
		NewState = Logs[currentState];
		console.log(NewState);
		game = NewState[0];
		moves = NewState[1];
		outcome = NewState[2];
		choice = NewState[3];
	}
}
function MoveForward() {
	console.log(Logs);
	console.log(currentState);
	if (!playing) {
		if (currentState + 1 < Logs.length) {
			currentState += 1;
			NewState = Logs[currentState];
			console.log(NewState);
			game = NewState[0];
			moves = NewState[1];
			outcome = NewState[2];
			choice = NewState[3];
		}
	}
}
let clicked = false;
let moves = [];
let AI = "black";
let player = "red";
let BothAI = false;
let playing = false;
let outcome = "undefind";
let currentState = -1;
let Logs = [];
function draw() {
	DepthOfAI = DepthSlider.value();
	let selectedPiece = null;
	let color = null;
	let choice = null;
	background(51);
	if (playing) {
		if (game.turn == AI || BothAI) {
			moves = [];
			selectedPiece = findpiecefromPos([mouseX, mouseY]);
			if (BothAI) {
				if (game.turn == AI) {
					color = (255, 0, 0);
					moves = minimax(
						game,
						DepthOfAI,
						-Infinity,
						Infinity,
						true,
						true,true
					);
					choice = argmax(moves);
				} else {
					moves = minimax(game,DepthOfAI,-Infinity,Infinity,false,true,true);
					color = (0, 0, 0);
					choice = argmin(moves);
				}
			} else {
				if (AI == "red") {
					color = (255, 0, 0);
					moves = minimax(
						game,
						DepthOfAI,
						-Infinity,
						Infinity,
						true,
						true,true
					);
					//moves
					choice = argmax(moves);
				} else {
					moves = minimax(game,DepthOfAI,-Infinity,Infinity,false,true,true);
					color = (0, 0, 0);
					choice = argmin(moves);
				}
			}
		} else {
			color = (0, 0, 0);
			if (AI != "red") color = (255, 0, 0);
			selectedPiece = findpiecefromPos([mouseX, mouseY]);
			if (clicked) {
				if (
					selectedPiece[0] * (width / xDivideOffset) + xOffset <
						BorderX &&
					selectedPiece[1] * (height / yDivideOffset) + yOffset <
						height
				)
					choice = selectedPiece[0];
			}
		}
		if (choice != null) {
			HintOutcome = null
			try {
				game.place(game.turn, choice);
				
			} catch (error) {
				console.log(moves,choice)
			}
			win = game.CheckForConnect();
			if (win == true) {
				console.log("RED WON");
				outcome = "red";
				playing = false;
			} else if (win == false) {
				console.log("BLACK WON");
				outcome = "black";
				playing = false;
			}
			let fullBoard = game.checkForDraw();
			if (fullBoard) {
				console.log("DRAW");
				outcome = "draw";
				playing = false;
			}
			game.draw();
			Logs.push(createSave(game, moves, outcome, choice));
			currentState += 1;
		} else {
			if (
				selectedPiece != null &&
				selectedPiece[0] * (width / xDivideOffset) + xOffset < BorderX
			) {
				if (game.turn == "red") fill(255, 0, 0);
				else fill(0, 0, 0);

				circle(
					selectedPiece[0] * (width / xDivideOffset) + xOffset,
					selectedPiece[1] * (height / yDivideOffset) + yOffset,
					PieceSize
				);
				selectedPiece = null;
			}
		}
		game.draw();
		drawUI();
	} else {
		game.draw();
		drawUI();
		push();
		fill(255);
		textSize(30);
		textAlign(CENTER);
		text("SPACE TO Start", BorderX / 2, height / 2 + 50);
		pop();
		if (outcome == "black") {
			push();
			fill(255);
			textSize(30);
			textAlign(CENTER);
			text("BLACK WON", BorderX / 2, height / 2);
			pop();
		} else if (outcome == "red") {
			push();
			fill(255);
			textSize(30);
			textAlign(CENTER);
			text("RED WON", BorderX / 2, height / 2);
			pop();
		} else if (outcome == "draw") {
			push();
			fill(255);
			textSize(30);
			textAlign(CENTER);
			text("DRAW", BorderX / 2, height / 2);
			pop();
		}
	}
	clicked = false;
}
function findpiecefromPos(pos) {
	let coloum = int(pos[0] / (width / xDivideOffset));
	let row = int(pos[1] / (height / yDivideOffset));
	return [coloum, row];
}
function mouseClicked() {
	clicked = true;
}
function keyTyped(ev) {
	if (ev.code == "Space") {
		if (playing == false) { 
			BothAI = false;
			logs = [];
			currentState = -1;
			game = new Connect4();
			if (BLACKAICheckBox.checked() && RedAICheckBox.checked()) {
				AI = "red";
				player = "black";
				BothAI = true;
			} else if (RedAICheckBox.checked()) {
				AI = "red";
				player = "black";
			} else if (BLACKAICheckBox.checked()) {
				AI = "black";
				player = "red";
			}
			legit = true
		}
		playing = true;
		outcome = undefined;
	}
}
function drawUI() {
	push();
	fill(0);
	strokeWeight(5);
	line(BorderX, 0, BorderX, height);
	line(6, 0, width, 0);
	line(6, height, width, height);
	line(4, height, 4, 0);
	line(width, height, width, 0);
	textStyle("BOLDITALIC");
	textSize(15);
	text("TURN:" + game.turn, BorderX + 10, 15);
	if (HintOutcome != null){
		text("HINT:"+HintOutcome,BorderX+80,270);
	}
	text("DEPTH:" + DepthOfAI, BorderX + 10, 30);
	text("BLACK AI:" + BLACKAICheckBox.checked(), BorderX + 10, 50);
	text("RED AI:" + RedAICheckBox.checked(), BorderX + 10, 70);
	if (game.turn == "black") text("MAXIMINZING", BorderX + 10, 90);
	else text("MINIMIZING", BorderX + 10, 90);
	let h = 120;
	let coloum = 1;
	for (let move of moves) {
		text(coloum + ":" + move, BorderX + 10, h);
		h += 20;
		coloum += 1;
	}
	for (let i = 1; i < 8;i++){
		strokeWeight(2);
		text(i,((i-1) * (width / xDivideOffset))+7,height-5) 
		line(((i-1) * (width / xDivideOffset))+5, 0, ((i-1) * (width / xDivideOffset))+5, height);
	}
	pop();
}
function createSave(game, moves, outcome, choice) {
	NewGame = new Connect4();
	NewGame.board = copyArray(game.board);
	return [NewGame, moves, outcome, choice];
}

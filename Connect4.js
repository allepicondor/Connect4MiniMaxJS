class Connect4 {
	constructor() {
		this.board = [
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
		];
		this.turn = "red";
	}
	place(color, coloum) {
		let counter = 0;
		for (let y = 0; y < 6; y++) {
			if (this.board[coloum][y] != 0) {
				counter += 1;
			}
		}
		if (counter == 6) return false;
		let piece = -1;
		let oppColor = "red";
		if (color == "red") {
			piece = 1;
			oppColor = "black";
		}
		for (let y = 0; y < 6; y++)
			if (this.board[coloum][y] != 0) {
				this.board[coloum][y - 1] = piece;
				this.turn = oppColor;
				break;
			} else if (y >= 5) {
				this.board[coloum][y] = piece;
				this.turn = oppColor;
				break;
			}
		return true;
	}
	CheckForConnect() {
		let red = 0;
		let black = 0;
		for (let x = 0; x < 7; x++) {
			for (let y = 0; y < 6; y++) {
				if (this.board[x][y] != 0) {
					let side = this.board[x][y];
					let counter = 0;
					//UP
					for (let yOff = 0; yOff < 4; yOff++) {
						if (y - yOff > -1) {
							if (this.board[x][y - yOff] == side) {
								counter += 1;
							} else {
								break;
							}
						} else {
							break;
						}
					}
					if (side == 1) {
						red += counter;
					} else {
						black += counter;
					}
					if (counter == 4) {
						if (side == 1) {
							return true;
						} else {
							return false;
						}
					}

					//RIGHT
					counter = 0;
					for (let xOff = 0; xOff < 4; xOff++) {
						if (x + xOff < 7) {
							if (this.board[x + xOff][y] == side) {
								counter += 1;
							} else {
								break;
							}
						} else {
							break;
						}
					}
					if (side == 1) {
						red += counter;
					} else {
						black += counter;
					}
					if (counter == 4) {
						if (side == 1) {
							return true;
						} else {
							return false;
						}
					}

					//TOPLeft
					counter = 0;
					for (let xOff = 0; xOff < 4; xOff++) {
						if (x - xOff > -1 && y - xOff > -1) {
							if (this.board[x - xOff][y - xOff] == side) {
								counter += 1;
							} else {
								break;
							}
						} else {
							break;
						}
					}
					if (side == 1) {
						red += counter;
					} else {
						black += counter;
					}
					if (counter == 4) {
						if (side == 1) {
							return true;
						} else {
							return false;
						}
					}
					//TORIGHT
					counter = 0;
					for (let xOff = 0; xOff < 4; xOff++) {
						if (x + xOff < 7 && y - xOff > -1) {
							if (this.board[x + xOff][y - xOff] == side) {
								counter += 1;
							} else {
								break;
							}
						} else {
							break;
						}
					}
					if (side == 1) {
						red += counter;
					} else {
						black += counter;
					}
					if (counter == 4) {
						if (side == 1) {
							return true;
						} else {
							return false;
						}
					}
				}
			}
		}
	}
	checkForDraw() {
		let fullBoard = true;
		for (let x = 0; x < 7; x++) {
			for (let y = 0; y < 6; y++) {
				if (this.board[x][y] == 0) {
					fullBoard = false;
				}
			}
		}
		return fullBoard;
	}
	possible_moves(side) {
		let color = "black";
		if (side == 0) color = "red";
		let possibleMoves = [];
		for (let x = 0; x < 7; x++) {
			let newBoard = new Connect4();
			newBoard.board = copyArray(this.board);
			if (newBoard.place(color, x)) {
				possibleMoves.push(newBoard);
			} else {
				possibleMoves.push(null);
			}
		}
		//console.log(possibleMoves);
		return possibleMoves;
	}

	draw() {
		push();
		stroke(0);
		translate(0, 0);
		for (let x = 0; x < 7; x++) {
			for (let y = 0; y < 6; y++) {
				if (this.board[x][y] == 1) {
					fill(255, 0, 0);
					circle(
						x * (width / xDivideOffset) + xOffset,
						y * (height / yDivideOffset) + yOffset,
						PieceSize
					);
				}
				if (this.board[x][y] == -1) {
					fill(0, 0, 0);
					circle(
						x * (width / xDivideOffset) + xOffset,
						y * (height / yDivideOffset) + yOffset,
						PieceSize
					);
				}
			}
		}
		strokeWeight(5);
		line(BorderX, 0, BorderX, height);
		pop();
	}
}

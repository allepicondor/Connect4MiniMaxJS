function minimax(board, depth, alpha, beta, maximizingPlayer, first = false) {
	function evaluate2(board) {
		let red = 0;
		let black = 0;
		let REDwin = 100;
		let BLACKwin = -100;
		for (let x = 0; x < 7; x++) {
			for (let y = 0; y < 6; y++) {
				if (board[x][y] != 0) {
					let side = board[x][y];
					let counter = 0;
					//UP
					for (let yOff = 0; yOff < 4; yOff++) {
						if (y - yOff > -1) {
							if (board[x][y - yOff] == side) {
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
							return REDwin;
						} else {
							return BLACKwin;
						}
					}

					//RIGHT
					counter = 0;
					for (let xOff = 0; xOff < 4; xOff++) {
						if (x + xOff < 7) {
							if (board[x + xOff][y] == side) {
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
							return REDwin;
						} else {
							return BLACKwin;
						}
					}

					//TOPLeft
					counter = 0;
					for (let xOff = 0; xOff < 4; xOff++) {
						if (x - xOff > -1 && y - xOff > -1) {
							if (board[x - xOff][y - xOff] == side) {
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
							return REDwin;
						} else {
							return BLACKwin;
						}
					}
					//TORIGHT
					counter = 0;
					for (let xOff = 0; xOff < 4; xOff++) {
						if (x + xOff < 7 && y - xOff > -1) {
							if (board[x + xOff][y - xOff] == side) {
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
							return REDwin;
						} else {
							return BLACKwin;
						}
					}
				}
			}
		}
		return red - black;
	}
	function evaluate(board){
		let predict = model.predict(tf.reshape(tf.tensor(game.board),[1,7,6,1])).dataSync()[0];
		return map(predict,0,1,-10,10)
	}
	evaluate
	let anyoneWin = board.CheckForConnect();
	if (depth == 0 || anyoneWin == true || anyoneWin == false) {
		if (anyoneWin == true) {
			if (maximizingPlayer) return -evaluate(board.board) * depth;
			else return evaluate(board.board) * depth;
		}else if(anyoneWin == false){
			if (maximizingPlayer) return -evaluate(board.board) * depth;
			else return evaluate(board.board) * depth;
		}
		if (maximizingPlayer)
			return evaluate(board.board);
		else
			return -evaluate(board.board);

		

	}
	let moves = [];
	if (maximizingPlayer) {
		let maxEval = -Infinity;
		for (let child of board.possible_moves(0)) {
			if (child != null) {
				let ev = minimax(child, depth - 1, alpha, beta, false);
				moves.push(ev);
				maxEval = max(ev, maxEval);
				alpha = max(alpha, ev);
				if (beta <= alpha) break;
			} else moves.push(-Infinity);
		}
		if (first) return moves;
		return maxEval;
	} else {
		let minEval = Infinity;
		for (let child of board.possible_moves(1)) {
			if (child != null) {
				let ev = minimax(child, depth - 1, alpha, beta, true);
				moves.push(ev);
				minEval = min(ev, minEval);
				beta = min(beta, ev);
				if (beta <= alpha) break;
			} else moves.push(Infinity);
		}
		if (first) return moves;
		return minEval;
	}
}

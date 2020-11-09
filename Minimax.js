function minimax(board, depth, alpha, beta, maximizingPlayer, first = false,test) {
	function evaluate(board) {
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
							return REDwin*depth;
						} else {
							return BLACKwin*depth;
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
							return REDwin*depth;
						} else {
							return BLACKwin*depth;
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
							return REDwin*depth;
						} else {
							return BLACKwin*depth;
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
							return REDwin*depth;
						} else {
							return BLACKwin*depth;
						}
					}
				}
			}
		}
		return red - black;
	}
	function evaluateTEST(board) {
		//console.log("TESTIES")
		let red = 0;
		let black = 0;
		let BLACKCOUNTER= 0
		let REDCOUNTER = 0
		let BlackXTotal = 0
		let RedXTotal = 0
		let BlackaveragePos = 0
		let RedaveragePos = 0
		let REDwin = 100;
		let BLACKwin = -100;
		for (let x = 0; x < 7; x++) {
			for (let y = 0; y < 6; y++) {
				if (board[x][y] != 0) {
					let side = board[x][y];
					if (side == 1){
						REDCOUNTER+=1
						RedXTotal += (x+1)
					}else{
						BLACKCOUNTER += 1
						BlackXTotal += (x+1)
					}
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
							return REDwin*depth;
						} else {
							return BLACKwin*depth;
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
							return REDwin*depth;
						} else {
							return BLACKwin*depth;
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
							return REDwin*depth;
						} else {
							return BLACKwin*depth;
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
							return REDwin*depth;
						} else {
							return BLACKwin*depth;
						}
					}
				}
			}
		}
		BlackaveragePos = BlackXTotal/BLACKCOUNTER
		RedaveragePos = RedXTotal/REDCOUNTER
		diff = abs((RedaveragePos-4))-abs((BlackaveragePos-4))
		return (red - black)-diff;
	}
	let anyoneWin = board.CheckForConnect();
	if (depth == 0 || anyoneWin == true || anyoneWin == false || board.checkForDraw()) {
		if (test){
			return evaluateTEST(board.board);
		}
		return evaluate(board.board);
	}
	let moves = [];
	if (maximizingPlayer) {
		let maxEval = -Infinity;
		for (let child of board.possible_moves(0)) {
			if (child != null) {
				let ev = minimax(child, depth - 1, alpha, beta, false,false,test);
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
				let ev = minimax(child, depth - 1, alpha, beta, true,false,test);
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

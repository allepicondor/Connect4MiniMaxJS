function copyArray(array) {
	let NewArray = [];
	for (let level = 0; level < array.length; level++) {
		let newList = [];
		for (let i = 0; i < array[1].length; i++) {
			newList.push(array[level][i]);
		}
		NewArray.push(newList);
	}
	return NewArray;
}

function argmin(array) {
	let min = Infinity;
	let minList = [];
	let minIndex = -1;
	for (let i = 0; i < array.length; i++) {
		if (array[i] < min) {
			min = array[i];
			minIndex = i;
			minList.push(i);
		}
	}
	return minIndex;
}
function argmax(array) {
	let max = -Infinity;
	let maxIndex = -1;
	let maxList = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i] > max) {
			max = array[i];
			maxIndex = i;
			maxList.push(i);
		}
	}

	return maxIndex;
}

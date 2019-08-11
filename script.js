var screen = document.getElementById('screen');
var keyInputs = document.getElementById('whole-thing');
var opKeys = document.getElementById('operator-keys');
var equals = document.getElementById('equals-button');
var clear = document.getElementById('clear-button');

var components = []; // array for stored values
var currNumber = '';
var currOperator = null;
var canDecimal = true;
var canOperator = false;
var evaluated = false;
var screenInput = '';

function handleDecimal(target) {
	if(canDecimal) {
		if(currNumber) {
			screen.innerHTML += target;
		} else {
			screen.innerHTML += '0' + target;
		}
		currNumber += target;
		canDecimal = false;
		canOperator = false;
		evaluated = false;
	}
}

function handleNum(target) {
	var screenOther = screen.innerHTML.slice(0, -1);
	if (screen.innerHTML[screen.innerHTML.length -1] === ')') {
		console.log('itsa )!');
		screen.innerHTML = screenOther + target + ')';
		currNumber += target;
	} else {
		console.log('i dont know what im saying', screen.innerHTML[screen.innerHTML.length -1]);
		screen.innerHTML += target;
		currNumber += target;
	}
	canOperator = true;
	evaluated = false;
}

function handleOp(target) {
	if(canOperator) {
		screen.innerHTML += target;
		canDecimal = true;
		components.push(currNumber);
		currNumber = '';
	} else {
		if(screen.innerHTML === '') {
			screen.innerHTML = '0' + target;
		} else if(currNumber === '') {
			screen.innerHTML = screen.innerHTML.slice(0,-1) + target;
			canDecimal = true;
			components.push(currNumber);
		}
	}
	canOperator = false;
}

function posNeg() {
	let currNumLength = 0 - currNumber.toString().length;
	let screenOther = screen.innerHTML.slice(0, currNumLength);
	// console.log('sliced screen:', screenOther, 'currNumber: ', currNumber);
	currNumber = currNumber * -1;
	if(screen.innerHTML[screen.innerHTML.length -1] === ')') {
		let numberToLength = 0 - currNumber.toString().length - 3;
		console.log('please god say this is working');
			// currNumLength = currNumLength - 2;
		console.log('furious', currNumber, numberToLength);
		screen.innerHTML = screen.innerHTML.slice(0, numberToLength) + currNumber;
	} else if(screenOther === '') {
		console.log('just swappin polarities');
		screen.innerHTML = currNumber;
	} else {
		console.log('everything else');
		console.log(screenOther);
		screen.innerHTML = screenOther + '(' + currNumber + ')';
		console.log(screen.innerHTML);
	} 
	evaluated = false;
}

function clickOp(targ) {
	// console.log('clickOp function:', event);
	if(targ.tagName === 'BUTTON') {
		if(targ.value === '.') {
			handleDecimal(targ.value);
			evaluated = false;
		} else if (event.target.matches('.number')) {
				if(evaluated) {
					screen.innerHTML = '';
					evaluated = false;
				}
			handleNum(targ.value);
		} else if(event.target.matches('.operator')) {
			handleOp(targ.value);
			evaluated = false;
		} else if(event.target.id === 'negate') {
			posNeg();
		}
	}
}

// CHECKS THE LAST CHAR ON THE SCREEN TO SEE IF IT IS AN OPERATOR
function isLastOperator(str) {
	if(str[str.length - 1] === '+' || str[str.length - 1] === '-' || str[str.length - 1] === '*' || str[str.length - 1] === '/') {
		return true;
	}
	return false;
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

keyInputs.addEventListener('click', function(event) {
	clickOp(event.target);
});

equals.addEventListener('click', function(event) {
	var screenContent = screen.innerHTML;
	console.log('about to equals ', screenContent);
	if(isLastOperator(screenContent)) {
		var cleanText = screenContent.slice(0, screenContent.length - 1)
		var answer = eval(cleanText);
		screen.innerHTML = answer;
	} else {
		screenContent = eval(screenContent);
		screen.innerHTML = round(screenContent, 3);
	}
	evaluated = true;
	currNumber = screen.innerHTML;
	console.log('equals event listener: ', event);
});

// REMEMBER EVALUATED FLAG AND CLEARING BEFORE NEW TEXT

clear.addEventListener('click', function(event) {
	screen.innerHTML = '';
	currNumber = '';
});

document.addEventListener('keyup', function(event){
	console.log('KEYUP: ', event);
	if(event.keyCode === 190) {
		handleDecimal(event.key);
	} else if(event.keyCode >= 48 && event.keyCode <= 57) {
		handleNum(event.key);
	} else if(event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
		handleOp(event.key);
	}
});
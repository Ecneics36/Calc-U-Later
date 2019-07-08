var screen = document.getElementById('screen');
var keyInputs = document.getElementById('whole-thing');
var opKeys = document.getElementById('operator-keys');
var equals = document.getElementById('equals-button');
var clear = document.getElementById('clear-button');

var screenComponents = [];
var screenInput = '';
var currNumber = null;
var currOperator = null;
var canDecimal = true;
var canOperator = true;
var evaluated = false;

function handleDecimalKey(target) {
	if (canDecimal) {
		if(currNumber) {
			screen.innerHTML += target;
			currNumber += target;
			canDecimal = false;
			canOperator = false;
			evaluated = false;
		} else {
			screen.innerHTML += target;
			
		}
	}
}

function handleNumKey(target) {
	console.log('handleNumKey function: ', target);
	screen.innerHTML += target;
	canOperator = true;
}

function handleOpKey(target) {
	if(canOperator) {
		screen.innerHTML += target;
		canDecimal = true;
		canOperator = false;
	}
}

function clickOp(targ) {
	console.log('clickOp function:', event);
	if(targ.tagName === 'BUTTON') {
		if(targ.value === '.') {
			handleDecimalKey(targ.value);
			evaluated = false;
		} else if (event.target.matches('.number')) {
				if(evaluated) {
					screen.innerHTML = '';
					evaluated = false;
				}
			handleNumKey(targ.value);
		} else if(event.target.matches('.operator')) {
			handleOpKey(targ.value);
			evaluated = false;
		} else if(event.target.id === 'negate') {
			screen.innerHTML = screen.innerHTML * -1;
			evaluated = false;
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
	console.log(screenContent);
	if(isLastOperator(screenContent)) {
		var cleanText = screenContent.slice(0, screenContent.length - 1)
		var answer = eval(cleanText);
		screen.innerHTML = answer;
	} else {
		screenContent = eval(screenContent);
		screen.innerHTML = round(screenContent, 3);
	}
	evaluated = true;
	console.log('equals event listener: ', event);
});

// REMEMBER EVALUATED FLAG AND CLEARING BEFORE NEW TEXT

clear.addEventListener('click', function(event) {
	screen.innerHTML = '';
});

document.addEventListener('keyup', function(event){
	console.log('KEYUP: ', event);
	if(event.keyCode === 190) {
		handleDecimalKey(event.key);
	} else if(event.keyCode >= 48 && event.keyCode <= 57) {
		handleNumKey(event.key);
	} else if(event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
		handleOpKey(event.key);
	}
});

// var buttonVal = event.target.value;
// if(event.target.tagName === 'BUTTON') {
// 	if(buttonVal === '.') {
// 		if (canDecimal) {
// 			screen.innerHTML += buttonVal;
// 			canDecimal = false;
// 			canOperator = false;
// 		}
// 	} else if (event.target.matches('.number')) {
// 		screen.innerHTML += buttonVal;
// 		canOperator = true;
// 	} else if(event.target.matches('.operator')) {
// 		if(canOperator) {
// 			screen.innerHTML += buttonVal;
// 			canDecimal = true;
// 			canOperator = false;
// 		}
// 	}
// }
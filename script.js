//----------------------------------------------------------------------------------------------------
// CONSTANTS
//----------------------------------------------------------------------------------------------------

var mathSpecialStrings = ["(", ")", "+", "-", "*", "/", "^", "arcsin", "arccos", "arctan", "cos", "sin", "tan", "cot", "sec", "csc", "sqrt", "log", "ln", "PI", "E", "T", ","];
var precedence = {
	"+": 2,
	"-": 2,
	"*": 3,
	"/": 3,
	"^": 5,
	"sin": 4,
	"cos": 4,
	"tan": 4,
	"cot": 4,
	"sec": 4,
	"csc": 4,
	"arcsin": 4,
	"arccos": 4,
	"arctan": 4,
	"sqrt": 4,
	"log": 4,
	"ln": 4,
};
var associativity = {
	"+": "left",
	"-": "left",
	"*": "left",
	"/": "left",
	"^": "right",
	"sin": "right",
	"cos": "right",
	"tan": "right",
	"cot": "right",
	"sec": "right",
	"csc": "right",
	"arcsin": "right",
	"arccos": "right",
	"arctan": "right",
	"sqrt": "right",
	"log": "right",
	"ln": "right",
};
var funcArgs = {
	"+": 2,
	"-": 2,
	"*": 2,
	"/": 2,
	"^": 2,
	"sin": 1,
	"cos": 1,
	"tan": 1,
	"cot": 1,
	"sec": 1,
	"csc": 1,
	"arcsin": 1,
	"arccos": 1,
	"arctan": 1,
	"sqrt": 1,
	"log": 1,
	"ln": 1,
}

//----------------------------------------------------------------------------------------------------
// GLOBAL VARIABLES
//----------------------------------------------------------------------------------------------------

var page = {};

//----------------------------------------------------------------------------------------------------
// CLASSES
//----------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------
// FUNCTIONS
//----------------------------------------------------------------------------------------------------

function setup() {
	console.log("FUNCTION CALL: setup()");

	page.userFunc = document.getElementById("userFunc"); //
	page.calcButton = document.getElementById("calcButton");
	page.solution = document.getElementById("solution");

	page.calcButton.addEventListener("click", solve);
}
function solve() {
	console.log("FUNCTION CALL: solve()");

	try {
		var rawFuncString = page.userFunc.value;
		var funcArray = rawFuncStringToArray(rawFuncString);
		var derivativeArray = differentiate(funcArray);
		var imgUrl = parseToImgURL(derivativeArray);
		page.solution.setAttribute("src", imgUrl);
	}
	catch(err) {
		alert(String(err[0]) + String(err[1]));
		if(!isNaN(Number(err[1]))) {
			window.setTimeout(function() {
				page.userFunc.setSelectionRange(err[1], err[1]+1);
				page.userFunc.focus();
			}, 0);
		}
		else {
			window.setTimeout(function() {
				page.userFunc.focus();
			}, 0);
		}
	}
}
function rawFuncStringToArray(str) {
	console.log("FUNCTION CALL: rawFuncStringToArray(" + str + ")");

	var fArray = [];

	var currentString = str;
	var nextChar;
	var num = "";
	var lastCharOperator = true;
	var negative;
	var currentCharIndex = 0;
	while(currentString.length > 0) {
		while(currentString[0] == " " && currentString.length > 0) {
			currentString = currentString.substr(1);
			++currentCharIndex;
		}
		if(currentString.length == 0) {
			break;
		}
		nextChar = false;
		negative = false;
		if(lastCharOperator && currentString[0] == "-" && !isNaN(currentString[1])) {
			negative = true;
		}
		if(!negative) {
			for(var i=0; i<mathSpecialStrings.length; ++i) {
				if(0 == currentString.indexOf(mathSpecialStrings[i])) {
					fArray.push(mathSpecialStrings[i]);
					currentString = currentString.substr(mathSpecialStrings[i].length);
					currentCharIndex += mathSpecialStrings[i].length;
					nextChar = true;
					if(!(mathSpecialStrings[i] == "(" || mathSpecialStrings[i] == ")")) {
						lastCharOperator = true;
					}
					break;
				}
			}
		}
		if(!nextChar) {
			lastCharOperator = false;
			num = "";
			if(currentString[0] == "-") {
				num += "-";
				currentString = currentString.substr(1);
				++currentCharIndex;
			}
			if(currentString[0] == ".") {
				num += "0";
				currentString = currentString.substr(1);
				++currentCharIndex;
			}
			if(!isOperand(currentString[0])) {
				throw(currentCharIndex);
			}
			while(!isNaN(currentString[0]) || currentString[0] == ".") {
				num = num + currentString[0];
				currentString = currentString.substr(1);
				++currentCharIndex;
			}
			fArray.push(num);
		}
	}
	return fArray;
}
function differentiate(func) {
	console.log("FUNCTION CALL: differentiate(" + func + ")");

	var dArray = [];

	return dArray;
}
function parseToImgURL(d) {
	console.log("FUNCTION CALL: parseToImgURL(" + d + ")");

	var url = "";

	return url;
}
function isOperand(char) {
	console.log("isOperand(" + char + ")");

	if(!isNaN(Number(char))) {
		return true;
	}
	else if(char == "PI") {
		return true;
	}
	else if(char == "E") {
		return true;
	}
	else if(char == "T") {
		return true;
	}
	else {
		return false;
	}
}

//----------------------------------------------------------------------------------------------------
// EXECUTED CODE
//----------------------------------------------------------------------------------------------------

window.setTimeout(setup, 0);
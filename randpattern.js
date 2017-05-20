check = -1;
function randPattern(){
	// randomiser that avoids repicking the previous selection
	do {
		var pick = Math.floor(Math.random() * patterns.length);
	}
	while (pick == check);
	check = pick;
	return patterns[pick];
}


// pattern1 - 5 little octagons
var pattern1 = [];
var pattern1a = [[25, 25], [25, 15], [35, 25], [25, 35], [15, 25]];
for (i in pattern1a){
	var p = pattern1a[i];
	pattern1 = pattern1.concat(brush_type(p[0], p[1], 7, 'brushOct'));
}


// pattern2 - 'union jack'
var pattern2 = [];
var pattern2a = ['brushCross1', 'brushCross2', 'brushSquare'];
for (i in pattern2a){
	pattern2 = pattern2.concat(brush_type(25, 25, 51, pattern2a[i]));
}


// pattern3 - concentric squares
var pattern3 = [];
var pattern3a = [35, 43, 51];
for (i in pattern3a){
	pattern3 = pattern3.concat(brush_type(25, 25, pattern3a[i], 'brushSquare'));
}


// pattern4 - concentric diamonds
var pattern4 = [];
var pattern4a = [[19, 31, 13], [31, 19, 13], [13, 37, 25], [37, 13, 25]];
var pattern4b = [[19, 19, 13], [31, 31, 13], [13, 13, 25], [37, 37, 25]];
for (i in pattern4a){
	var p =  pattern4a[i];
	pattern4 = pattern4.concat(brush_type(p[0], p[1], p[2], 'brushLineD1'));
}
for (i in pattern4b){
	var p =  pattern4b[i];
	pattern4 = pattern4.concat(brush_type(p[0], p[1], p[2], 'brushLineD2'));
}


// pattern5 - spiral of row 10s
var pattern5 = [];
var pattern5a = [[27, 15], [22, 35], [24, 5], [25, 45], [7, 45], [42, 5]];
var pattern5b = [[15, 22], [35, 27], [5, 25], [45, 24], [5, 7], [45, 42]];
for (i in pattern5a){
	var p = pattern5a[i];
	pattern5 = pattern5.concat(brush_type(p[0], p[1], 10, 'brushLineH'));
}
for (i in pattern5b){
	var p = pattern5b[i];
	pattern5 = pattern5.concat(brush_type(p[0], p[1], 10, 'brushLineV'));
}


// pattern6 - concentric octagons
var pattern6 = [];
var pattern6a = [23, 37, 51];
for (i in pattern6a){
	pattern6 = pattern6.concat(brush_type(25, 25, pattern6a[i], 'brushOct'));
}


// pattern7 - 3 diagonal crosses
var pattern7 = [];
var pattern7a = [[25, 25, 11], [30, 20, 9], [20, 30, 9]];
for (i in pattern7a){
	var p =  pattern7a[i];
	pattern7 = pattern7.concat(brush_type(p[0], p[1], p[2], 'brushCross1'));
}


// pattern8 - noughts, pluses and minuses
var pattern8 = [];
var pattern8a = [[2, 2], [2, 28], [25, 2], [25, 48], [48, 22], [48, 48]]; // cross1
var pattern8b = [[2, 6, 'H'], [25, 6, 'H'], [48, 44, 'H'], [25, 44, 'H'], [44, 22, 'V'], [6, 28, 'V']]; // lineH & lineV
var pattern8c = [[5, 19], [11, 5], [16, 45], [34, 5], [39, 45], [45, 31]]; // oct
for (i in pattern8a){
	var p = pattern8a[i];
	pattern8 = pattern8.concat(brush_type(p[0], p[1], 5, 'brushCross1'));
}
for (i in pattern8b){
	var p = pattern8b[i];
	pattern8 = pattern8.concat(brush_type(p[0], p[1], 5, 'brushLine'+p[2]));
}
for (i in pattern8c){
	var p = pattern8c[i];
	pattern8 = pattern8.concat(brush_type(p[0], p[1], 7, 'brushOct'));
}


// pattern9 - the X factor lol
var pattern9 = [];
var pattern9a = [[23, 25], [25, 25], [27, 25]];
for (i in pattern9a){
	var p = pattern9a[i];
	pattern9 = pattern9.concat(brush_type(p[0], p[1], 51, 'brushCross2'));
}


// pattern10 - tyre track
var pattern10 = [];
var pattern10a = [];
for (i = 1; i < 50; i+=6){
	pattern10a = pattern10a.concat([[i, 22], [i, 28], [i+3, 25]]);
}
for (i in pattern10a){
	var p = pattern10a[i];
	pattern10 = pattern10.concat(brush_type(p[0], p[1], 3, 'brushBlock'));
}

patterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6, pattern7, pattern8, pattern9, pattern10];





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


patterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6];





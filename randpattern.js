check = -1;
function randPattern(){
	// randomiser that avoids repicking the last selection
	do {
		var pick = Math.floor(Math.random()*patterns.length);
	}
	while (pick == check);
	check = pick;
	return patterns[pick];
}


// pattern1 - 5 little octagons
var pattern1 = [];
var pattern1a = brush_type(25, 25, 7, 'brushOct');
var pattern1b = brush_type(25, 15, 7, 'brushOct');
var pattern1c = brush_type(35, 25, 7, 'brushOct');
var pattern1d = brush_type(25, 35, 7, 'brushOct');
var pattern1e = brush_type(15, 25, 7, 'brushOct');
var pattern1f = [pattern1a, pattern1b, pattern1c, pattern1d, pattern1e]
for (i in pattern1f){
	pattern1 = pattern1.concat(pattern1f[i]);
}


// pattern2 - 'union jack'
var pattern2 = [];
var pattern2a = brush_type(25, 25, 51, 'brushCross1');
var pattern2b = brush_type(25, 25, 51, 'brushCross2');
var pattern2c = brush_type(25, 25, 51, 'brushSquare');
pattern2 = pattern2a.concat(pattern2b).concat(pattern2c);


// pattern3 - concentric squares
var pattern3 = [];
var pattern3a = brush_type(25, 25, 35, 'brushSquare');
var pattern3b = brush_type(25, 25, 43, 'brushSquare');
var pattern3c = brush_type(25, 25, 51, 'brushSquare');
pattern3 = pattern3a.concat(pattern3b).concat(pattern3c);

// pattern4 - concentric diamonds
var pattern4 = [];
var pattern4a = brush_type(19, 31, 13, 'brushLineD1');
var pattern4b = brush_type(31, 19, 13, 'brushLineD1');
var pattern4c = brush_type(13, 37, 25, 'brushLineD1');
var pattern4d = brush_type(37, 13, 25, 'brushLineD1');
var pattern4e = brush_type(13, 13, 25, 'brushLineD2');
var pattern4f = brush_type(37, 37, 25, 'brushLineD2');
var pattern4g = brush_type(19, 19, 13, 'brushLineD2');
var pattern4h = brush_type(31, 31, 13, 'brushLineD2');
var pattern4i = [pattern4a, pattern4b, pattern4c, pattern4d, pattern4e, pattern4f, pattern4g, pattern4h];
for (i in pattern4i){
	pattern4 = pattern4.concat(pattern4i[i]);
}

// pattern5 - spiral of row 10s
var pattern5 = [];
var pattern5a = [[27, 15], [22, 35], [24, 5], [25, 45], [7, 45], [42, 5]];
var pattern5b = [[15, 22], [35, 27], [5, 25], [45, 24], [5, 7], [45, 42]];
for (i in pattern5a){
	pattern5 = pattern5.concat(brush_type(pattern5a[i][0], pattern5a[i][1], 10, 'brushLineH'));
};
for (i in pattern5b){
	pattern5 = pattern5.concat(brush_type(pattern5b[i][0], pattern5b[i][1], 10, 'brushLineV'));
};

// pattern6 - concentric octagons
var pattern6 = [];
var pattern6a = brush_type(25, 25, 23, 'brushOct');
var pattern6b = brush_type(25, 25, 37, 'brushOct');
var pattern6c = brush_type(25, 25, 51, 'brushOct');
pattern6 = pattern6a.concat(pattern6b).concat(pattern6c);


patterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6];





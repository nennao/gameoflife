function brush_type(x, y, length, brush){
	var l1, l2, p;
	var positions = [];
	var positions2 = [];

	[l1, l2] = brushBounds(length);
	[l3, l4] = brushBounds2(length);
	

	for (i = l1; i < l2; i++){

		// =========== block ============ //
		if (brush === 'brushBlock'){
			for (j = l1; j < l2; j++){
				p = [x+i, y+j];
				positions.push(p);
			}
		}

		// ========= vertical =========== //
		if (brush === 'brushLineV'){
			p = [x, y+i];
			positions.push(p);
		}

		// ========= horizontal ========== //
		if (brush === 'brushLineH'){
			p = [x+i, y];
			positions.push(p);
		}

		// ========= \ diagonal ========== //
		if (brush === 'brushLineD1'){
			p = [x+i, y+i];
			positions.push(p);
		}

		// ========= / diagonal ========== //
		if (brush === 'brushLineD2'){
			p = [x+i, y-i];
			positions.push(p);
		}


		// ========== + cross =========== //
		if (brush === 'brushCross1'){
			p = [x, y+i];
			positions.push(p);
		}
		if (brush === 'brushCross1'){
			p = [x+i, y];
			positions.push(p);
		}

		// ========== x cross =========== //
		if (brush === 'brushCross2'){
			p = [x+i, y+i];
			positions.push(p);
		}
		if (brush === 'brushCross2'){
			p = [x+i, y-i];
			positions.push(p);
		}


		// =========== square =========== //
        var sq_l = l1 + length - 1
		if (brush === 'brushSquare'){   // top
			p = [x+i, y+l1];
			positions.push(p);
		}
		if (brush === 'brushSquare'){   // bot
			p = [x+i, y+sq_l];
			positions.push(p);
		}
		if (brush === 'brushSquare'){   // left
			p = [x+l1, y+i];
			positions.push(p);
		}
		if (brush === 'brushSquare'){   // right
			p = [x+sq_l, y+i];
			positions.push(p);
		}
	}


	// =========== octagon =========== //
	if (brush === 'brushOct'){

		var r13 = []; var r31 = [];
		for (i = l1; i < l3; i++){
			r13.push(i);
		}
		for (i = l3; i > l1; i--){
			r31.push(i);
		}
		var r_len = r13.length;


		for (i = l3; i < l4; i++){		// top hor
			p = [x+i, y+l1];
	    	positions.push(p);
		}
		for (i = l3; i < l4; i++){		// bot hor
			p = [x+i, y-l1];
	    	positions.push(p);
		}
		for (i = l3; i < l4; i++){		// left ver
			p = [x+l1, y+i];
	    	positions.push(p);
		}
		for (i = l3; i < l4; i++){		// right ver
			p = [x-l1, y+i];
	    	positions.push(p);
		}
		for (i = 0; i < r_len; i++){	// top left diag
			p = [x+r13[i], y+r31[i]];
	    	positions.push(p);
		}
		for (i = 0; i < r_len; i++){ 	// top right diag
			p = [x-r31[i], y+r13[i]];
	    	positions.push(p);
		}
		for (i = 0; i < r_len; i++){ 	// bot left diag
			p = [x+r13[i], y-r31[i]];
	    	positions.push(p);
		}
		for (i = 0; i < r_len; i++){ 	// bot right diag
			p = [x-r31[i], y-r13[i]];
	    	positions.push(p);
		}
	}

	
	if (brush === 'brushGlider'){
		positions = [[x-1, y+1], 
		[x, y-1], [x, y+1],
		[x+1, y], [x+1, y+1]];
	}

	return positions;
}

function brushBounds(length){
	var bounds = Math.floor((length - 1) / 2);
    var bounds_lower = bounds * -1;
    var bounds_upper = bounds_lower + length;
    return [bounds_lower, bounds_upper];
}
function brushBounds2(length){
	var bounds = Math.floor((length - 1) / 4);
    var bounds_lower = bounds * -1;
    var bounds_upper = bounds + 1;
    return [bounds_lower, bounds_upper];
}
oddBrush = ['brushCross1', 'brushCross2', 'brushOct'];



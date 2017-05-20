$(document).ready(function(){

var canvas = $("#myCanvas")[0];
var canvasB = $("#canvasB")[0];
var canvasG = $("#canvasG")[0];

var ctx = canvas.getContext("2d");
var ctxB = canvasB.getContext("2d");
var ctxG = canvasG.getContext("2d");

var cSz = 10; // cell size
var gridW = canvas.width; 
var gridH = canvas.height; 
var columns = gridW/cSz;
var rows = gridH/cSz;


// game settings
fps = 10;
maxFps = 30;
sens = 10;

brushSize = 5;
brushStep = 1;

gridColor = "#000090";
symLinesColor = "#aaffaa";
cellColor = "#00ff00";
bgColor = "#000000";


// other globals
play = false;
symLines = false;
delMode = false;
shiftOn = false;
brushOn = false;
gridOn = true;



function pauseGame() {
	if (play) {
		play = false; $("#playPause b").text("play"); $("#gameStateTxt").text("paused");
	} else {
		play = true; $("#playPause b").text("pause"); $("#gameStateTxt").text("playing");
	}
}

function eraserMode() {
	if (delMode) {
		delMode = false; $("#delBut").removeClass("active"); $("#delModeTxt").text("")
	} else {
		delMode = true; $("#delBut").addClass("active"); $("#delModeTxt").text("eraser mode on")
	}
}

function brushSizeChg(val){
	if (val){
		if ((val > 0 && brushSize < Math.min(columns, rows)) || (val < 0 && brushSize > 1)){
			brushSize+=val;
			$("#brushSizer").val(brushSize);
		}
	}
	else {
		brushSize = parseInt($("#brushSizer").val());
	}
	$("#brushValue").text(brushSize);
}

// mouse position
function getMousePos(e){
	var canvasOffset = $("#canvasG").offset();
	var offsetX = canvasOffset.left; var offsetY = canvasOffset.top;

	var mouseX = (Math.floor((e.clientX - offsetX)/cSz));
		if(mouseX >= columns) mouseX = columns-1;
	var mouseY = (Math.floor((e.clientY - offsetY)/cSz)); 
		if(mouseY >= rows) mouseY = rows-1;

	return [mouseX, mouseY];
}

// draw symmetry lines
function draw_symLines(){
	ctx.fillStyle = symLinesColor;
	ctx.fillRect(gridW/2, 0, 1, gridH);
	ctx.fillRect(0, gridH/2, gridW, 1);
}

// draw grid
function draw_grid(){
    ctxG.beginPath();
    ctxG.strokeStyle = gridColor;
	for (i = 0; i < gridW; i+=cSz){
		ctxG.moveTo(i+0.5, 0);
	    ctxG.lineTo(i+0.5, gridH);
	}
	for (i = 0; i < gridH; i+=cSz){
	    ctxG.moveTo(0, i+0.5);
	    ctxG.lineTo(gridW, i+0.5);
	}
	ctxG.stroke();
}

// clear grid
function clear_grid(){
	ctxG.clearRect(0,0, gridW,gridH);
}


// functions for creating cells' setup
// counting column by column (each x) and going down though cells in column (each y)
function clear_cells(){
	var all_cells = [];
    
    for (x=0; x<columns; x++){
    	var column_cells = [];
    	for (y=0; y<rows; y++){
        	c = 0;
        	column_cells.push(c); 
        }
        all_cells.push(column_cells);
    }
    return all_cells;
}


function get_cells(){
	var all_cells = [];
    
	density = 0.2;
    for (x=0; x<columns; x++){
    	var column_cells = [];
    	for (y=0; y<rows; y++){
        	c1 = Math.random();
        	if (c1 < density) {c2 = 1} else {c2 = 0}; 
        	column_cells.push(c2); 
        }
        all_cells.push(column_cells);
    }
    return all_cells;
}


function draw_cells(allCells){
	
	ctx.clearRect(0,0, gridW,gridH);

	for (x in allCells){
		for (y in allCells[x]){
			if (allCells[x][y] == 1) {
				ctx.fillStyle = cellColor;
				ctx.fillRect(x*cSz,y*cSz, cSz,cSz);
			}
		}
	}
	if (symLines) {draw_symLines();}
}


function get_neighbours(allCells){
	var live_neighbours = [];
	for (x in allCells){
		var col_neighbours = [];
		for (y in allCells[x]){
			// positions & check if exists in grid //find a better way to do this
			var p00, p01, p02, p10, p12, p20, p21, p22;
			p00 = p01 = p02 = p10 = p12 = p20 = p21 = p22 = 0;
			x = parseInt(x); y = parseInt(y);

			if (x-1 >= 0 && y-1 >= 0)	   	 p00 = allCells[x-1][y-1];
			if (			y-1 >= 0)	   	 p01 = allCells[x][y-1];
			if (x+1 < columns && y-1 >= 0) 	 p02 = allCells[x+1][y-1];
			if (x-1 >= 0)					 p10 = allCells[x-1][y];
			if (x+1 < columns)				 p12 = allCells[x+1][y];
			if (x-1 >= 0 && y+1 < rows)		 p20 = allCells[x-1][y+1];
			if (			y+1 < rows)		 p21 = allCells[x][y+1];
			if (x+1 < columns && y+1 < rows) p22 = allCells[x+1][y+1];

			var neighbours  = p00 + p01 + p02 + p10 + p12 + p20 + p21 + p22;
			col_neighbours.push(neighbours);		
		}
		live_neighbours.push(col_neighbours);
	}
	return live_neighbours;
}

// random pattern
function getPattern(){
	if (play) pauseGame();
	cells = clear_cells();
	var pos = randPattern();
	for (p in pos){
	
		if (pos[p][0] < 0 || pos[p][0] >= columns || pos[p][1] < 0 || pos[p][1] >= rows) {
			continue;
		}
		else {
			cells[pos[p][0]][pos[p][1]] = 1;
		}
	}
}

// pen/brush functions

function brush(x, y, mk){
	var pos = brush_type(x, y, brushSize, brushOn);
	for (p in pos){
	
		if (pos[p][0] < 0 || pos[p][0] >= columns || pos[p][1] < 0 || pos[p][1] >= rows) {
			continue;
		}
		else if (mk){
			cells[pos[p][0]][pos[p][1]] = 1;
		}
		else {
			cells[pos[p][0]][pos[p][1]] = 0;
		}
    }
}


function draw(e){
	var mouseBut = e.which;
	if (mouseBut == "1"){
		var mousePos = getMousePos(e); 
		var mouseX = mousePos[0]; var mouseY = mousePos[1];

		if (!delMode && !e.shiftKey){
			if (brushOn){
				brush(mouseX, mouseY, 1);
			}
			else {
				if (cells[mouseX][mouseY] == 0) cells[mouseX][mouseY] = 1;
			}	
		}
		else {
			if (brushOn){
				brush(mouseX, mouseY, 0);
			}
			else { 
				if (cells[mouseX][mouseY] == 1) cells[mouseX][mouseY] = 0;
			}
		}
	}
}



hovMouseX = columns*-1; hovMouseY = rows*-1;
function brushHover(){ 		
	var hov = $('#canvasG:hover').length;
	
	if (hov){
		ctxB.clearRect(0,0, gridW,gridH);
		ctxB.globalAlpha = 0.5;

		var hovPos = brush_type(hovMouseX, hovMouseY, brushSize, brushOn);

		for (p in hovPos){
			if (hovPos[p][0] < 0 || hovPos[p][0] >= columns || hovPos[p][1] < 0 || hovPos[p][1] >= rows) {
				continue;
			}
			else {
				ctxB.clearRect(hovPos[p][0]*cSz,hovPos[p][1]*cSz, cSz,cSz);
				if (delMode || shiftOn) ctxB.fillStyle = bgColor;
				else ctxB.fillStyle = cellColor;
				
				ctxB.fillRect(hovPos[p][0]*cSz,hovPos[p][1]*cSz, cSz,cSz);
			}
	    }
	}
	$("#canvasG").one('mousemove', function(e){
	
		var mousePos = getMousePos(e); 
		hovMouseX = mousePos[0]; hovMouseY = mousePos[1];
	})
	.mouseleave(function(){
		ctxB.clearRect(0,0, gridW,gridH)
	}); 
}


// mouse draw function
$("#canvasG").click(function(e){
	draw(e);
})
.mousedown(function() {
	$(this).mousemove(function(e){
		draw(e);
	})
	.mouseup(function() {
		$(this).unbind('mousemove');
	})
	.mouseenter(function(e) {
		if (e.which != '1') $(this).unbind('mousemove');
	})
	.mouseleave(function(e) {
		if (e.which != '1') $(this).unbind('mousemove');
	})
});


// keyboard functions
$(document).keydown(function(e){
	var key = e.which;
	if(key == "32") {				// space bar: pause/play
		pauseGame(); 
		if (e.target == document.body){
			e.preventDefault(); // stop spacebar scrolling the page
		}
	}
	if(key == "48") {			   	// key 0: toggle Symmetry Lines
		if (symLines){
			symLines = false; $("#toggleSLines").removeClass("active"); $("#toggleSLines .tickM").hide();
		} 
		else {
			symLines = true; $("#toggleSLines").addClass("active"); $("#toggleSLines .tickM").show();
		}
	}
	if(key == "69") eraserMode();  // key E: toggle Eraser

	if(key == "221") brushSizeChg(brushStep); 		// [ key brush size increase
	if(key == "219") brushSizeChg(brushStep*-1); 	// ] key brush size decrease

	if(key == "16") shiftOn = true;		// shift key toggle
})
.keyup(function(e){
	var key = e.which;
	if(key == "16") shiftOn = false;
});


// game of life mechanism!
function evolve(){
	
	if (play){
		newCells = cells.slice(0);
		var live_neighbours = get_neighbours(newCells);

		for (x in newCells){
			for (y in newCells[x]){
				if (newCells[x][y] === 1){
					if (live_neighbours[x][y] < 2 || live_neighbours[x][y] > 3) {
						newCells[x][y] = 0;
					}
				}
				else if (live_neighbours[x][y] === 3){
					newCells[x][y] = 1;
				}
			}
		}
		cells = newCells;
	}
	draw_cells(cells);
}


function init(){

	game_loop = setInterval(evolve, 1000 / fps);

	function fpsChange(val){
		if (val){
			if ((val > 0 && fps < maxFps) || (val < 0 && fps > 1)){
				fps+=val;
				$("#fpsSizer").val(fps);
			}
		}
		else {
			fps = parseInt($("#fpsSizer").val());
		}
		$("#fpsValue").text(fps);
		clearInterval(game_loop); 
		game_loop = setInterval(evolve, 1000 / fps); 
	}

	$(document).keydown(function(e){
		var key = e.which;

		if(key == "38"){ fpsChange(1)};  // up arrow: fps increase
		if(key == "40"){ fpsChange(-1)}; // down arrow: fps decrease
	});
	$("#fpsSizer").mouseup(function(){
		fpsChange(0);
	});

	
	brush_loop = null;

	$(".brushBut").click(function(){
		$("#canvasG").unbind("mouseenter").unbind("mouseleave");
		clearInterval(brush_loop);	

		brushId = $(this).attr("id")
		if (brushId === "brushOff"){
			brushOn = false;
		}
		else {
			brushOn = brushId; 
			if ($.inArray(brushOn, oddBrush) > -1){
				brushStep = 2; 
				$("#brushSizer").prop('step', 2);
				if (brushSize%2 === 0) brushSize += 1;
			} 
			else {
				brushStep = 1; $("#brushSizer").prop('step', 1);
			}

			$("#canvasG").mouseenter(function(){
				brush_loop = setInterval(brushHover, 1000 / sens);
			})
			.mouseleave(function(){
				clearInterval(brush_loop);
			});
		}
	});
}


// start game
cells = clear_cells();
draw_grid();
init();



// other GUI

// play/pause
$("#playPause").click(function(){
	pauseGame();
});

// eraser mode
$("#delBut").click(function(){ 
	eraserMode();
});

// toggle grid
$("#toggleGrid").click(function(){
	if (gridOn) {
		clear_grid(); gridOn = false; $("#toggleGrid").removeClass("active"); $("#toggleGrid .tickM").hide();
	}
	else {
		draw_grid(); gridOn = true; $("#toggleGrid").addClass("active"); $("#toggleGrid .tickM").show();
	}
});

// toggle symmetry lines
$("#toggleSLines").click(function(){
	if (symLines) {
		symLines = false; $("#toggleSLines").removeClass("active"); $("#toggleSLines .tickM").hide();
	}
	else {
		symLines = true; $("#toggleSLines").addClass("active"); $("#toggleSLines .tickM").show();
	}
});

// clear cells button
$("#clearBut").click(function(){
	cells = clear_cells();
});

// randomise cells button
$("#randBut").click(function(){
	cells = get_cells();
});

// brush slider
$("#brushSizer").mouseup(function(){
	brushSizeChg(0);
});

// random pattern 
$("#getPattern").click(function(){
	getPattern();
});


// todo: calibration is a bit off if window is not scrolled completely to top... 
// todo: remember to set up dynamic changing of canvas width, height & brush slider max
// todo: if possible, disable right click, disable cursor hidden when keydown
// todo: shift click or ctrl click for larger increments of brush size/fps change
// done: make pattern randomiser
// todo: make more patterns
});


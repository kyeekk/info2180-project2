$(document).ready(function(){
	
	//Image Selector
	menu    = $("<div></div>");
	background1 = $("<img name = 'background1.jpg' src ='background1.jpg' height=95px width=95px)><img>");
	background2 = $("<img name = 'background2.jpg' src ='background2.jpg' height=95px width=95px)><img>");
	background3 = $("<img name = 'background3.jpg' src ='background3.jpg' height=95px width=95px)><img>");
	background4 = $("<img name = 'background4.jpg' src ='background4.jpg' height=95px width=95px)><img>");
	infoBar   = $("<div>Click Picture to select Puzzle Background</div>");

	
	menu.append(background1);
	menu.append(background2);
	menu.append(background3);
	menu.append(background4);
	menu.append(infoBar);

	//Image Selector CSS/Style
	menu.css({
		"width": "250px",
		"height": "250px",
		"position": "absolute",
		"top": "200px",
		"left" : "1050px"
	});

	infoBar.css({
		"background-color": "#00B2EE",
		"width": "196px",
		"font-size" : "1.25em",
		"text-align": "center",
		"color": "white",
		"border": "1.5px solid #000000"
	});

	background1.css({
		"margin": "2px",
		"margin-bottom": "1.0px"
	});

	background2.css({
		"margin": "2px"
	});

	background3.css({
		"margin": "2px"
	});

	background4.css({
		"margin": "2px",
		"margin-bottom": "1.0px"
	});

	//Adds Image Selector to Body
	$('body').append(menu);

	occupiedLocations = [];
	allLocations      = [];
	images            = [background1,background2,background3,background4];
	puzzlePieces      = Array.from($("#puzzlearea").children());

	
	images.forEach(function(img){
		img[0].addEventListener("click",function(){
			changeBackground(img[0]);
		});
	});

	
	//Sort and Adjust Background Image
	for(i=0;i<4;i++){
			for (j=0;j<4;j++){
				allLocations.push([i*100,j*100]);
		}
	}
	for (i=0;i<puzzlePieces.length;i++){
		puzzlePieces[i].classList.add("puzzlepiece");
	}
	for (i=0;i<4;i++){
		puzzlePieces[i].style.top                = "0px";
		puzzlePieces[i].style.left               = `${100*i}px`;
		puzzlePieces[i].style.backgroundPosition = `${-100*i}px 0px`;
	}
	for (i=4;i<8;i++){
		puzzlePieces[i].style.top                = "100px";
		puzzlePieces[i].style.left               = `${100*(i%4)}px`;
		puzzlePieces[i].style.backgroundPosition = ` ${-100*(i%4)}px -100px`
	}
	for (i=8;i<12;i++){
		puzzlePieces[i].style.top                = "200px";
		puzzlePieces[i].style.left               = `${100*(i%4)}px`;
		puzzlePieces[i].style.backgroundPosition = `${-100*(i%4)}px -200px`
	}
	for (i=12;i<15;i++){
		puzzlePieces[i].style.top                = "300px";
		puzzlePieces[i].style.left               = `${100*(i%4)}px`;
		puzzlePieces[i].style.backgroundPosition = `${-100*(i%4)}px -300px`
	}

	//Movable Piece
	$(".puzzlepiece").hover(
		function(){
			if(movablePiece(this)){
				$(this).addClass("movablepiece");
			}
		},
		function(){
			$(this).removeClass("movablepiece");
		});

	$(".puzzlepiece").click(function(){
		if(movablePiece(this)){
			moveToEmptyTile(this);
		}
	});	

	$("#shufflebutton").click(shuffle);

	function puzzlePieceLocation(puzzlepiece){
		return [parseInt(puzzlepiece.style.left),parseInt(puzzlepiece.style.top)];
	}

	function changePuzzlePieceLocation(puzzlepiece, left, top){
		puzzlepiece.style.left = `${left}px`;
		puzzlepiece.style.top  = `${top}px`;
	}

	function equalArrays(array1,array2){
		return array1[0]===array2[0] && array1[1]===array2[1]
	}

	function containsElement(array, element){
		for(i=0;i<array.length;i++){
			if (equalArrays(array[i],element)){
				return true;
			}
		}return false;
	}

	function locateEmptyTile() {
		let emptyTile;
		occupiedLocations = puzzlePieces.map(function(puzzlepiece){
			return puzzlePieceLocation(puzzlepiece);
		})
		allLocations.forEach(function(location){
    		if(!(containsElement(occupiedLocations,location))){
    			emptyTile = location;
    		}
		})
		return emptyTile;
	}

	function moveToEmptyTile(puzzlepiece){
		let pieceLocation;

		emptyTileLocation = locateEmptyTile();
		pieceLocation     = puzzlePieceLocation(puzzlepiece);	
		//Swap location of empty tile and moving tile
		temp              = emptyTileLocation;
		emptyTileLocation = pieceLocation;
		pieceLocation     = temp;

		changePuzzlePieceLocation(puzzlepiece, pieceLocation[0],pieceLocation[1]);
	}


	function adjacentLocations(location1, location2){
		[left1,top1]  = location1;
		[left2,top2]  = location2;

		if(left1 === left2 && top1 === top2 + 100){
			return true;
		}
		if(left1 === left2 && top1 === top2 - 100){
			return true;
		}
		if(top1   === top2 && left1 === left2 - 100){
			return true;
		}
		if(top1   === top2 && left1 === left2 + 100){
			return true;
		}
		return false;
	}


	function movablePiece(puzzlepiece){
		return adjacentLocations(puzzlePieceLocation(puzzlepiece),locateEmptyTile())
	}

	function shuffle(){
		[...Array(160).keys()].forEach(function(){
			neighbours = puzzlePieces.filter(function(puzzlepiece){
			return movablePiece(puzzlepiece);
		})
			randomPuzzlePiece = neighbours[Math.floor(Math.random() * (neighbours.length))]
			moveToEmptyTile(randomPuzzlePiece);
		})
	}

	function changeImage(img){
		$("#puzzlepiece").backgroundImage = img;
	}

	function selectRandomBackground(){
		r = Math.floor(Math.random()*images.length)
		puzzlePieces.forEach(function(puzzlepiece){
			puzzlepiece.style.backgroundImage = "url('" +  images[r][0].name + "')";
		})
	}

	function changeBackground(img){
		puzzlePieces.forEach(function(puzzlepiece){
			puzzlepiece.style.backgroundImage = "url('" +  img.name + "')";
		})
	}

	selectRandomBackground();
})
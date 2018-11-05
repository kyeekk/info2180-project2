//extra feauture multiple backgrounds

window.onload = () =>{

    // all possible board positions
    boardPos=[[0,0],[0,100],[0,200],[0,300],[100,0],[100,100],[100,200],[100,300],
    [200,0],[200,100],[200,200],[200,300],[300,0],[300,100],[300,200],[300,300]];

    //const puzzle = document.getElementById("puzzlearea");
    let puzzlepiece = document.querySelectorAll("#puzzlearea div");
    const shuffle = document.getElementById("shufflebutton");
    const blank = [300,300];

    //set up grid and background on tiles
    setupPuzzle(4, puzzlepiece);

    function setupPuzzle(x, puzzlepiece) {
        puzzlepiece.forEach((piece, i) => {
            // grid layout
            piece.classList.add("puzzlepiece");
            //piece.classList.add("movablepiece");
            piece.style.left = `${(i % x) * 100}px`;
            piece.style.top = `${parseInt(i / x) * 100}px`;
            bgPos = `-${piece.style.left} -${piece.style.top}`;
            piece.style.backgroundPosition = bgPos;

            piece.addEventListener("mouseover", canMove);
            piece.addEventListener("click", movePiece);
            piece.addEventListener("mouseout", function() {
                this.classList.remove("movablepiece");
            });
        });
    }

    //checks if a tile can move at all and adds the hovering class
    function canMove(){
        if ( moveHorizontal(this) || moveVertical(this)){
            this.classList.add("movablepiece");
        }
    }

    //moves tiles
    function movePiece(){
        if (moveHorizontal(this)){
            place = parseInt(this.style.left);
            this.style.left = `${blank[0]}px`;
            blank[0] = place;
        }
        if (moveVertical(this)){
            place = parseInt(this.style.top);
            this.style.top = `${blank[1]}px`;
            blank[1] = place;
        }
    }

    //checks if tile can move on  the horizontal axis
    function moveHorizontal(piece){
        if (parseInt(piece.style.top) == blank[1]){
            if(parseInt(piece.style.left) - blank[0] == 100 || 
            parseInt(piece.style.left) - blank[0] == -100){
                return true
            }
        }
    }

    //checks if tile can move on the vertical axis
    function moveVertical(piece){
        if (parseInt(piece.style.left) == blank[0]){
            if(parseInt(piece.style.top) - blank[1] == 100 || 
            parseInt(piece.style.top) - blank[1] == -100){
                return true
            }
        }
    }

    //shuffles tiles on board
    shuffle.addEventListener("click", shuffleGame);

    function shuffleGame(){
        //swap a random tile with the blank
        /*function swap(p1, blank){
            place = p1.style.left;
            p1.style.left = blank[0];
            blank[0] = place;

            place = p1.style.top;
            p1.style.top = blank[1];
            blank[1] = p1.style.top;
        }
        swap(
            puzzlepiece[Math.floor((Math.random) * boardPos.length) + 1],
            blank
        );*/

        //swap(puzzlepiece, blank);
       function swap(p1, p2) {
            place = p1.style.left;
            p1.style.left = p2.style.left;
            p2.style.left = place;
        
            place = p1.style.top;
            p1.style.top = p2.style.top;
            p2.style.top = place;
          }
          for (let i = 0; i <= boardPos.length; i++) {
            swap(
              puzzlepiece[Math.floor(Math.random() * boardPos.length)],
              puzzlepiece[Math.floor(Math.random() * boardPos.length)]
            );
          }      
    }

    $(document).ready(function(){
	
        //Image Selector
        menu    = $("<div></div>");
        background1 = $("<img name = 'background.jpg' src ='background.jpg' height=95px width=95px)><img>");
        background2 = $("<img name = 'background2.jpg' src ='background2.jpg' height=95px width=95px)><img>");
        background3 = $("<img name = 'background3.jpg' src ='background3.jpg' height=95px width=95px)><img>");
        background4 = $("<img name = 'background4.jpg' src ='background4.jpg' height=95px width=95px)><img>");
        infoBar   = $("<div>click a picture to get a different background</div>");
    
        
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

}
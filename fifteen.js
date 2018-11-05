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
        function swap(p1, blank){
            place = - p1.style.left;
            p1.style.left = blank[0];
            blank[0] = place;

            place = p1.style.top;
            p1.style.top = blank[1];
            blank[1] = p1.style.top;
        }
        puzzlepiece.forEach(p => {
            swap(p,blank);
        })
        //swap(puzzlepiece, blank);
       /* function swap(p1, p2) {
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
          } */      
    }

}
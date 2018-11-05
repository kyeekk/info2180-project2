window.onload = () =>{

    const puzzle = document.getElementById("puzzlearea");
    let puzzlepiece = document.querySelectorAll("#puzzlearea div");
    const shuffle = document.getElementById("shufflebutton");
    const blank = [300,300];

    setupPuzzle(4, puzzlepiece);

    shuffle.addEventListener("click", shuffleGame);

    function shuffleGame(){
        function swapPiece(piece1, piece2) {
            temp = piece1.style.left;
            piece1.style.left = piece2.style.left;
            piece2.style.left = temp;
      
            temp = piece1.style.top;
            piece1.style.top = piece2.style.top;
            piece2.style.top = temp;
          }
          for (let i = 0; i < 100; i++) {
            direction = Math.floor(Math.random()) == 1 ? "left" : "top";
            swapPiece(
              pieces[Math.floor(Math.random() * pieces.length)],
              pieces[Math.floor(Math.random() * pieces.length)]
            );
        }
    }

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

    function canMove(){
        if ( moveHorizontal(this) || moveVertical(this)){
            this.classList.add("movablepiece");
        }
    }

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

    function moveHorizontal(piece){
        if (parseInt(piece.style.top) == blank[1]){
            if(parseInt(piece.style.left) - blank[0] == 100 || 
            parseInt(piece.style.left) - blank[0] == -100){
                return true
            }
        }
    }

    function moveVertical(piece){
        if (parseInt(piece.style.left) == blank[0]){
            if(parseInt(piece.style.top) - blank[1] == 100 || 
            parseInt(piece.style.top) - blank[1] == -100){
                return true
            }
        }
    }

}
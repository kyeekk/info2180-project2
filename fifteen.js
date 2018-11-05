window.onload = () =>{

    const puzzle = document.getElementById("puzzlearea");
    let puzzlepiece = document.querySelectorAll("#puzzlearea div");
    const shuffle = document.getElementById("shufflebutton");
    const blank = [300,300];

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
        });

        piece.addEventListener("mouseover", canMove)
        piece.addEventListener("click", movePiece);
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
            if(parseInt(piece.style.top) - blank[0] == 100 || 
            parseInt(piece.style.top) - blank[0] == -100){
                return true
            }
        }
    }



    
}
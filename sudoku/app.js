//Load Baords
const gameBoard = [
    "000260701680070090190004500820100040004602900050003028009300074040050036703018000",
    "435269781682571493197834562826195347374682915951743628519326874248957136763418259"
];

//Create Variables
var timer;
var timerRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload = function(){
    //Run startGame when Button Clicked
    id("start-btn").addEventListener("click",startGame);
    //adding event listner to each tile and number
    for( let i=0; i<id("number-container").children.length; i++){
        id("number-container").children[i].addEventListener("click",function() {
            if(!disableSelect) {
                //selecting only one number
                if(this.classList.contains("selected")){
                    this.classList.remove("selected");
                    selectedNum = null;
                }
                else{
                    //deselect other
                    for(let i=0; i<9; i++){
                        id("number-container").children[i].classList.remove("selected");
                    }
                    //select and update to selected num variable
                    this.classList.add("selected");
                    selectedNum = this;
                    updateMove();
                }
            }
        });
    }
}

function startGame(){
    let board;
    board = gameBoard[0];
    //set lives and tiles
    lives = 3;
    disableSelect = false;
    id("lives").textContent = "Lives Remaining: 3";
    //create Board
    generateBoard(board);
    //starts timer
    startTimer();
    if(id("theme-1").checked){
        qs("body").classList.add("dark");
    }
    else{
        qs("body").classList.remove("dark");
    }

    //show number container
    id("number-container").classList.remove("hidden");
}

function startTimer(){
    if(id("time-1").checked) timerRemaining = 180;
    else if(id("time-2").checked) timerRemaining = 300;
    else timerRemaining = 600;

    id("timer").textContent = timeConversion(timerRemaining);

    timer = setInterval(function() {
        timerRemaining--;
        if(timerRemaining === 0) endGame();
        id("timer").textContent = timeConversion(timerRemaining);
    },1000)
}

function timeConversion(time) {
    //seconds to minutes
    let minutes = Math.floor(time/60);
    if(minutes < 10 ) minutes = "0"+minutes;
    let seconds = time % 60;
    if(seconds < 10) seconds = "0"+seconds;
    return minutes+":"+seconds;
}

function generateBoard(board){
    //clear previous board
    clearPrevious();
    //let used to increament tile ids
    let idCount = 0;
    //create 81 tiles
    for(let i=0; i<81; i++){
        let tile = document.createElement("p");
        if(board.charAt(i) != 0){
           tile.textContent = board.charAt(i); 
        }
        else{
            tile.addEventListener("click",function(){
                //if selecting is not disabled
                if(!disableSelect){
                    if(tile.classList.contains("selected")){
                        tile.classList.remove("selected");
                        selectedTile = null;
                    }
                    else{
                        for(let i=0; i<81; i++){
                            qsa(".tile")[i].classList.remove("selected");
                        }
                        this.classList.add("selected");
                        selectedTile = tile;
                        updateMove();
                    }
                }
            })
        }
        tile.id = idCount;
        idCount++;
        tile.classList.add("tile");
        if((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)){
            tile.classList.add("bottomBorder");
        }
        if((tile.id + 1) % 9 == 3 || (tile.id+1) % 9 ==6){
            tile.classList.add("rightBorder")
        }
        id("board").appendChild(tile);
    }
}

function updateMove() {
    //testing num and tile is selected
    if(selectedTile || selectedNum){
        //set tile to correct number
        selectedTile.textContent = selectedNum.textContent;
        //if the number matches solution
        if(checkCorrect(selectedTile)){
            //deselct tile
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");
            //clear the selected variable
            selectedNum = null;
            selectedTile = null;
            //check if board is completed
            if(checkDone()){
                endGame();
            }
            //if the number not match solution

        }
        else{
            //disable selecting new numbers for one second
            disableSelect = true;
            selectedTile.classList.add("incorrect");
            setTimeout(function(){
                //subtract lives by one
                lives--;
                //no lives end game
                if(lives === 0) {
                    endGame();
                }
                else{
                    //update lives text
                    id("lives").textContent = "lives Remaining: "+lives;
                    //renable selecting numbers and tiles
                    disableSelect = false;
                }
                //restore tile color and remove selected from both
                selectedTile.classList.remove("incorrect");
                selectedTile.classList.remove("selected");
                selectedNum.classList.remove("selected");
                //clear the tiles text and clear selected variable
                selectedTile.textContent = "";
                selectedTile = null;
                selectedNum = null;
            },1000);
        }
    }
}

function checkDone(){
    let tiles = qsa(".tile");
    for(let i = 0; i < tiles.length; i++){
        if(tiles.textContent === "") return false;
    }
    return true;
}

function endGame() {
    disableSelect = true;
    clearTimeout(timer);
    //display win or lose
    if(lives === 0 || timerRemaining === 0) {

        id("lives").textContent = "Oops You Lost:(";
    }
    else{
        id("lives").textContent = "Yohoo You Won:)"
    }
}

function checkCorrect(tile) {
    //set solution
    let solution 
    solution = gameBoard[1];
    // if tiles number is equal to solutions number
    if(solution.charAt(tile.id) === tile.textContent) return true;
    else return false;
}

function clearPrevious() {
    //access all tiles
    let tiles = qsa(".tile");
    //remove each tile
    for(let i = 0; i < tiles.length; i++) {
        tiles[i].remove();
    }

    //timer
    if(timer) clearTimeout(timer);

    //deselect numbers
    for(let i=0; i < id("number-container").children.length; i++) {
        id("number-container").children[i].classList.remove("selected");
    }
    //clear selected variables
    selectedTile = null;
    selectedNum = null;
}

function id(id){
    return document.getElementById(id)
}

function qs(selector){
    return document.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

const x_class = 'x';
const circle_class = 'circle';
const winning_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessage = document.querySelector('[data-winning-message-text');
const restartButton = document.getElementById('restartButton');
let circleTurn;
document.getElementsByTagNameNS
startGame();

restartButton.addEventListener('click',startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, { once: true})
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true})
})

function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? circle_class : x_class;
    placeMark(cell, currentClass);

    //place mark
    //check for win
    if (checkwin(currentClass)) {
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else {
    swapTurns()
    setBoardHoverClass();
    }
    //check for draw
    //switch turns

}

function endGame(draw){
    if(draw){
        winningMessage.innerText = 'Draw!';
    }
    else{
        winningMessage.innerText = `${circleTurn ? "0's" : "X's"} Wins`;
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || 
                cell.classList.contains(circle_class)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn; 
}
function setBoardHoverClass(){
    board.classList.remove(x_class);
    board.classList.remove(circle_class);
    if(circleTurn){
        board.classList.add(circle_class);
    }
    else{
        board.classList.add(x_class);
    }

}

function checkwin(currentClass){
    return winning_combinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}



var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var sizeInput = document.getElementById("size");
var changeSize = document.getElementById("change-size");
var scoreLabel = document.getElementById("score");
var score = 0;
var size = 4;
var width = canvas.width / size - 6;
var cells = [];
var fontSize;
var loss = false;
startGame();

changeSize.onclick = function () {
    //starting the game according to the size seklection
  if (sizeInput.value >= 2 && sizeInput.value <= 20) {
    size = sizeInput.value;
    width = canvas.width / size - 6;
    console.log(sizeInput.value);
    canvasClean();
    startGame();
  }
};

function cell(row, coll) {
  this.value = 0;
  this.x = coll * width + 5 * (coll + 1);
  this.y = row * width + 5 * (row + 1);
}

function createCells() {
  var i, j;
  for (i = 0; i < size; i++) {
    cells[i] = [];
    for (j = 0; j < size; j++) {
        //calling cell function with each cell as row and column
      cells[i][j] = new cell(i, j);
    }
  }
}

function drawCell(cell) {
  ctx.beginPath();
  ctx.rect(cell.x, cell.y, width, width);
  switch (cell.value) {
    case 0:
      ctx.fillStyle = "#A9A9A9";
      break;
    case 2:
      ctx.fillStyle = "#746AB0";
      break;
    case 4:
      ctx.fillStyle = "#E389B9";
      break;
    case 8:
      ctx.fillStyle = "#bfb177";
      break;
    case 16:
      ctx.fillStyle = "#DE3163";
      break;
    case 32:
      ctx.fillStyle = "#6495ED";
      break;
    case 64:
      ctx.fillStyle = "#DFFF00";
      break;
    case 128:
      ctx.fillStyle = "#FF7F50";
      break;
    case 256:
      ctx.fillStyle = "#40E0D0";
      break;
    case 512:
      ctx.fillStyle = "#FFCE30";
      break;
    case 1024:
      ctx.fillStyle = "#D2691E";
      break;
    case 2048:
      ctx.fillStyle = "#FF7F50";
      break;
    case 4096:
      ctx.fillStyle = "#ffbf00";
      break;
    default:
      ctx.fillStyle = "#ff0080";
  }
  ctx.fill();
  if (cell.value) {
    fontSize = width / 4;
    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    switch (cell.value) {
        //filltext(text,x co-ordinate, y co-ordinate, width(optional))
      case 0:
        ctx.fillText(
          cell.value + "🦉",
          cell.x + width / 2, 
          cell.y + width / 2 + width / 7
        );
        break;
      case 2:
        ctx.fillText(
          cell.value + "🐤",
          cell.x + width / 2,
          cell.y + width / 2 + width / 7
        );
        break;
      case 4:
        ctx.fillText(
          cell.value + "🐥",
          cell.x + width / 2,
          cell.y + width / 2 + width / 7
        );
        break;
      case 8:
        ctx.fillText(
          cell.value + "🐣",
          cell.x + width / 2,
          cell.y + width / 2 + width / 7
        );
        break;
      case 16:
        ctx.fillText(
          cell.value + "🦜",
          cell.x + width / 2,
          cell.y + width / 2 + width / 7
        );
        break;
      case 32:
        ctx.fillText(
          cell.value + "🦋",
          cell.x + width / 2,
          cell.y + width / 2 + width / 7
        );
        break;
      case 64:
        ctx.fillText(
          cell.value + "🦢",
          cell.x + width / 2,
          cell.y + width / 2 + width / 7
        );
        break;
      case 128:
        ctx.fillText(
          cell.value + "🦆",
          cell.x + width / 2,
          cell.y + width / 2 + width / 7
        );
        break;
      case 256:
        ctx.fillText(
          cell.value + "🐧",
          cell.x + width / 2,
          cell.y + width / 2 + width / 7
        );
        break;
      case 512:
        ctx.fillText(
          cell.value + "🦚",
          cell.x + width / 2,
          cell.y + width / 2 + width / 7
        );
        break;
      case 1024:
        ctx.fillText(
          cell.value + "🐇",
          cell.x + width / 2,
          cell.y + width / 2 + width / 7
        );
        break;
      case 2048:
        ctx.fillText(
          cell.value + "🐴",
          cell.x + width / 2,
          cell.y + width / 2 + width / 7
        );
        break;
      case 4096:
        ctx.fillText(
          cell.value + "🦁",
          cell.x + width / 2,
          cell.y + width / 2 + width / 7
        );
        break;
      default:
        ctx.fillText = "#ff0080";
    }
  }
}

function canvasClean() {
  ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
  if (!loss) {
    if (event.key === "ArrowUp") {
      moveUp();
    } else if (event.key === "ArrowRight") {
      moveRight();
    } else if (event.key === "ArrowDown") {
      moveDown();
    } else if (event.key === "ArrowLeft") {
      moveLeft();
    }
    scoreLabel.innerHTML = "Score : " + score;
  }
};

function startGame() {
  createCells();
  drawAllCells();
  pasteNewCell();
  pasteNewCell();
  //here we are using two pasteNewCell functions because in starting we need to start game with 2 numbers
}

function finishGame() {
  canvas.style.opacity = "0.5";
  ctx.font = "60px Comic Sans MS";
  ctx.fillStyle = "#d91487";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.width / 2);
  loss = true;
}

//this function calls the drawCell for each iteration
function drawAllCells() {
  var i, j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      drawCell(cells[i][j]);
    }
  }
}

function pasteNewCell() {
  var countFree = 0;
  var i, j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
        //Boolean(0) = false
      if (!cells[i][j].value) {
        countFree++;
      }
    }
  }
  if (!countFree) {
    finishGame();
    return;
  }
  while (true) {
    var row = Math.floor(Math.random() * size);
    var coll = Math.floor(Math.random() * size);
    if (!cells[row][coll].value) {
      cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
      return;
    }
  }
}

//Right Arrowkey Is clicked
function moveRight() {
  var i, j;
  var coll;
  for (i = 0; i < size; i++) {
    for (j = size - 2; j >= 0; j--) { 
      if (cells[i][j].value) { 
        coll = j; //coll = 2
        while (coll + 1 < size) {
          if (!cells[i][coll + 1].value) { //[0,3]
            cells[i][coll + 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll++;
          } else if (cells[i][coll].value == cells[i][coll + 1].value) {
            cells[i][coll + 1].value *= 2;
            score += cells[i][coll + 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}

//Left Arrowkey Is clicked
function moveLeft() {
  var i, j;
  var coll;
  for (i = 0; i < size; i++) {
    for (j = 1; j < size; j++) {
      if (cells[i][j].value) {
        coll = j;
        while (coll - 1 >= 0) {
          if (!cells[i][coll - 1].value) {
            cells[i][coll - 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll--;
          } else if (cells[i][coll].value == cells[i][coll - 1].value) {
            cells[i][coll - 1].value *= 2;
            score += cells[i][coll - 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}

//Up Arrowkey Is clicked
function moveUp() {
  var i, j, row;
  for (j = 0; j < size; j++) {
    for (i = 1; i < size; i++) {
      if (cells[i][j].value) {
        row = i;
        while (row > 0) {
          if (!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            score += cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}

//Down Arrowkey Is clicked
function moveDown() {
  var i, j, row;
  for (j = 0; j < size; j++) {
    for (i = size - 2; i >= 0; i--) {
      if (cells[i][j].value) {
        row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            score += cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}

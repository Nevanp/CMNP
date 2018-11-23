// Connect Four
// Charlie Murphy
// Nov. 13, 2018
//
//
let rows;
let cols;
let grid;
let cellSize;
let playerX;
let playerY;
let coins = 0;
let playerScore = 0;
let movementTimer;


class Timer {
  constructor(timeToWait) {
    this.startTime = millis();
    this.waitTime = timeToWait;
  }

  reset(timeToWait) {
    this.startTime = millis();
    this.waitTime = timeToWait;
  }

  isDone() {
    return millis() >= this.startTime + this.waitTime;
  }

}

function preload() {
  grid = loadStrings("assets/stage1.txt");
}

function setup() {
  createCanvas(700, 700);
  background(220);
  rows = grid[0].length;
  cols = grid[0].length;
  cellSize = width / cols -1;
  cleanUpTheGrid();
  playerX = 13;
  playerY = 20;
  coins = coinCounter();
  movementTimer = new Timer(5);

}

function draw() {
  background(255);
  displayGrid();
  score();
  handleKeys();
  pakmanDetector();
  sideSwitch();
}

//allows the text file to be used for initial grid
function cleanUpTheGrid() {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = grid[i].split(""); //turns it into a 2D array
  }
}


function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // barrier
      if (grid[y][x]=== "0") {
        stroke(0);
        fill(0, 0, 255);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        noStroke();
        fill(200, 200, 0, 180);
        ellipse (x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, 10, 10);
      }
      // play space
      else if (grid[y][x] === "1") {
        stroke(255);
        fill(0);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === "2") {
        stroke(255);
        fill(210, 180, 140);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === "3") {
        stroke(0);
        fill(0, 0, 255);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === "4") {
        stroke(0);
        fill(0, 0, 255);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        fill(255,255,0);
        ellipse(x *cellSize + cellSize/2, y * cellSize + cellSize/2, cellSize - 5);
      }
    }
  }
}
function handleKeys() {

  if (movementTimer.isDone()) {
    if (keyIsPressed) {
      // moveLeft
      if ( grid[playerY][playerX - 1] !== "1") {
        if (key === "a") {
          playerX--;
          grid[playerY][playerX] = "4";
          // grid[playerY][playerX + 1] = "3";
        }
      }
      // moveRight
      if (grid[playerY][playerX + 1] !== "1") {
        if (key === "d") {
          playerX++;
          grid[playerY][playerX] = "4";
          // grid[playerY][playerX - 1] = "3";
        }
      }
      // moveUp
      if (grid[playerY - 1][playerX] !== "1") {
        if (key === "w") {
          playerY--;
          grid[playerY][playerX] = "4";
          // grid[playerY + 1][playerX] = "3";
        }
      }
      // moveDown
      if (grid[playerY + 1][playerX] !== "1") {
        if (key === "s") {
          playerY++;
          grid[playerY][playerX] = "4";
          // grid[playerY - 1][playerX] = "3";
        }
      }
      movementTimer.reset(80);
    }
  }
}



function sideSwitch(){
  if(playerX > cols - 1){
    playerX = 0;
  }
  else if(playerX < 0 ){
    playerX = rows -1 ;
  }

}

function coinCounter(){
  let counter = 0;
  for(let i = 0; i < rows - 1; i ++){
    for(let j = 0; j < cols - 1; j ++){
      if(grid[i][j] === "0"){
        counter ++;
      }
    }
  }
  return counter;
}


function score(){
  let newCoins = coinCounter();
  playerScore = abs(newCoins - coins) * 50;
  textSize(25);
  textAlign(LEFT,TOP);
  fill(0);
  text("score: " + playerScore, 0, 0);
}


function pakmanDetector(){
  for(let y = 0; y < cols; y++){
    for(let x = 0; x< rows; x++){
      // console.log("grid value:" + grid[y][x] + "  y:" + y + "  playerY:" + playerY + "  x:" + x + "  playerX:" + playerX);
      if(grid[y][x] === "4" && (y !== playerY || x !== playerX)){
        grid[y][x] = "3";
        // console.log("inside!");
      }
    }
  }
}

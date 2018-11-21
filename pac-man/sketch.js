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
}

function draw() {
  background(255);
  displayGrid();
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
        stroke(255);
        fill(0, 0, 255);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === "4") {
        stroke(0);
        fill(0, 0, 255);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        fill(255,255,0);
        ellipse(x *cellSize + cellSize/2, y * cellSize + cellSize/2, cellSize/2);
      }
    }
  }
}
function keyTyped(){
  if(playerX > 0 && grid[playerY][playerX - 1] !== "1"){
    if(key === "a"){
      playerX --;
      grid[playerY][playerX]="4";
      grid[playerY][playerX+1]="3";
    }

  }
  if(cols-1 > playerX && grid[playerY][playerX + 1] !== "1"){
    if(key === "d"){
      playerX ++;
      grid[playerY][playerX]="4";
      grid[playerY][playerX-1]="3";
    }
  }
  if(playerY > 0 && grid[playerY - 1][playerX] !== "1"){
    if(key === "w"){
      playerY --;
      grid[playerY][playerX]="4";
      grid[playerY+1][playerX]="3";
    }

  }
  if(rows-1 > playerY && grid[playerY + 1][playerX] !== "1"){
    if(key === "s"){
      playerY ++;
      grid[playerY][playerX]="4";
      grid[playerY-1][playerX]="3";
    }
  }
}

//placing pieces, alternating red and yellow each time

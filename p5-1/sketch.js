// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let rows = 10;
let cols = 10;
let grid;
let cellSize;
let playerX;
let playerY;


function setup() {
  if(windowHeight > windowWidth){
    createCanvas(windowWidth,windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = width / rows;
  grid = createRandom2dArray(cols, rows);
  playerX = rows/2;
  playerY = cols/2;
}

function draw() {
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      fill(255);
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
      if(grid[y][x] === 2){
        fill(255);
        rect(x*cellSize,y*cellSize, cellSize, cellSize);
        fill(255,255, 0);
        ellipse(x*cellSize + cellSize/2,y*cellSize + cellSize/2, cellSize/2);
      }
      else{
        fill(255);
        rect(x*cellSize,y*cellSize, cellSize, cellSize);
      }
    }
  }
}

function createRandom2dArray(cols, rows) {
  let randomGrid = [];
  for (let y = 0; y < rows; y++) {
    randomGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        randomGrid[y].push(0);
      }
      else {
        randomGrid[y].push(1);
      }
    }
  }
  return randomGrid;
}


function keyTyped(){
  if(playerX > 0){
    if(key === "a"){
      playerX --;
      grid[playerY][playerX]=2;
      grid[playerY][playerX+1]=0;
    }

  }
  if(cols-1 > playerX){
    if(key === "d"){
      playerX ++;
      grid[playerY][playerX]=2;
      grid[playerY][playerX-1]=0;
    }
  }
  if(playerY > 0){
    if(key === "w"){
      playerY --;
      grid[playerY][playerX]=2;
      grid[playerY+1][playerX]=0;
    }

  }
  if(rows-1 > playerY){
    if(key === "s"){
      playerY ++;
      grid[playerY][playerX]=2;
      grid[playerY-1][playerX]=0;
    }
  }
}

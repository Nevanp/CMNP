// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let rows;
let cols;
let grid;
let cellSize;
let ghosts;


class Ghost {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.movingRight = false;
    this.movingLeft = false;
    this.movingUp = false;
    this.movingDown = false;

  }
  display(){
    fill(255,255,0);
    ellipse(this.x * cellSize+ cellSize/2, this.y * cellSize + cellSize/2, cellSize - 5);
  }
  update(){
    if(grid[this.y - 1][this.x] !== "1" && this.movingDown ===false){
      this.y --;
      this.movingUp = true;
      this.movingDown = false;
      this.movingRight = false;
      this.movingLeft = false;
    }
    else if(grid[this.y][this.x + 1] !== "1" && this.movingLeft === false){
      this.x ++;
      this.movingRight = true;
      this.movingLeft = false;
      this.movingDown = false;
      this.movingUp = false;
    }

    else if(grid[this.y+1][this.x] !== "1" && this.movingUp === false){
      this.y ++;
      this.movingDown = true;
      this.movingUp = false;
      this.movingRight = false;
      this.movingLeft = false;
    }
    else if(grid[this.y][this.x - 1] !== "1" && this.movingRight === false ){
      this.x --;
      this.movingLeft = true;
      this.movingRight = false;
      this.movingDown = false;
      this.movingUp = false;
    }




  }
  sideSwitch(){
    if(this.x > cols - 1){
      this.x = 0;
    }
    else if(this.x < 0 ){
      this.x = rows -1 ;
    }

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
  ghosts = new Ghost(12, 12);

}

function draw() {
  background(255);
  displayGrid();
  ghosts.display();
  if(frameCount % 30 === 1){
    ghosts.update();
  }
  ghosts.sideSwitch();

}


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

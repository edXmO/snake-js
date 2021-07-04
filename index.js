/** CANVAS && CONTEXT */
const canvas = document.querySelector(".canvas-gl");
const ctx = canvas.getContext('2d');


const grid = [];

const WIDTH = 400;
const HEIGHT = 400;
const RES = 20;

let maxFps = 120;
let timestamp;
let frameTime;

const ROWS = HEIGHT / RES;
const COLS = WIDTH / RES;

class Cell {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(this.x, this.y);
        ctx.fillStyle = "#565656";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Snake {
    constructor(x, y) {
        this.body = [];
        this.x = x;
        this.y = y;
        this.h = RES;
        this.w = RES;
        this.dir = null;
    }

    getIndex(){
        return this.x + this.y / RES;
    }

    update(key) {
        this.dir = key;
        switch (this.dir) {
            case "ArrowUp":
                if(grid[snake.getIndex()].y  === 0){
                    this.x = grid[snake.getIndex() + RES - 1].x;
                    this.y = grid[snake.getIndex() + RES - 1].y;
                } else {
                    this.x = grid[snake.getIndex() - 1].x;
                    this.y = grid[snake.getIndex() - 1].y;
                }
                break;
            case "ArrowDown":
                if(grid[snake.getIndex()].y  === HEIGHT - RES){
                    this.x = grid[snake.getIndex() - RES + 1].x;
                    this.y = grid[snake.getIndex() - RES + 1].y;
                }
                else {
                    this.x = grid[snake.getIndex() + 1].x;
                    this.y = grid[snake.getIndex() + 1].y;
                }
                break;
            case "ArrowRight":               
                if(grid[snake.getIndex()].x === WIDTH - RES){
                    this.x = grid[snake.getIndex() - ((RES - 1) * ROWS)].x;
                    this.y = grid[snake.getIndex() - ((RES - 1) * ROWS)].y;
                }
                else {
                    this.x = grid[snake.getIndex() + RES].x;
                    this.y = grid[snake.getIndex() + RES].y;    
                }
                break;
            case "ArrowLeft":
                if(grid[snake.getIndex()].x === 0){
                    this.x = grid[snake.getIndex() + ((RES - 1) * ROWS)].x;
                    this.y = grid[snake.getIndex() + ((RES - 1) * ROWS)].y;
                }
                else {
                    this.x = grid[snake.getIndex() - RES].x;
                    this.y = grid[snake.getIndex() - RES].y;
                }
                break;
        }
    }

    show() {
        ctx.beginPath();
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Food {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.points = 200;
    }

    place(){ 
        ctx.beginPath();
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

const fillGrid = () => {
    for (let i = 0; i < ROWS; i++) {
        for(let j = 0; j < COLS; j++){
            let cell = new Cell(i * ROWS, j * COLS, RES, RES);
            grid.push(cell);
        }     
    }
}

const drawGrid = () => {
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}


const placeRandomFood = () => {
    let randCell = Math.floor(Math.random() * grid.length);

    let food = new Food(grid[randCell].x, grid[randCell].y ,grid[randCell].w ,grid[randCell].h);

    food.place();
}

const setup = () => {
    fillGrid();
    drawGrid();
}

setup();

let snake = new Snake(grid[0].x, grid[0].y);
snake.show();

window.addEventListener('keydown', (e) => {
    const { key } = e;
    
    snake.update(key);


}, true);

// intervalID = setInterval(() => placeRandomFood(), 5000);

const tick = (timestamp) => {
    if (timestamp < frameTime + (1000 / maxFps)) {
        animationFrameID = requestAnimationFrame(tick);
    }

    frameTime = timestamp;

    drawGrid();
    snake.show();

    // placeRandomFood();

    animationFrameID = requestAnimationFrame(tick)
}

tick();


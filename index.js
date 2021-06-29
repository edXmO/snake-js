/** CANVAS && CONTEXT */
const canvas = document.querySelector(".canvas-gl");
const ctx = canvas.getContext('2d');


const grid = [];

const WIDTH = 600;
const HEIGHT = 600;
const RES = Math.floor(Math.sqrt(WIDTH))

let maxFps = 30;
let timestamp;

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
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.stroke();
    }
}

class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.h = RES;
        this.w = RES;
    }

    getIndex() {
        return this.x + this.y / RES;
    }

    update(key) {
        switch (key) {
            case "ArrowUp":
                this.x = grid[snake.getIndex() - 1].x;
                this.y = grid[snake.getIndex() - 1].y;
                break;
            case "ArrowRight":
                this.x = grid[snake.getIndex() + RES].x;
                this.y = grid[snake.getIndex() + RES].y;
                break;
            case "ArrowDown":
                this.x = grid[snake.getIndex() + 1].x;
                this.y = grid[snake.getIndex() + 1].y;
                break;
            case "ArrowLeft":
                this.x = grid[snake.getIndex() - RES].x;
                this.y = grid[snake.getIndex() - RES].y;
                break;
        }
    }

    show() {
        ctx.beginPath();
        ctx.lineTo(this.x, this.y);
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Food {
    constructor() {

    }
}

const fillGrid = () => {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            let cell = new Cell(i * RES, j * RES, RES, RES);
            grid.push(cell);
        }
    }
}

const drawGrid = () => {
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
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
    snake.show();
}, true);


const tick = (timestamp) => {
    if (timestamp < frameTime + (1000 / maxFps)) {
        animationFrameID = requestAnimationFrame(tick);
    }

    frameTime = timestamp;

    snake.show();

    animationFrameID = requestAnimationFrame(tick)
}


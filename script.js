const screen = document.getElementById('game');
const ctx = screen.getContext('2d')

class snakepart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let count = 20;
let size = screen.width / count - 2;
let headx = 10;
let heady = 10;
const snakeparts = [];
let taillength = 0;
let xvel = 0;
let yvel = 0;
let applex = 5;
let appley = 5;
let score = 0;

function run() {
    change();
    let result = isgameover();
    if (result) {
        return;
    }
    fillscreen();
    collision();
    apple();
    head();
    Score();
    setTimeout(run, 1000 / speed);
};

function isgameover() {
    let gameover = false;
    if (headx < 0) {
        gameover = true;
    }
    else if (headx > 24) {
        gameover = true;
    }
    else if (heady < 0) {
        gameover = true;
    }
    else if (heady > 24) {
        gameover = true;
    }

    for (let i = 0; i < snakeparts.length; i++) {
        let part = snakeparts[i];
        if (part.x === headx && part.y === heady) {
            gameover = true;
        }
    }

    if (gameover) {
        ctx.fillStyle = 'white';
        ctx.font = "50px Verdana";
        ctx.fillText("Game over!!!", screen.width / 6.5, screen.height / 2)
    }
    return gameover;
}

function Score() {
    ctx.fillStyle = 'black';
    ctx.font = "10px Verdana";
    ctx.fillText("Score" + score, screen.width - 50, 10);
}

function fillscreen() {
    ctx.fillStyle = 'burlywood';
    ctx.fillRect(0, 0, screen.width, screen.height)
}

function head() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(headx * count, heady * count, size, size);
    ctx.fillStyle = 'orange';
    for (let i = 0; i < snakeparts.length; i++) {
        let part = snakeparts[i];
        ctx.fillRect(part.x * count, part.y * count, size, size);
    }

    snakeparts.push(new snakepart(headx, heady));
    if (snakeparts.length > taillength) {
        snakeparts.shift();
    }
}

function apple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(applex * count, appley * count, size, size)
}

function collision() {
    if (applex === headx && appley === heady) {
        score = score + 1;
        applex = Math.floor(Math.random() * count)
        appley = Math.floor(Math.random() * count)
        taillength++;
    }
}

function change() {
    headx = headx + xvel;
    heady = heady + yvel;
}

document.body.addEventListener('keydown', keyDown);
function keyDown(event) {
    if (event.keyCode == 38) {
        if (yvel == 1)
            return;
        yvel = -1;
        xvel = 0;
    }
    if (event.keyCode == 40) {
        if (yvel == -1)
            return;
        yvel = 1;
        xvel = 0;
    }
    if (event.keyCode == 37) {
        if (xvel == 1)
            return;
        yvel = 0;
        xvel = -1;
    }
    if (event.keyCode == 39) {
        if (xvel == -1)
            return;
        yvel = 0;
        xvel = 1;
    }
}
run();
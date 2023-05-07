
let CANVAS_WIDTH = 400;
let CANVAS_HEIGHT = 600;

let x = CANVAS_WIDTH / 2;
let y = CANVAS_HEIGHT / 2;
let score = 0;

let directions = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

let direction = directions.RIGHT;
let speed = 1;

let food = {
    x: Math.floor(Math.random() * CANVAS_WIDTH),
    y: Math.floor(Math.random() * CANVAS_HEIGHT),
    // color object with r, g, b values for red
    color: {
        r: 255,
        g: 0,
        b: 0
    }
}

let size = 15;

function setup(){
    let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.parent('sketch-holder');
    background(255);
    rectMode(CENTER);
    frameRate(30);
}

function draw(){
    //stroke dotted
    stroke(0, 0, 0, 15);

    // compute next position
    computeNextPosition();

    // draw rectangle and point
    drawRectangleAndPoint();

    // draw food
    drawFood();

    // check collision
    if (checkCollision()){
        handleCollision();
    }

    // check edges
    checkEdges();

    // handle key down events
    handleKeyDowns();
}

// function to check collision between the rectangle and the food
// use the size of the rectangle to check collision
function checkCollision(){
    return (x - size / 2 < food.x &&
        x + size / 2 > food.x &&
        y - size / 2 < food.y &&
        y + size / 2 > food.y);
}

function handleCollision(){
    // hide food
    hideFood();

    // if collision, change the random position
    food.x = Math.floor(Math.random() * CANVAS_WIDTH);
    food.y = Math.floor(Math.random() * CANVAS_HEIGHT);

    // increase speed
    speed += 0.5;

    // increase score
    score += 1;
    document.getElementById('score').innerHTML = score;
}

// function that checks the collision with the edges of the canvas
// and reverses the direction if there is a collision
function checkEdges(){
    if (x + size / 2 > CANVAS_WIDTH) {
        x = CANVAS_WIDTH - size / 2;
        direction = directions.LEFT;
    }
    if (x - size / 2 < 0) {
        x = size / 2;
        direction = directions.RIGHT;
    }
    if (y + size / 2 > CANVAS_HEIGHT) {
        y = CANVAS_HEIGHT - size / 2;
        direction = directions.UP;
    }
    if (y - size / 2 < 0) {
        y = size / 2;
        direction = directions.DOWN;
    }
}

// function to hide the food
function hideFood(){
    // stroke should be white
    stroke(255, 255, 255);
    fill(255, 255, 255);
    ellipse(food.x, food.y, 5, 5);
}

// function to draw food: a circle with the random position. radius 5, color red
function drawFood(){
    // stroke should be food color
    stroke(food.color.r, food.color.g, food.color.b);
    fill(food.color.r, food.color.g, food.color.b);
    ellipse(food.x, food.y, 5, 5);
}

// function to draw the rectangle and the point
function drawRectangleAndPoint(){
    // reset color to white
    fill(255, 255, 255);
    // gray stroke
    stroke(200, 200, 200);
    rect(x, y, size, size);
    point(x, y);
}

function computeNextPosition(){
    switch (direction) {
        case directions.UP:
            y -= speed;
            break;
        case directions.DOWN:
            y += speed;
            break;
        case directions.LEFT:
            x -= speed;
            break;
        case directions.RIGHT:
            x += speed;
            break;
    }
}

// function to handle key down events
function handleKeyDowns() {
    if (keyIsDown(UP_ARROW)) {
        y -= speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
        y += speed;
    }
    if (keyIsDown(LEFT_ARROW)) {
        x -= speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        x += speed;
    }


    // if Q is down increase size by 1
    if (keyIsDown(81)) {
        size += 1;
    }

    // if W is down decrease size by 1
    if (keyIsDown(87)) {
        size -= 1;
    }
}

function keyDown(event) {
    handleSize(event);
}

// key pressed right arrow
function keyPressed(event) {

    handleMovement(event);

    switch (event.keyCode) {
        case UP_ARROW:
            direction = directions.UP;
            break;
        case DOWN_ARROW:
            direction = directions.DOWN;
            break;
        case LEFT_ARROW:
            direction = directions.LEFT;
            break;
        case RIGHT_ARROW:
            direction = directions.RIGHT;
            break;
        case 82:
            size = 15;
            //reset position
            x = CANVAS_WIDTH / 2;
            y = CANVAS_HEIGHT / 2;
            break;
            // case s save canvas as png
        case 83:
            //saveCanvas('myCanvas', 'png');
            break;

    }
}

// separate function to handle movement keyboard events
function handleMovement(event) {
    switch (event.keyCode) {
        case UP_ARROW:
            y -= 1;
            break;
        case DOWN_ARROW:
            y += 1;
            break;
        case LEFT_ARROW:
            x -= 1;
            break;
        case RIGHT_ARROW:
            x += 1;
            break;
    }
}

//separate function to handle size keyboard events, using keyIsDown
function handleSize(event) {
    switch (event.keyCode) {
        case 81:
            size += 1;
            break;
        case 87:
            size -= 1;
            break;
    }
}

// default P5 functions
function mousePressed(event) {
    return false;
}

function mouseDragged(event) {
    return false;
}

function mouseMoved(event) {
    return false;
}

let youare;
function preload(){
    youare = loadImage("youare.gif")
}

function setup(){
    createCanvas(windowWidth, windowHeight)
}

function draw(){
    image(youare, 0, 0, width, height)
}
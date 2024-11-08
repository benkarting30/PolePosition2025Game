let finalOrder, playerFLInfo
let table = []
let username
let names = ["Kourtney Rahman","Martina Wakefield","Willow Cross","Shelton Olsen","Haylee Sharp","Marcella Akins","Dina Dagostino","Maddie Duvall","Elsie Foley","Lina Durbin","Lauren Pease","Gage Langdon","Coleton Romano","Rashad Serna","Hailey Tsai"]
function setup(){
    createCanvas(windowWidth, windowHeight)
    numberOfCars = window.localStorage
    finalOrder = window.localStorage.getItem('order')
    playerFLInfo = window.localStorage.getItem('fastest')
    username = prompt("Enter your name")
    if (username == null || username == ''){

    }
    for (let i = 0; i < numberOfCars; i++){
        if (finalOrder[i] == "player"){
            table.push([i+1, "Player", playerFLInfo.time.toFixed(3), playerFLInfo.lap.toFixed(3)])
        } else {
            table.push([i+1, random(names), playerFLInfo + random(-1, 1), random(0, 10)])
        }
    }
    p5.table(table)
}
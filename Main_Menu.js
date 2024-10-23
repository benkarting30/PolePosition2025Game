const buttonWidth = 900
const buttonHeight = 100

let menuStage = 0
let Music1, Music2

function preload(){
    Music1 = createSprite('Audio/Fast Track.mp3')
    Music2 = createSprite('Audio/Full Throttle.mp3')
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    colorMode(RGB)
    textSize(54)
    Music1.play()
}

function playButton() {
    fill(122, 122, 122)
    rect(width / 2 - buttonWidth / 2, height / 4 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    fill(255)
    textFont('Titillium Web')
    textAlign(CENTER, CENTER)
    text("Play", width / 2, height / 4)
}

function settingsButton() {
    fill(122, 122, 122)
    rect(width / 2 - buttonWidth / 2, 2 * height / 4 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    fill(255)
    textFont('Titillium Web')
    textAlign(CENTER, CENTER)
    text("Settings", width / 2, 2 * height / 4)
}

function timeTrialButton() {
    fill(122, 122, 122)
    rect(width / 2 - buttonWidth / 2, height / 4 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    fill(255)
    textFont('Titillium Web')
    textAlign(CENTER, CENTER)
    text("Time Trial", width / 2, height / 4)
}

function NormalGameButton() {
    fill(122, 122, 122)
    rect(width / 2 - buttonWidth / 2, 2 * height / 4 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    fill(255)
    textFont('Titillium Web')
    textAlign(CENTER, CENTER)
    text("Race", width / 2, 2 * height / 4)
}

function backButton() {
    fill(122, 122, 122)
    rect(width / 2 - buttonWidth / 2, 3 * height / 4 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    fill(255)
    textFont('Titillium Web')
    textAlign(CENTER, CENTER)
    text("Back", width / 2, 3 * height / 4)
}

function draw() {
    background(255)
    if (menuStage === 0) {
        playButton()
        settingsButton()
    } else if (menuStage === 1) {
        NormalGameButton()
        timeTrialButton()
        backButton()
    } else if (menuStage === 2) {
        timeTrialMaps()
    }
}

function timeTrialMaps() {
    fill(122, 122, 122)
    rect(width / 2 - buttonWidth / 2, 1 * height / 7 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 2 * height / 7 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 3 * height / 7 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 4 * height / 7 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 5 * height / 7 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 6 * height / 7 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    fill(255)
    textFont('Titillium Web')
    textAlign(CENTER, CENTER)
    text("Thunder Ridge Circuit", width / 2, 1 * height / 7)
    text(`Viper’s Nest Circuit`, width / 2, 2 * height / 7)
    text("Silver Sands Speedway - w Chicane", width / 2, 3 * height / 7)
    text("Silver Sands Speedway - w/o Chicane", width / 2, 4 * height / 7)
    text("Avus", width / 2, 5 * height / 7)
    text("Back", width / 2, 6 * height / 7)

}

function mouseClicked() {
    if (menuStage != 2) {
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > height / 4 - buttonHeight / 2 && mouseY < height / 4 + buttonHeight / 2) {
            if (menuStage != 2) {
                menuStage++
            } else if (menuStage === 2) {
                window.sessionStorage.setItem("map", "map1")
                window.location.assign("Time_Trial.html")
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 2 * height / 4 - buttonHeight / 2 && mouseY < 2 * height / 4 + buttonHeight / 2) {
            if (menuStage === 0) {
                menuStage = 3
            } else if (menuStage === 1) {
                //alert("The Following Gamemode is work in progress. You will currently be able to play qualifying only.")
                window.location.assign("Quali.html")
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 3 * height / 4 - buttonHeight / 2 && mouseY < 3 * height / 4 + buttonHeight / 2) {
            if (menuStage > 0) {
                menuStage--
            }
        }
    } else {
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > height / 7 - buttonHeight / 2 && mouseY < height / 7 + buttonHeight / 2) {
            window.sessionStorage.setItem("map", "map1")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 2 * height / 7 - buttonHeight / 2 && mouseY < 2 * height / 7 + buttonHeight / 2) {
            window.sessionStorage.setItem("map", "map2")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 3 * height / 7 - buttonHeight / 2 && mouseY < 3 * height / 7 + buttonHeight / 2) {
            window.sessionStorage.setItem("map", "map3")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 4 * height / 7 - buttonHeight / 2 && mouseY < 4 * height / 7 + buttonHeight / 2) {
            window.sessionStorage.setItem("map", "map5")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 5 * height / 7 - buttonHeight / 2 && mouseY < 5 * height / 7 + buttonHeight / 2) {
            window.sessionStorage.setItem("map", "map4")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 6 * height / 7 - buttonHeight / 2 && mouseY < 6 * height / 7 + buttonHeight / 2) {
            menuStage--
        }
    }
}

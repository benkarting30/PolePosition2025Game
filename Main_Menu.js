const buttonWidth = 900
const buttonHeight = 100

let menuStage = 0
let Music1, Music2
function preload(){
    soundFormats("mp3")
    Music1 = loadSound('FT')
    Music2 = loadSound('FTh [music]')
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    colorMode(RGB)
    textSize(54)
    backgroundMusic()
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
    } else if (menuStage === 3){
        settingsButtons
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
    push()
    fill('gold')
    text("Silver Sands Speedway - w Chicane", width / 2, 3 * height / 7)
    pop()
    text("Silver Sands Speedway - w/o Chicane", width / 2, 4 * height / 7)
    text("Avus", width / 2, 5 * height / 7)
    text("Back", width / 2, 6 * height / 7)

}

function settingsButtons(){
    fill(122, 122, 122)
    rect(width / 2 - buttonWidth / 2, 2 * height / 8 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 3 * height / 8 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 4 * height / 8 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 5 * height / 8 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 6 * height / 8 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 7 * height / 8 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    fill(255)
    textFont('Titillium Web')
    textAlign(CENTER, CENTER)
    text("Settings", width / 2, 1 * height / 8)
    text(`Sensitivity ${sensitivityLevel}`, width / 2, 2 * height / 8)
    text(`AI Difficulty ${AILevel}`, width / 2, 3 * height / 8)
    text(`Qualifying Lenght ${qLength}`, width / 2, 4 * height / 8)
    text(`Race Length ${rLength}`, width / 2, 5 * height / 8)
    text(`Controls`, width / 2, 6 * height / 8)
    text("Back", width / 2, 7 * height / 8)
}

function mouseClicked() {
    if (menuStage < 2) {
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
    } else if (menuStage === 2) {
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
    } else {
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 2 * height / 8 - buttonHeight / 2 && mouseY < 2 * height / 8 + buttonHeight / 2) {
            sensitivityLevel++
            if (sensitivityLevel == 6){
                sensitivityLevel = 1
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 3 * height / 8 - buttonHeight / 2 && mouseY < 3 * height / 8 + buttonHeight / 2) {
            AILevel++ 
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 4 * height / 8 - buttonHeight / 2 && mouseY < 4 * height / 8 + buttonHeight / 2) {
            window.sessionStorage.setItem("map", "map5")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 5 * height / 8 - buttonHeight / 2 && mouseY < 5 * height / 8 + buttonHeight / 2) {
            window.sessionStorage.setItem("map", "map4")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 6 * height / 8 - buttonHeight / 2 && mouseY < 6 * height / 8 + buttonHeight / 2) {
            window.sessionStorage.setItem("map", "map4")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 7 * height / 8 - buttonHeight / 2 && mouseY < 7 * height / 8 + buttonHeight / 2) {
            menuStage--
        }
    }
}

function backgroundMusic(){
    if (floor(random(0, 9223372036854775807))==9223372036854775807){
        Music1.play()
        Music1.loop()
        Music1.setVolume(0.3)
        userStartAudio()
    } else if (floor(random(0, 100))){
        Music2.play()
        Music2.loop()
        Music2.setVolume(0.8)
        userStartAudio()
    } else {
        Music2.play()
        Music2.loop()
        Music2.setVolume(0.3)
        userStartAudio()
    }
}
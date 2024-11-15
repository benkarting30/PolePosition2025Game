const buttonWidth = 900
const buttonHeight = 100

let menuStage = 0
let Music1, Music2, controls, RobotRock, ThickOfIt
let collisionStat = false
let dynamicStat = false
let sensitivityLevel = 3, AILevel = 3, qLength = 2, rLength = 15

function settingsPackager() {
    window.sessionStorage.clear()
    let selectedSettings = [sensitivityLevel, AILevel, qLength, rLength, collisionStat, dynamicStat ]
    window.sessionStorage.setItem("Settings", selectedSettings)
}

function preload() {
    soundFormats("mp3")
    Music1 = loadSound('FT')
    Music2 = loadSound('FTh [music]')
    RobotRock = loadSound('Audio/Robot Rock')
    ThickOfIt = loadSound('Audio/Thick Of It')
    controls = loadImage('images/pixil-frame-0 (2).png')
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    colorMode(RGB)
    textSize(54)
    backgroundMusic()
    backgroundMusic = undefined
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
    } else if (menuStage === 3) {
        settingsButtons()
    } else if (menuStage === 4) {
        superSettingsButtons()
    } else if (menuStage === 5){
        controlsScreen()
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
    push()
    fill('gold')
    text(`Viper’s Nest Circuit`, width / 2, 2 * height / 7)
    pop()
    text("Silver Sands Speedway - w Chicane", width / 2, 3 * height / 7)
    text("Silver Sands Speedway - w/o Chicane", width / 2, 4 * height / 7)
    text("Avus", width / 2, 5 * height / 7)
    text("Back", width / 2, 6 * height / 7)

}

function settingsButtons() {
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
    text("Next", width / 2, 7 * height / 8)
}

function superSettingsButtons() {
    fill(122, 122, 122)
    rect(width / 2 - buttonWidth / 2, 2 * height / 6 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 3 * height / 6 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 4 * height / 6 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 5 * height / 6 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    fill(255)
    textFont('Titillium Web')
    textAlign(CENTER, CENTER)
    text("Super Not-So-Secret Secret Settings", width / 2, 1 * height / 6)
    text(`Disable Collisions ${collisionStat}`, width / 2, 2 * height / 6)
    text(`Turn on Dymanic Collision ${dynamicStat}`, width / 2, 3 * height / 6)
    text(`Back to Settibgs`, width / 2, 4 * height / 6)
    text(`Back to Menu`, width / 2, 5 * height / 6)

}

function controlsScreen(){
    imageMode(CENTER)
    noSmooth()
    image(controls, width / 2, height / 4, width, 3*height/4)
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
                settingsPackager()
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
            settingsPackager()
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 2 * height / 7 - buttonHeight / 2 && mouseY < 2 * height / 7 + buttonHeight / 2) {
            window.sessionStorage.setItem("map", "map2")
            settingsPackager()
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 3 * height / 7 - buttonHeight / 2 && mouseY < 3 * height / 7 + buttonHeight / 2) {
            window.sessionStorage.setItem("map", "map3")
            settingsPackager()
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 4 * height / 7 - buttonHeight / 2 && mouseY < 4 * height / 7 + buttonHeight / 2) {
            window.sessionStorage.setItem("map", "map5")
            settingsPackager()
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 5 * height / 7 - buttonHeight / 2 && mouseY < 5 * height / 7 + buttonHeight / 2) {
            window.sessionStorage.setItem("map", "map4")
            settingsPackager()
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 6 * height / 7 - buttonHeight / 2 && mouseY < 6 * height / 7 + buttonHeight / 2) {
            menuStage--
        }
    } else if (menuStage == 3) {
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 2 * height / 8 - buttonHeight / 2 && mouseY < 2 * height / 8 + buttonHeight / 2) {
            sensitivityLevel++
            if (sensitivityLevel == 6) {
                sensitivityLevel = 1
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 3 * height / 8 - buttonHeight / 2 && mouseY < 3 * height / 8 + buttonHeight / 2) {
            AILevel++
            if (AILevel == 6) {
                AILevel = 1
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 4 * height / 8 - buttonHeight / 2 && mouseY < 4 * height / 8 + buttonHeight / 2) {
            let tempQLength = parseInt(prompt("Please enter a length for Qualifying"))
            if (!Number.isInteger(tempQLength)) {
                console.warn("Invalid Input")
            } else {
                if (!(tempQLength > 0 && tempQLength < 15)) {
                    console.warn("Invalid Input")
                } else {
                    tempQLength = qLength
                }
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 5 * height / 8 - buttonHeight / 2 && mouseY < 5 * height / 8 + buttonHeight / 2) {
            let tempRLength = parseInt(prompt("Please enter a length for the Race"))
            if (!Number.isInteger(tempRLength)) {
                console.warn("Invalid Input")
            } else {
                if (tempRLength < 0 || tempRLength > 100) {
                    console.warn("Invalid Input")
                } else {
                    tempRLength = rLength
                }
            }
        }
        prompt()
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 6 * height / 8 - buttonHeight / 2 && mouseY < 6 * height / 8 + buttonHeight / 2) {
            menuStage = 5
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 7 * height / 8 - buttonHeight / 2 && mouseY < 7 * height / 8 + buttonHeight / 2) {
            menuStage++
        }
    } else if (menuStage===5){
        menuStage = 3
    }else {
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 2 * height / 6 - buttonHeight / 2 && mouseY < 2 * height / 6 + buttonHeight / 2) {
            if (dynamicStat) {
                alert("Please disable dynamic collisions to enable this!")
            } else {
                collisionStat = !collisionStat
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 3 * height / 6 - buttonHeight / 2 && mouseY < 3 * height / 6 + buttonHeight / 2) {
            if (collisionStat) {
                alert("Please disable no collisions to enable this!")
            } else {
                dynamicStat = !dynamicStat
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 4 * height / 6 - buttonHeight / 2 && mouseY < 4 * height / 6 + buttonHeight / 2) {
            menuStage--
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 5 * height / 6 - buttonHeight / 2 && mouseY < 5 * height / 6 + buttonHeight / 2) {
            menuStage = 0
            window.sessionStorage.removeItem("settings")
            settingsPackager()
        }
    }
}

function backgroundMusic() {
    if (floor(random(0, 9223372036854775807)) == 9223372036854775807) {
        Music1.play()
        Music1.loop()
        Music1.setVolume(0.3)
        userStartAudio()
    } else if (floor(random(0, 100))==0) {
        Music2.play()
        Music2.loop()
        Music2.setVolume(0.8)
        userStartAudio()
    } else if (floor(random(0, 200)) ==0){
        RobotRock.play()
        RobotRock.loop()
        RobotRock.setVolume(0.5)
    } else {
        Music2.play()
        Music2.loop()
        Music2.setVolume(0.3)
        userStartAudio()
    }
}
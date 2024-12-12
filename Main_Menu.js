const buttonWidth = 900
const buttonHeight = 100

let menuStage = 0
let Music1, Music2, controls, RobotRock, mrBeast, flag
let collisionStat = false
let dynamicStat = false
let sensitivityLevel = 3, AILevel = 3, qLength = 2, rLength = 15
// Settings packager is responsible for making settings accessable to the other files so it can be applied
function settingsPackager(Playermap = undefined) {
    window.sessionStorage.clear()
    // sessionStorage is cleared to prevent an override
    let selectedSettings = {sens: sensitivityLevel, diff:AILevel, qL: qLength, rL: rLength, noCol:collisionStat, dyCol: dynamicStat}
    let JSONSettings = JSON.stringify(selectedSettings)
    // The JSONObject is stringified so it can be used in local storage

    // If the player has selected time trial and a map on it, the packager also sends the map data
    if (Playermap){
        window.sessionStorage.setItem("map", Playermap)
    }
    // The settings are then saved in session storage
    window.sessionStorage.setItem("Settings", JSONSettings)
}

/***
 * @param {string} - Takes Player Map as an input, if undefined, map data is not stored.
 */

function preload() {
    soundFormats("mp3")
    Music1 = loadSound('FT')
    Music2 = loadSound('FTh [music]')
    RobotRock = loadSound('Audio/Robot Rock')
    //mrBeast = loadSound('Audio/mrbeast')
    controls = loadImage('images/pixil-frame-0 (2).png')
    flag = loadImage('images/ezgif-1-7a5892843b.gif')
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
    push()
    textSize(80)
    textAlign(CENTER, TOP)
    fill("black")
    textStyle(BOLDITALIC)
    text("Pole                  2025", width/2, 0)
    fill("grey")
    text("Position  ", width/2, 0)
    pop()
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
    text("Grand Prix (WIP?)", width / 2, 2 * height / 4)
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
    /** The menu is placed into stages 
     * These stages determine what buttons are shown to the player
    */
    background(255)
    image(flag, 0, 0, width, height)
    if (menuStage === 0) { // The First stage visible to the player is the default stage of the menu
        playButton()
        settingsButton()
    } else if (menuStage === 1) { // The second stage shows the gamemode options to the player
        NormalGameButton()
        timeTrialButton()
        backButton()
    } else if (menuStage === 2) { //  The third stage displays the maps to the player in time trial
        timeTrialMaps()
    } else if (menuStage === 3) { //  The fourth stage displays the main settings buttons to the player
        settingsButtons()
    } else if (menuStage === 4) { // The fifth stage displays the game altering settings to the player
        superSettingsButtons()
    } else if (menuStage === 5){ // The fifth stage shows the controls to the player
        controlsScreen()
    }
}

function timeTrialMaps() {
    // Create a custom button with text on it containing the name with each map
    // Any button with a text colour of gold is an event map
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
    push()
    text("Vortex Velocity Raceway", width / 2, 1 * height / 7) // The track used in the weekly championship is highlighted in gold
    pop()
    text(`Viper’s Nest Circuit`, width / 2, 2 * height / 7)
    text("Silver Sands Speedway - w Chicane", width / 2, 3 * height / 7)
    push()
    text("Silver Sands Speedway - w/o Chicane", width / 2, 4 * height / 7)
    pop()
    push()
    fill('gold')
    text("Avus", width / 2, 5 * height / 7)
    pop()
    text("Back", width / 2, 6 * height / 7)

}

function settingsButtons() {
    // create a custom button with text on it containing the value of each variable
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
    text(`AI Difficulty ${AILevel}`, width / 2, 3 * height / 8) // Has no effect
    text(`Qualifying Length ${qLength}`, width / 2, 4 * height / 8)
    text(`Race Length ${rLength}`, width / 2, 5 * height / 8)
    text(`Controls`, width / 2, 6 * height / 8)
    text("Next", width / 2, 7 * height / 8)
}

function superSettingsButtons() {
    // create a custom button with text on it containing the value of each variable
    fill(122, 122, 122)
    rect(width / 2 - buttonWidth / 2, 2 * height / 7 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 3 * height / 7 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 4 * height / 7 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 5 * height / 7 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    rect(width / 2 - buttonWidth / 2, 6 * height / 7 - buttonHeight / 2, buttonWidth, buttonHeight, 30)
    fill(255)
    textFont('Titillium Web')
    textAlign(CENTER, CENTER)
    text("Super Not-So-Secret Secret Settings", width / 2, 1 * height / 7)
    text(`Disable Collisions ${collisionStat}`, width / 2, 2 * height / 7)
    text(`Turn on Dymanic Collision ${dynamicStat}`, width / 2, 3 * height / 7)
    text("Found a bug? Click me!", width / 2, 4*height/7)
    text(`Back to Settings`, width / 2, 5 * height / 7)
    text(`Back to Menu`, width / 2, 6 * height / 7)

}

//display the controls image
function controlsScreen(){
    imageMode(CENTER)
    noSmooth()
    image(controls, width / 2, height / 4, width, 3*height/4)
}

function mouseClicked() {
    /**
     * The mouseClicked() function is a mess. I know.
     * Each outer if statement is dedicated to a stage of the menu seen above
     * Inner if statements check to see if the user has clicked within the boundary of a button.
     */


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
            settingsPackager("map1")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 2 * height / 7 - buttonHeight / 2 && mouseY < 2 * height / 7 + buttonHeight / 2) {
            settingsPackager("map2")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 3 * height / 7 - buttonHeight / 2 && mouseY < 3 * height / 7 + buttonHeight / 2) {
            settingsPackager("map3")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 4 * height / 7 - buttonHeight / 2 && mouseY < 4 * height / 7 + buttonHeight / 2) {
            settingsPackager("map5")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 5 * height / 7 - buttonHeight / 2 && mouseY < 5 * height / 7 + buttonHeight / 2) {
            settingsPackager("map4")
            window.location.assign("Time_Trial.html")
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 6 * height / 7 - buttonHeight / 2 && mouseY < 6 * height / 7 + buttonHeight / 2) {
            menuStage--
        }
    } else if (menuStage == 3) {
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 2 * height / 8 - buttonHeight / 2 && mouseY < 2 * height / 8 + buttonHeight / 2) {
            sensitivityLevel++
            // Increment the value of sensitivity and reset to 1 if the value is greater than 5
            if (sensitivityLevel == 6) {
                sensitivityLevel = 1
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 3 * height / 8 - buttonHeight / 2 && mouseY < 3 * height / 8 + buttonHeight / 2) {
            AILevel++
            // Increment the value of Ai Strength and reset to 1 if the value is greater than 5
            if (AILevel == 6) {
                AILevel = 1
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 4 * height / 8 - buttonHeight / 2 && mouseY < 4 * height / 8 + buttonHeight / 2) {
            // Prompt the player to enter a quali length
            let tempQLength = parseInt(prompt("Please enter a length for Qualifying"))
            // Check the player's input is even an integer
            if (!Number.isInteger(tempQLength)) {
                console.warn("Invalid Input")
            } else {
                // Check whether the player's input is within range
                if (!(tempQLength > 0 && tempQLength < 15)) {
                    console.warn("Invalid Input")
                } else {
                    // Update the length of Qualifying if these checks are passed
                    qLength = tempQLength
                }
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 5 * height / 8 - buttonHeight / 2 && mouseY < 5 * height / 8 + buttonHeight / 2) {
            // Prompt the player to enter a quali length
            let tempRLength = parseInt(prompt("Please enter a length for the Race"))
            // Check the player's input is even an integer
            if (!Number.isInteger(tempRLength)) {
                console.warn("Invalid Input")
            } else {
                // Check whether the player's input is within range
                if (tempRLength < 0 || tempRLength > 100) {
                    console.warn("Invalid Input")
                } else {
                    // Update the length of Qualifying if these checks are passed
                    rLength = tempRLength
                }
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 6 * height / 8 - buttonHeight / 2 && mouseY < 6 * height / 8 + buttonHeight / 2) {
            menuStage = 5
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 7 * height / 8 - buttonHeight / 2 && mouseY < 7 * height / 8 + buttonHeight / 2) {
            menuStage++
        }
    } else if (menuStage===5){
        menuStage = 3
    }else {
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 2 * height / 7 - buttonHeight / 2 && mouseY < 2 * height / 7 + buttonHeight / 2) {
            if (dynamicStat) {
                alert("Please disable dynamic collisions to enable this!")
            } else {
                collisionStat = !collisionStat
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 3 * height / 7 - buttonHeight / 2 && mouseY < 3 * height / 7 + buttonHeight / 2) {
            if (collisionStat) {
                alert("Please disable no collisions to enable this!")
            } else {
                dynamicStat = !dynamicStat
            }
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 5 * height / 7 - buttonHeight / 2 && mouseY < 5 * height / 7 + buttonHeight / 2) {
            window.open("https://github.com/benkarting30/PolePosition2025Game/issues") // Sends the player to the issues page of the github where they can report bugs
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 5 * height / 7 - buttonHeight / 2 && mouseY < 5 * height / 7 + buttonHeight / 2) {
            menuStage--
        }
        if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 + buttonWidth / 2 && mouseY > 6 * height / 7 - buttonHeight / 2 && mouseY < 6 * height / 7 + buttonHeight / 2) {
            menuStage = 0
            window.sessionStorage.removeItem("settings")
            settingsPackager()
        }
    }
}

function backgroundMusic() {
    /*The backgroundMusic function contains easter eggs for the player to find
    1. There is 1 in the 64 bit ingeter limit chance that the incorrect music plays (music1)
    2. There is a 1/50 chance that the correct music plays but louder 
    3. There is a 1/100 chance that "Daft Punk - Robot Rock" plays instead of the correct music
    */
    if (floor(random(0, 9223372036854775807)) == 9223372036854775807) {
        Music1.play()
        Music1.loop()
        Music1.setVolume(0.3)
        userStartAudio()
    } else if (floor(random(0, 50))==0) {
        Music2.play()
        Music2.loop()
        Music2.setVolume(0.8)
        userStartAudio()
    } else if (floor(random(0, 100)) ==0){
        RobotRock.play()
        RobotRock.loop()
        RobotRock.setVolume(0.5)
    // }  else if (floor(random(0, 250)) == 2){
    //     mrBeast.play()
    //     mrBeast.loop()
    //     mrBeast.setVolume(0.5)
    } else {
        Music2.play()
        Music2.loop()
        Music2.setVolume(0.3)
        userStartAudio()
    }
}
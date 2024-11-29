let tileSize = 10
let map1, map2, map3, trackLimit, timingLine, testing, start, player, track, car1, car2, car3, car4, cars, mapSelected, slowArea, startSlowArea, slowed, removeSlow, gravel
let resButton
let maps = [map1, map2, map3]
let debugInput = "map3"
let gear = 1
let lapStarted = false
let sessionStarted = false
let sessionComplete = false
let lap = 1
let fastestOnLap = 1
let ttLaps = []
let fastestLapInfo = []
let hasStalled = false
let Paused = false
let PST = 0
let endGame = false
let timestartheld
let recentlySlowed = false
let inReverse = false
let carImages
let EnTrackLimits, engineidle, enginestart
let lapInvalid = false
let engineOn = true
let colState, PlayerSensitivity
let carImg1, carImg2, carImg3, carImg4, boatImg
let laptime = 24.231
let fastestLap = 22.342
let wallsA, WallsB, WallATrigger, WallBTrigger, cheaterWall, cheaterTrigger
let nitroTime = 10, nitroActive = false, ForcedRecharge = 0
//import { UpdateData, SetFL, GetLaptime, ResetLaptime, GetFL } from "./Functs.js";


function preload() {
    // Preload all the images and sounds used by the game
    carImg1 = loadImage('images/cars/cars_racer (1).png')
    carImg2 = loadImage('images/cars/cars_racer (2).png')
    carImg3 = loadImage('images/cars/cars_racer (3).png')
    carImg4 = loadImage('images/cars/cars_racer (4).png')
    boatImg = loadImage('images/cars/boat.png')
    boatImg.height = 240
    boatImg.width = 300
    carImages = [carImg1, carImg2, carImg3, carImg4]
    EnTrackLimits = loadSound("Track_Limits.mp3")
    engineidle = loadSound("Audio/8-bit-car-engine-idle.mp3", function(loadedSound){
        buffer = loadedSound.buffer
    })
    enginestart = loadSound("Audio/8-bit-car-engine-start.mp3")
    // console.log(window.LapTimeModule.GetLaptime())
    // console.log(window.LapTimeModule.GetFL())
    // console.log(navigator.userAgent.includes("Chrome"))
    // Check to see if the player has been caught cheating within the past day
    if (window.localStorage.getItem("Cheated")){
        let time = Date.now()
        if (time - window.localStorage.getItem("Time") < 86400000){
            window.localStorage.clear() // forgive the player as cheating data is stored in local storage
        } else {
            sessionStorage.map = "mapC" // Loads the player into the cheater map
            throw new Error(`This isn't a error, you've just cheated previously. So don't play :)`) // Throws an error in the console but doesn't halt code executing
        }
    }
  }

 function setup() {
    // Create Canvas and set background and frameRate
    createCanvas(windowWidth, windowHeight);
    background(255);
    frameRate(60);
    // Set the default font
    defaultFont = textFont()
    // Retrieve the player's selected map from session storage
    let storage = sessionStorage.map
    console.log(storage)
    // Does not let the player's selection override the map selected if they have cheated
    if (mapSelected != "mapC"){
        mapSelected = storage
    }

    // Load settings for the players
    let settingsJSON = JSON.parse(window.sessionStorage.Settings)
    PlayerSensitivity = settingsJSON.sens
    let debuged = settingsJSON.debug
    // Check that no special gamemodes have been selected and set collisions depending on it
    if (settingsJSON.noCol){
        colState = 'n'
    } else if (settingsJSON.dyColD){
        colState = 'd'
    } else {
        colState = undefined
    }
    // playerSensitivity = settingsArray.sen


    // mapSelected = localStorage.getItem(map)
    // if (!mapSelected) {
    //     mapSelected = debugInput
    // }
    // Create tile types



    if (colState){

        // Create the player Sprite
        player = new Sprite()
        player.collider = colState
        player.tile = 'x'
        player.color = 'yellow'
        if (debuged || PlayerSensitivity == 1){ 
            player.image = boatImg // Sets the player's image to a large boat if they have their sensitivity set to 1.
            player.scale = 0.75 
        } else {
            player.image = random(carImages) // Otherwise the player image will be random from the 4 car images present
            player.scale = 0.045
        }
        // Set player's direction to face the start line depending on the map
        player.direction = Math.PI / 2
        if (mapSelected == "map2") {
            player.rotation = 0
        }
        if (mapSelected == "map4"){
            player.rotation = 138
        }
        player.w = 11
        player.h = 6

        trackLimit = new Group()
        trackLimit.color = "red"
        trackLimit.tile = 'b'
        trackLimit.collider = colState
        trackLimit.w = tileSize
        trackLimit.h = tileSize



        track = new Group()
        track.tile = '.'
        track.w = tileSize;
        track.h = tileSize;
        track.collider = colState;
        if (PlayerSensitivity == 1){
            track.color = "#2074bc"
        } else {
            track.color = "#5a5348";
        }
        track.visible = true;

        start = new Group()
        start.collider = colState
        start.tile = "s"
        start.visible = true
        start.w = tileSize
        start.h = tileSize
        player.overlapping(start, function () {
            StartLineOverlap()// Calls this function when overlapped by the player
        })

        timingLine = new Group();
        timingLine.collider = colState;
        timingLine.tile = "t";
        timingLine.visible = false;
        timingLine.color = "orange";
        timingLine.w = tileSize;
        timingLine.h = tileSize;
        player.overlapping(timingLine, function () {
            TimingOverlap()// Calls this function when overlapped by the player
        })

        // unused group, kept in code incase needed from future debug or testing
        testing = new Group();
        testing.collider = colState;
        testing.tile = "=";
        testing.visible = true;
        testing.color = "orange";
        testing.w = tileSize;
        testing.h = tileSize;

        slowArea = new Group()
        slowArea.collider = colState
        slowArea.tile = "B"
        slowArea.color = "#969292"
        slowArea.w = tileSize
        slowArea.h = tileSize
        slowArea.visible = false
        player.overlaps(slowArea, function () {
            lapInvalid = true // Makes the player's lap invalid
            slowed = true // Limits the player's speed as a penalty
        })

        removeSlow = new Group()
        removeSlow.collider = colState
        removeSlow.tile = 'R'
        removeSlow.w = tileSize
        removeSlow.h = tileSize
        removeSlow.visible = true
        removeSlow.color = '#FF0000'
        removeSlow.opacity = 0.5
        player.overlaps(removeSlow, function () {
            if (slowed){
                EnTrackLimits.play() // Plays the engineer voice line that informs them of track limits
            }
            slowed = false // Removes slowness on overlap
        })

        startSlowArea = new Group()
        startSlowArea.collider = colState
        startSlowArea.tile = "S"
        startSlowArea.color = "#969292"
        startSlowArea.visible = false
        startSlowArea.w = tileSize
        startSlowArea.h = tileSize
        player.overlapping(startSlowArea, function () {
            StartLineOverlap()// On map3 and map5, this is used if the player has entered the pitlane
            // Potential future TODO:
            // Allow Nitro or Damage to be fixed/refilled in the pitlane
        })

        gravel = new Group()
        gravel.tile = "G"
        gravel.color = '#e4b382'
        gravel.collider = colState
        gravel.visible = 'true'
        gravel.w = tileSize
        gravel.h = tileSize
    } else {

        player = new Sprite()
        player.collider = 'd'
        player.tile = 'x'
        player.color = 'yellow'
        if (debuged || PlayerSensitivity == 1){
            player.image = boatImg
            player.scale = 0.75
        } else {
            player.image = random(carImages)
            player.scale = 0.045
        }
        player.direction = Math.PI / 2
        if (mapSelected == "map2") {
            player.rotation = 0
        }
        if (mapSelected == "map4"){
            player.rotation = 138
        }
        player.w = 11
        player.h = 6

        trackLimit = new Group()
        trackLimit.color = "red"
        trackLimit.tile = 'b'
        trackLimit.collider = 's' //Collisions with the track limit will be processed as static
        trackLimit.w = tileSize
        trackLimit.h = tileSize



        track = new Group()
        track.tile = '.'
        track.w = tileSize;
        track.h = tileSize;
        track.collider = "n";
        if (PlayerSensitivity == 1){
            track.color = "#2074bc"
        } else {
            track.color = "#5a5348";
        }
        track.visible = true;
        player.overlapping(track, function(){
            slowed = false
        })

        start = new Group()
        start.collider = "n"
        start.tile = "s"
        if (PlayerSensitivity == 1){
            start.visible = false
        } else {
            start.visible = true
        }
        start.w = tileSize
        start.h = tileSize
        player.overlapping(start, function () {
            StartLineOverlap()
        })

        timingLine = new Group();
        timingLine.collider = "n";
        timingLine.tile = "t";
        timingLine.visible = false;
        timingLine.color = "orange";
        timingLine.w = tileSize;
        timingLine.h = tileSize;
        player.overlapping(timingLine, function () {
            TimingOverlap()
        })

        testing = new Group();
        testing.collider = "n";
        testing.tile = "=";
        testing.visible = true;
        testing.color = "orange";
        testing.w = tileSize;
        testing.h = tileSize;

        slowArea = new Group()
        slowArea.collider = "n"
        slowArea.tile = "B"
        slowArea.color = "#969292"
        slowArea.w = tileSize
        slowArea.h = tileSize
        slowArea.visible = false
        player.overlaps(slowArea, function () {
            lapInvalid = true
            slowed = true
        })

        removeSlow = new Group()
        removeSlow.collider = 'n'
        removeSlow.tile = 'R'
        removeSlow.w = tileSize
        removeSlow.h = tileSize
        removeSlow.visible = true
        removeSlow.color = '#FF0000'
        removeSlow.opacity = 0.5
        player.overlaps(removeSlow, function () {
            if (slowed){
                EnTrackLimits.play()
            }
            slowed = false
        })

        startSlowArea = new Group()
        startSlowArea.collider = "n"
        startSlowArea.tile = "S"
        startSlowArea.color = "#969292"
        startSlowArea.visible = false
        startSlowArea.w = tileSize
        startSlowArea.h = tileSize
        player.overlapping(startSlowArea, function () {
            StartLineOverlap()
        })

        gravel = new Group()
        gravel.tile = "G"
        gravel.color = '#e4b382'
        gravel.collider = 'n'
        gravel.visible = true
        gravel.w = tileSize
        gravel.h = tileSize
        
        wallsA = new Group()
        wallsA.tile = "Y"
        wallsA.color = "red"
        wallsA.collider = 's'
        wallsA.visible = true
        wallsA.w = tileSize
        wallsA.h = tileSize

        WallsB = new Group()
        WallsB.tile = 'y'
        WallsB.color = 'red'
        WallsB.collider = 's'
        WallsB.visible = true   
        WallsB.w = tileSize
        WallsB.h = tileSize

        WallATrigger = new Group()
        WallATrigger.tile = 'V'
        WallATrigger.collider = 'n'
        WallATrigger.visible = false
        WallATrigger.h = tileSize
        WallATrigger.w = tileSize
        player.overlaps(WallATrigger, () =>{
            WallsB.collider = 'n'
            WallsB.visible = false
            wallsA.collider = 's'
            wallsA.visible = true
        })

        WallBTrigger = new Group()
        WallBTrigger.tile = 'v'
        WallBTrigger.collider = 'n'
        WallBTrigger.visible = false
        WallBTrigger.h = tileSize
        WallBTrigger.w = tileSize
        player.overlaps(WallBTrigger, () =>{
            wallsA.collider = 'n'
            wallsA.visible = false
            WallsB.collider = 's'
            WallsB.visible = true
        })
        
        cheaterWall = new Group()
        cheaterWall.tile = 'F'
        cheaterWall.collider = 'n'
        cheaterWall.visible = false
        cheaterWall.h = tileSize
        cheaterWall.w = tileSize

        cheaterTrigger = new Group()
        cheaterTrigger.tile = 'f'
        cheaterTrigger.collider = 'n'
        cheaterTrigger.visible = false
        cheaterTrigger.h = tileSize
        cheaterTrigger.w = tileSize
        player.collides(cheaterTrigger, () => {
            cheaterWall.collider = 's'
        })
    
    }




    switch (storage[3]) {
        case "1":
            map1 = new Tiles(
                [
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "............................................................................bbbbbbbbbbbbb...........",
                    "..............................bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb......bb.............bbb........",
                    "............................bb........................s.............bb...bb................bb.......",
                    "..........................bb..........................s...............bb.b..................bb......",
                    "........................bb............................s................b.b...................b......",
                    "......................bb..............................s................b.b...................b......",
                    "....................bb........................x.......s................bb....................b......",
                    "...................b..................................s........................bbb...........b......",
                    ".................bb.......................bbbbbbbbbbbbbbbbbbbbbbbbb............b.bb..........b......",
                    "...............bb......................bbbb.......................bb..........bb..b..........b......",
                    ".............bb.....................bbbb...........................b.........bb...b..........b......",
                    "...........bb......................bb..............................b........bb....b..........b......",
                    ".........bb......................bbb...............................bb......bb.....bvvvvvvvvvvb......",
                    ".......bb.......................bb..................................bb....bb......b.........bb......",
                    "......b.....................bbbb.....................................bbbbbb......bb.........b.......",
                    "......b...................bbb....................................................b..........b.......",
                    "......b................bbb......................................................bb.........bb.......",
                    "......b.........bbbbbbb........................................................bb..........b........",
                    "......b........bb..............................................................b..........bb........",
                    "......b........b..............................................................bb..........b.........",
                    ".....b.........b..............................................................b..........bb.........",
                    ".....b.........b.............................................................bb..........b..........",
                    ".....b.........b............................................................bb...........b..........",
                    ".....b.........bb..........................................................bb............b..........",
                    ".....b..........bb........................................................bb............b...........",
                    ".....b...........bb.....................................................bbb.............b...........",
                    ".....b.............b..................................................bbb..............bb...........",
                    "......b.............bb..............................................bbb................b............",
                    ".......b..............bb.........................................bbb.................bb.............",
                    "........b.............Vbbb...................................bbbbb.................bbb..............",
                    "........b............V...bb................................bbb....................bb................",
                    ".........b..........V......bb.............................bb.....................bb.................",
                    "..........b........V.........b...........................bb....................bbb..................",
                    "...........b.....VV...........b.........................bb.....................b....................",
                    "............b...V..............bb......................bb....................bbb....................",
                    ".............b.V.................bb....................b....................bb......................",
                    ".............bV...................bbb.................bb..................bbb.......................",
                    "..............b.....................bbbb..............b..................bb.........................",
                    "...............b.......................bb.............b.................bb..........................",
                    "................b......................bb............bb...............bbb...........................",
                    ".................bb.....................bbbbbbbbbbbbbbY.............bbb.............................",
                    "...................bb....................yy...........YYY..........bb...............................",
                    ".....................bb..................y..............Y.........bb................................",
                    ".......................bb...............yy..............YYY......bb.................................",
                    ".........................bb............yy.................YY...bbb..................................",
                    "...........................bb.........yy...................YY.bb....................................",
                    ".............................bb.......y.....................Ybb.....................................",
                    "...............................bb...yyy.....................bb......................................",
                    ".................................bb.y...................yyyb........................................",
                    "...................................b.................yyyy.bb........................................",
                    ".................................bbYY..............yyy.....bbbb.....................................",
                    "................................b...YY............yy..........bbbbb.................................",
                    "...............................b.....YYY.....bbbbb.................bbbbb............................",
                    ".............................bb........YY...bb...bb....................bbb..........................",
                    "............................b...........Ybbbb.....bb......................bbb.......................",
                    "...........................b............bb.........bb.......................bbb.....................",
                    ".........................bb............bb............bbb......................bbbb..................",
                    "........................b.............bb................bbb......................bbb................",
                    "......................bb............bb....................bbb......................bbb..............",
                    ".....................b.............bb.......................bbb......................bb.............",
                    "....................b.............b............................bb......................b............",
                    "..................bb...........bbb..............................bbb....................bb...........",
                    ".................b...........bbb................bbbbbbbb..........bbb...................b...........",
                    "..............bbb...........bb...............bbb.......bbb...........bbb................b...........",
                    "..............b............bb...............bb...........bbb...........bbbb..............b..........",
                    "..............b...........b................bb..............bbbb...........bbb............b..........",
                    "..............b..........b................bbt................Vbbbb..........bb...........b..........",
                    ".............b..........bb...............bb..t...............V...bbbb........bbb.........b..........",
                    ".............b..........b...............bb...t...............V......bbbb.......bb........b..........",
                    ".............b..........b..............bb.....t..............V.........bbbbbbbbbb........b..........",
                    ".............b..........b.............bb......t..............V...........................b..........",
                    "............bb..........bb............b........t.............V...........................b..........",
                    "............b............bbb.........bb........t.............V...........................b..........",
                    "............b..............bb........b..........t.......bbbbbV...........................b..........",
                    "............b...............bbbbbb..bb..........t...bbbb....bbbbbb.......................b..........",
                    "............b...................vbbbb............tbbb............bbb.....................b..........",
                    "............b...................v................bb................bbbb................bb...........",
                    "............bb.................v................bb....................bbb..............b............",
                    ".............b.................v...............bb.......................bbbb..........bb............",
                    "..............b...............v................b...........................bbbbb....bbb.............",
                    "..............bb..............v...............bb................................bbbbb...............",
                    "................b.............v...............b.....................................................",
                    "................b............v...............bb.....................................................",
                    ".................bb..........v...............b......................................................",
                    "...................b........v...............bb......................................................",
                    "....................bb......v..............b........................................................",
                    ".....................bbb...v.............bbb........................................................",
                    ".......................bbbbv...........bbb..........................................................",
                    "..........................bbbbbbbbbbbbbb............................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                ],
                0,
                0,
                tileSize,
                tileSize
            );
            break
        case "2":
            map2 = new Tiles(
                [
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................bbbbbbbbb.......................................................................",
                    "....................bBBBBBBBb.......................................................................",
                    "....................bBBBBBBBb.......................................................................",
                    "....................bBBBBBBBb.............bbbbbbb......................................bbbbb........",
                    "....................bBBBBBBBBb....bbbbbbbbb.....bbb..................................bb.....b.......",
                    "....................bBBBBBBBBbbbbbb...............bbb................................b.......b......",
                    "....................bBBBBBBB........................bb...............................b........b.....",
                    "....................bBBBBB............................bb...........................bbb.........b....",
                    "....................bBBB...............................bbb........................bb...........b....",
                    "....................bBB..................................bb...bb..bbbbbbbbbbbbbbbbb............b....",
                    "....................b.....................................bbbb..bb.............................b....",
                    "...................bb........................................bbb.........................bb....b....",
                    "...................b.....................................................................b.....b....",
                    "...................b...................bbbbbbbb.........................bb..............bb....bb....",
                    "..................bb................bbbb......bbb......................b..b............bbb....b.....",
                    "..................b.............bbbbb...........bbbb...................b..bb..........bbb.....b.....",
                    ".................bb..........bbb...................bbbb..............bbb...bb........bb.b.....b.....",
                    ".................b.......bbbbb.........................bbbb......bbbbb......bbb...bbb..b......b.....",
                    "................bb......bb.................................bbbbbbb............bbbbb....b......b.....",
                    "................b.......b.............................................................bb.....bb.....",
                    "................b.......b.............................................................b......b......",
                    "...............bb.......b.............................................................b......b......",
                    "...............b.......bb.............................................................b......b......",
                    "..............bb.......b..............................................................b......b......",
                    "..............b........b..............................................................b.....bb......",
                    "..............b........b.............................................................bb.....b.......",
                    ".............bb........b.............................................................b......b.......",
                    ".............b.........b.............................................................b......b.......",
                    "............bb........bb............................................................bb......b.......",
                    "............b........bb.............................................................b......bb.......",
                    "............b........b.............................................................bb......b........",
                    "...........bb........b.............................................................b.......b........",
                    "...........b.........b............................................................bb......bb........",
                    "...........b........bb...........................................................bb.......b.........",
                    "...........b........b...........................................................bb.......b..........",
                    "..........b........bb...........................................................b........b..........",
                    "..........b........b...........................................................bb.......bb..........",
                    "..........bsss....bb..........................................................b.........b...........",
                    "..........b..sssssb..........................................................bb........b............",
                    ".........b........b.........................................................b.........bb............",
                    ".........b.......bb.......................................................bbb........bb.............",
                    ".........b.......b.......................................................bb.........bb..............",
                    "........bb.......b.....................................................bbb.........bb...............",
                    "........b.......bb...................................................bbb.........bbb................",
                    "........b.......b.................................................bbbbt.........bb..................",
                    "........b.......b...........................bbbbbbbbbbbbbb......bbb...t.........b...................",
                    "........b...x...b...................bbbbbbbbb.............b....bb.....tt.......bb...................",
                    "........b.......b.................bbb......................b...b.......t......bb....................",
                    "........b.......b...............bbb.........................b..b.......t....bbb.....................",
                    "........b.......b.............bbb............................b.b.......t.bbbb.......................",
                    "........b.......b............bb............bbbbbbbbbbbbbb.....bb....bbbbbb..........................",
                    "........b.......b...........bb.........bbbbb............bb..........b...............................",
                    "........b.......b...........b........bbb.................bb.........b...............................",
                    "........b.......b..........bb.......b.....................b.........b...............................",
                    "........b.......bbb........b.......bb.....................bb........b...............................",
                    "........b.........b.......b.......bb.......................bbbbbbbbbb...............................",
                    "........bb........b......bb......bb.................................................................",
                    ".........b........bb.....b.......b..................................................................",
                    ".........b.........b.....b.......b..................................................................",
                    ".........b.........b....bb......bb..................................................................",
                    ".........b.........b....b.......b...................................................................",
                    ".........b.........b....b.......b...................................................................",
                    ".........b.........b....b.......b...................................................................",
                    ".........b.........b....b.......b...................................................................",
                    "..........b........b....b.......b...................................................................",
                    "..........b........b....b.......b.............................bbbbbbbbbbb...........................",
                    "..........b........b....b.......b...........................bbb.........bbbb........................",
                    "..........b........b....bb......b..........................bb...............b.......................",
                    "..........b........b.....b......bb.......................bbb.................bb.....................",
                    "..........b........b.....b.......bbbb...................bb....................bbb...................",
                    "..........b........b.....b..........bbbbbbbbbbbbbbbbbbbbb.......................bb..................",
                    ".........b........b......b.......................................................bbb................",
                    ".......bb.........b......b.........................................................bb...............",
                    ".......b.........bb......bb.........................................bbbbbb..........b...............",
                    ".......b.........b........b...................................bbbbbbb....bbbb........b..............",
                    ".......b.......bb.........bb...............................bbbb.............bb.......b..............",
                    ".......b.......b............bbbbb.......................bbbb.................bb.......b.............",
                    ".......b......b.................bbbbbbbbbbbbbbbbbbbbbbbbb.....................b.......b.............",
                    ".......b......b...............................................................b.......bb............",
                    ".......b......b..................bbbbbb.......................................b........b............",
                    ".......b......b.............bbbbbb....bbbbbb..................................b........b............",
                    ".......b......b.......bb..bbb...............bbb...............................b........b............",
                    ".......b.......bbb..bbbbbbb...................bbbb...........................bb........b............",
                    ".......b.........bbbb............................bbbb.......................bb.........b............",
                    "........b...........................................bb.....................bb..........b............",
                    "........b............................................bbb.................bb...........bb............",
                    "........b.........................bbbbbbbb.............bb...........bbbbb............bb.............",
                    "........bb.....................bbbb......bbb............bbbbbbbbbbbb.................b..............",
                    ".........bb.................bbbb...........bb......................................bbb..............",
                    "..........bbbb.......bbbbbbbb...............b....................................bbb................",
                    "..............bbbbbbbb......................bb.................................bbb..................",
                    ".............................................b................................bbb...................",
                    "..............................................bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb....................",
                    "....................................................................................................",
                ],
                0,
                0,
                tileSize,
                tileSize
            );
            player.rotation = -90
            break
        case "3":
            new Tiles(
                [
                    "....................................................................................................",
                    ".......bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb............................................................",
                    "......b.............................S.Bbbb..........................................................",
                    ".....b..............................S.B..bbb........................................................",
                    "....b...............................S.B....bb.......................................................",
                    "...b................................S.B.....b.......................................................",
                    "..b..........bbbbbbbbbbbbbbbbbbbbbbbbbbRRRRRbbbbbbbbbbbbbbbbbb......................................",
                    "..bBBBBBBbbbbb......................s...........R.B...bb..B..bb.....................................",
                    "..bRRRRbb...........................s...........R.B....b..B...bb....................................",
                    "..b.................................s...........R.B.......B..RRbbbbbbbbbbbbbbbbb....................",
                    ".b..................................s...........R.Bb......b.RR.................bbb..................",
                    ".b..........................x.......s...........R.bb.....bb.R....................bbb................",
                    ".b..................................s...........bbbbbbbbbbbb.......................bb...............",
                    "bb........................bbbbbbbbbbs...........b.......bbb.........................bb..............",
                    "b................bbbbbbbbbb........bbbbbbbb.....bb....bbb............................bb.............",
                    "b............bbbbb........................b......b...bb.........bbbbbbbbbbbb..........b.............",
                    "b.........bbbb............................b......bb.bb.........bb..........bbb........bb............",
                    "b........bb...............................b.......bbb.......bbbb.............bb........bb...........",
                    "b........b................................bb...............bb.................bb........b...........",
                    "bb......bb.................................b..............bb...................bb.......bb..........",
                    ".b......bb.................................bbb............b.....................bb.......bb.........",
                    ".b.......b...................................bb.........bbb......................b........b.........",
                    ".b.......bb...................................bbb.....bbb........................bb.......bb........",
                    ".b........bb....................................bbbbbbb...........................b........b........",
                    ".b.........bb.....................................................................bb.......bb.......",
                    ".b..........bb.....................................................................b........b.......",
                    "..b..........bbb....................................................................b.......bb......",
                    "..bb...........bb...................................................................bb.......b......",
                    "...b.............bb..................................................................b.......b......",
                    "...bb.............bb.................................................................bb......bb.....",
                    "....b..............bb.................................................................b.......b.....",
                    "....bb..............bb..............bbbbbb............................................bb......bb....",
                    ".....bb..............bb...........bbbGGGGbbbb..........................................b.......b....",
                    "......bb..............b..........bbGGGGGGGGGbb.........................................b.......b....",
                    ".......bb..............b.......bbbGGGGGGGGGGGb.........................................b........b...",
                    "........bb.............b.......bGGGGGGGGGGGGGbb........................................b........b...",
                    ".........bb............b......bbGGGGGGGGGGGGGGb........................................b........b...",
                    "..........b............b.....bbBBBBBBBBBBBBBBBbb.......................................b........b...",
                    ".........b.............b....bbRRRRRRRRRRRRRRRRRbb......................................b........b...",
                    "........bb............bb....b...................bb....................................bb........b...",
                    "........b............bb....bb....................bb...................................b.........b...",
                    ".......b............bb.....b......................bb..................................b.........b...",
                    "......bb...........bb......b........................bb................................b.........b...",
                    "......b...........bb......bb.........................bb...............................b.........b...",
                    ".....bb..........bb.......b...........................bb.............................bb.........b...",
                    ".....b...........b.......bb............................bb............................b..........b...",
                    ".....b..........bb.......b..........bbbbbbb.............b............................b..........b...",
                    "....b...........b........b.........bb.....b.............bb..........................bb.........bb...",
                    "....b..........bb.......bb.........b......b..............b..........................b..........b....",
                    "....b..........b........b..........b......bb.............bb......................bbb...........b....",
                    "....b..........b........b..........b.......b..............b...................bbbb............bb....",
                    "...b...........b........b..........b.......b..............b.................bbb..............bb.....",
                    "...b...........b.......bb..........b.......bb..............b...............bb...............bb......",
                    "...b...........b.......b...........b........b..............b..............bb...............bb.......",
                    "..b............b.......b...........b........b..............b..............b.............bbbb........",
                    "..b............b......bb...........b........bb.............b..............b.......bbbbbbb...........",
                    "..b............b......b............b.........b.............bb.............b......bb.................",
                    "..b............b......b............b.........b..............b.............b......b..................",
                    "..b............b......b............b..........b.............b.............b......b..................",
                    "..b............b......b.............b.........b.............b.............bb.....b..................",
                    "..b............b......b.............b.........bb............b..............b.....bb.................",
                    "..b............b......b.............b..........b............b..............b......bb................",
                    "..bb...........b......b.............b..........bb...........b...............b......bb...............",
                    "...b...........b......b..............b..........b...........b...............b.......bb..............",
                    "...b...........bb.....b..............b..........b...........b...............bb.......bbb............",
                    "...bb...........b.....b..............b..........b...........b................b.........bb...........",
                    "....b...........b....bb..............b...........b..........b................bb.........bb..........",
                    "....b...........b....b...............b...........b..........b.................b..........bb.........",
                    "....b...........b....b...............b...........b..........b.................bb..........bb........",
                    ".....b..........bb...b...............b...........bb..........b.................bb..........bb.......",
                    ".....b...........b...b...............b............b..........b..................bb..........b.......",
                    "......b..........b...b...............b............b..........b...................bb.........bb......",
                    "......b..........bb..b...............b............bb.........b....................b..........b......",
                    "......bb..........bbbb...............b.............b.........b....................bb.........b......",
                    ".......b.............................b..............b........b.....................bb........bb.....",
                    ".......bb............................b...............b.......b......................b.........b.....",
                    "........b............................b...............bb......b......................b.........b.....",
                    "........b............................b................b......b......................b.........b.....",
                    ".........b...........................b................b......b......................b.........b.....",
                    ".........b..........................bb................bttttttbb.....................b........b......",
                    ".........bb.........................b.................bb......b.....................b........b......",
                    "..........b.......................bbb..................b......b.....................b........b......",
                    "..........b......................bb....................b......b....................bb........b......",
                    "...........b...................bbb.....................bb.....bb..................bb........bb......",
                    "...........bb..............bbbbb........................b......bbb........bbbbbbbbb.........b.......",
                    ".............bbbbbbbbbbbbbbb............................b........bbbbbbbbbb.................b.......",
                    "........................................................bb..................................b.......",
                    ".........................................................b.................................bb.......",
                    ".........................................................bb...............................bb........",
                    "..........................................................bb.............................bb.........",
                    "...........................................................bb...........................bb..........",
                    "............................................................bb........................bbb...........",
                    ".............................................................bb.....................bbb.............",
                    "..............................................................bb..............bbbbbbb...............",
                    "................................................................bbbbbbbbbbbbbbb.....................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                ],
                0,
                0,
                tileSize,
                tileSize
            )
            break
        case "4":
            new Tiles(
                [
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    ".................................................................bbbbbbbbbbb........................",
                    "..............................................................bbbb.........bb.......................",
                    "..........................................................bbbbb.............bb......................",
                    ".........................................................bb..................b......................",
                    ".......................................................bbb...................bb.....................",
                    "......................................................bb......................b.....................",
                    ".....................................................bb...........bbbbbb......b.....................",
                    "...................................................bbb...x.......bb....bb.....b.....................",
                    "..................................................bb.ss.........b.......b.....b.....................",
                    ".................................................bb...ss.......bb.......b.....b.....................",
                    "................................................bb.....ss...bbb........bb......b....................",
                    "...............................................bb.......ss..b........bbb......bb....................",
                    "..............................................bb.........ss.bbbbbbbbbb........b.....................",
                    ".............................................bb...........bbb.................b.....................",
                    "............................................bb...........bb...................b.....................",
                    "...........................................bb............b....................b.....................",
                    "..........................................bb............bb...................bb.....................",
                    "..........................................b............bb...................bb......................",
                    ".........................................bb...........bb.................bbb........................",
                    "........................................bb............b............bbbbbbb..........................",
                    ".......................................bb............b..........bbbb................................",
                    ".......................................b............bb.........bb...................................",
                    "......................................b............bb.........bb....................................",
                    ".....................................bb............b.........bb.....................................",
                    ".....................................b............b.........bb......................................",
                    "....................................bb...........bb.........b.......................................",
                    "....................................b...........bb.........bb.......................................",
                    "...................................bb...........b.........bb........................................",
                    "...................................b...........bb.........b.........................................",
                    "..................................b...........bb.........b..........................................",
                    ".................................bb...........b.........bb..........................................",
                    ".................................b...........bb........bb...........................................",
                    "................................b...........bb.........b............................................",
                    "...............................bb..........bb.........b.............................................",
                    "...............................b...........b.........bb.............................................",
                    "..............................bb..........bb........bb..............................................",
                    "..............................b..........bb.........b...............................................",
                    ".............................b..........bb.........b................................................",
                    ".............................b..........b.........bb................................................",
                    "............................bb.........b.........bb.................................................",
                    "............................b.........bb........bb..................................................",
                    "...........................bb.........b........bb...................................................",
                    "...........................b.........bb........b....................................................",
                    "..........................bb........bb........bb....................................................",
                    "..........................b........bb........bb.....................................................",
                    ".........................b........bb.........b......................................................",
                    ".........................b........b.........bb......................................................",
                    "........................b........b.........bb.......................................................",
                    ".......................bb.......bb.........b........................................................",
                    ".......................b........b.........bb........................................................",
                    ".......................b.......bb.........b.........................................................",
                    "......................bb.......b.........bb.........................................................",
                    ".....................bb.......b..........b..........................................................",
                    "....................bb.......bb.........bb..........................................................",
                    "...................bb........b.........bb...........................................................",
                    "..................bb........bb........bb............................................................",
                    ".................bb.........b.........b.............................................................",
                    "................bb.........b.........b..............................................................",
                    "................b.........bb........b...............................................................",
                    "...............bb.........b.........b...............................................................",
                    "..............bb.........bb........bb...............................................................",
                    ".............bb..........b.........b................................................................",
                    "...........bbb..........b..........b................................................................",
                    ".........bbb...........bb........bb.................................................................",
                    "........bb............bbt.......b...................................................................",
                    ".....bbb..............b..ttt....b...................................................................",
                    ".....b...............b.....ttt.bb...................................................................",
                    ".....b..............bb.......tbb....................................................................",
                    ".....b.............b..........b.....................................................................",
                    ".....b...........bb...........b.....................................................................",
                    ".....b..........bb............b.....................................................................",
                    ".....b......bbbbb............bb.....................................................................",
                    ".....b.......................b......................................................................",
                    ".....b......................b.......................................................................",
                    ".....bb....................bb.......................................................................",
                    "......bb...................b........................................................................",
                    ".......bb.................bb........................................................................",
                    "........bbb..............bb.........................................................................",
                    "...........bbbb.......bbbb..........................................................................",
                    "..............bbbbbbbbb.............................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                ],
                0,
                0,
                tileSize,
                tileSize
                
            )
            player.rotation = 135
            break
        case "5":
            new Tiles(
                [
                    "....................................................................................................",
                    ".......bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb............................................................",
                    "......b.............................S.Bbbb..........................................................",
                    ".....b..............................S.B..bbb........................................................",
                    "....b...............................S.B....bb.......................................................",
                    "...b................................S.B.....b.......................................................",
                    "..b..........bbbbbbbbbbbbbbbbbbbbbbbbbbRRRRRbbbbbbbbbbbbbbbbbb......................................",
                    "..bBBBBBBbbbbb......................s.................bb.....bb.....................................",
                    "..bRRRRbb...........................s..................b......bb....................................",
                    "..b.................................s..........................bbbbbbbbbbbbbbbbb....................",
                    ".b..................................s..............b......b....................bbb..................",
                    ".b..........................x.......s.............bb.....bb......................bbb................",
                    ".b..................................s.......bbbbbbbbbbbbbbbb.......................bb...............",
                    "bb........................bbbbbbbbbbs......b....b.......bbb.b.......................bb..............",
                    "b................bbbbbbbbbb........bbbbbbbb.....bb....bbb....b.......................bb.............",
                    "b............bbbbb........................b......b...bb.......bbbbbbbbbbbbbb..........b.............",
                    "b.........bbbb............................b......bb.bb.........bb..........bbb........bb............",
                    "b........bb...............................b.......bbb.......bbbb.............bb........bb...........",
                    "b........b................................bb...............bb.................bb........b...........",
                    "bb......bb.................................b..............bb...................bb.......bb..........",
                    ".b......bb.................................bbb............b.....................bb.......bb.........",
                    ".b.......b...................................bb.........bbb......................b........b.........",
                    ".b.......bb...................................bbb.....bbb........................bb.......bb........",
                    ".b........bb....................................bbbbbbb...........................b........b........",
                    ".b.........bb.....................................................................bb.......bb.......",
                    ".b..........bb.....................................................................b........b.......",
                    "..b..........bbb....................................................................b.......bb......",
                    "..bb...........bb...................................................................bb.......b......",
                    "...b.............bb..................................................................b.......b......",
                    "...bb.............bb.................................................................bb......bb.....",
                    "....b..............bb.................................................................b.......b.....",
                    "....bb..............bb..............bbbbbb............................................bb......bb....",
                    ".....bb..............bb...........bbbGGGGbbbb..........................................b.......b....",
                    "......bb..............b..........bbGGGGGGGGGbb.........................................b.......b....",
                    ".......bb..............b.......bbbGGGGGGGGGGGb.........................................b........b...",
                    "........bb.............b.......bGGGGGGGGGGGGGbb........................................b........b...",
                    ".........bb............b......bbGGGGGGGGGGGGGGb........................................b........b...",
                    "..........b............b.....bbBBBBBBBBBBBBBBBbb.......................................b........b...",
                    ".........b.............b....bbRRRRRRRRRRRRRRRRRbb......................................b........b...",
                    "........bb............bb....b...................bb....................................bb........b...",
                    "........b............bb....bb....................bb...................................b.........b...",
                    ".......b............bb.....b......................bb..................................b.........b...",
                    "......bb...........bb......b........................bb................................b.........b...",
                    "......b...........bb......bb.........................bb...............................b.........b...",
                    ".....bb..........bb.......b...........................bb.............................bb.........b...",
                    ".....b...........b.......bb............................bb............................b..........b...",
                    ".....b..........bb.......b..........bbbbbbb.............b............................b..........b...",
                    "....b...........b........b.........bb.....b.............bb..........................bb.........bb...",
                    "....b..........bb.......bb.........b......b..............b..........................b..........b....",
                    "....b..........b........b..........b......bb.............bb......................bbb...........b....",
                    "....b..........b........b..........b.......b..............b...................bbbb............bb....",
                    "...b...........b........b..........b.......b..............b.................bbb..............bb.....",
                    "...b...........b.......bb..........b.......bb..............b...............bb...............bb......",
                    "...b...........b.......b...........b........b..............b..............bb...............bb.......",
                    "..b............b.......b...........b........b..............b..............b.............bbbb........",
                    "..b............b......bb...........b........bb.............b..............b.......bbbbbbb...........",
                    "..b............b......b............b.........b.............bb.............b......bb.................",
                    "..b............b......b............b.........b..............b.............b......b..................",
                    "..b............b......b............b..........b.............b.............b......b..................",
                    "..b............b......b.............b.........b.............b.............bb.....b..................",
                    "..b............b......b.............b.........bb............b..............b.....bb.................",
                    "..b............b......b.............b..........b............b..............b......bb................",
                    "..bb...........b......b.............b..........bb...........b...............b......bb...............",
                    "...b...........b......b..............b..........b...........b...............b.......bb..............",
                    "...b...........bb.....b..............b..........b...........b...............bb.......bbb............",
                    "...bb...........b.....b..............b..........b...........b................b.........bb...........",
                    "....b...........b....bb..............b...........b..........b................bb.........bb..........",
                    "....b...........b....b...............b...........b..........b.................b..........bb.........",
                    "....b...........b....b...............b...........b..........b.................bb..........bb........",
                    ".....b..........bb...b...............b...........bb..........b.................bb..........bb.......",
                    ".....b...........b...b...............b............b..........b..................bb..........b.......",
                    "......b..........b...b...............b............b..........b...................bb.........bb......",
                    "......b..........bb..b...............b............bb.........b....................b..........b......",
                    "......bb..........bbbb...............b.............b.........b....................bb.........b......",
                    ".......b.............................b..............b........b.....................bb........bb.....",
                    ".......bb............................b...............b.......b......................b.........b.....",
                    "........b............................b...............bb......b......................b.........b.....",
                    "........b............................b................b......b......................b.........b.....",
                    ".........b...........................b................b......b......................b.........b.....",
                    ".........b..........................bb................bttttttbb.....................b........b......",
                    ".........bb.........................b.................bb......b.....................b........b......",
                    "..........b.......................bbb..................b......b.....................b........b......",
                    "..........b......................bb....................b......b....................bb........b......",
                    "...........b...................bbb.....................bb.....bb..................bb........bb......",
                    "...........bb..............bbbbb........................b......bbb........bbbbbbbbb.........b.......",
                    ".............bbbbbbbbbbbbbbb............................b........bbbbbbbbbb.................b.......",
                    "........................................................bb..................................b.......",
                    ".........................................................b.................................bb.......",
                    ".........................................................bb...............................bb........",
                    "..........................................................bb.............................bb.........",
                    "...........................................................bb...........................bb..........",
                    "............................................................bb........................bbb...........",
                    ".............................................................bb.....................bbb.............",
                    "..............................................................bb..............bbbbbbb...............",
                    "................................................................bbbbbbbbbbbbbbb.....................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                ],
                0,
                0,
                tileSize,
                tileSize
            )
            break
        case "C":
            map1 = new Tiles(
                [
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "............................................................................bbbbbbbbbbbbb...........",
                    "..............................bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb......bb.............bbb........",
                    "............................bb........................s.....F.......bb...bb................bb.......",
                    "..........................bb..........................s.....F.........bb.b..................bb......",
                    "........................bb............................s.....F..........b.b...................b......",
                    "......................bb..............................s.....F..........b.b...................b......",
                    "....................bb........................x.......s.....F..........bb....................b......",
                    "...................b..................................s.....F..........f.......bbb...........b......",
                    ".................bb.......................bbbbbbbbbbbbbbbbbbbbbbbbb....f.......b.bb..........b......",
                    "...............bb......................bbbb.......................bb...f......bb..b..........b......",
                    ".............bb.....................bbbb...........................b...f.....bb...b..........b......",
                    "...........bb......................bb..............................b...f....bb....b..........b......",
                    ".........bb......................bbb...............................bb..f...bb.....bvvvvvvvvvvb......",
                    ".......bb.......................bb..................................bb.f..bb......b.........bb......",
                    "......b.....................bbbb.....................................bbbbbb......bb.........b.......",
                    "......b...................bbb....................................................b..........b.......",
                    "......b................bbb......................................................bb.........bb.......",
                    "......b.........bbbbbbb........................................................bb..........b........",
                    "......b........bb..............................................................b..........bb........",
                    "......b........b..............................................................bb..........b.........",
                    ".....bbbbbbbbbbb..............................................................b..........bb.........",
                    ".....b.........b.............................................................bb..........b..........",
                    ".....b.........b............................................................bb...........b..........",
                    ".....b.........bb..........................................................bb............b..........",
                    ".....b..........bb........................................................bb............b...........",
                    ".....b...........bb.....................................................bbb.............b...........",
                    ".....b.............b..................................................bbb..............bb...........",
                    "......b.............bb..............................................bbb................b............",
                    ".......b..............bb.........................................bbb.................bb.............",
                    "........b.............Vbbb...................................bbbbb.................bbb..............",
                    "........b............V...bb................................bbb....................bb................",
                    ".........b..........V......bb.............................bb.....................bb.................",
                    "..........b........V.........b...........................bb....................bbb..................",
                    "...........b.....VV...........b.........................bb.....................b....................",
                    "............b...V..............bb......................bb....................bbb....................",
                    ".............b.V.................bb....................b....................bb......................",
                    ".............bV...................bbb.................bb..................bbb.......................",
                    "..............b.....................bbbb..............b..................bb.........................",
                    "...............b.......................bb.............b.................bb..........................",
                    "................b......................bb............bb...............bbb...........................",
                    ".................bb.....................bbbbbbbbbbbbbbY.............bbb.............................",
                    "...................bb....................yy...........YYY..........bb...............................",
                    ".....................bb..................y..............Y.........bb................................",
                    ".......................bb...............yy..............YYY......bb.................................",
                    ".........................bb............yy.................YY...bbb..................................",
                    "...........................bb.........yy...................YY.bb....................................",
                    ".............................bb.......y.....................Ybb.....................................",
                    "...............................bb...yyy.....................bb......................................",
                    ".................................bb.y...................yyyb........................................",
                    "...................................b.................yyyy.bb........................................",
                    ".................................bbYY..............yyy.....bbbb.....................................",
                    "................................b...YY............yy..........bbbbb.................................",
                    "...............................b.....YYY.....bbbbb.................bbbbb............................",
                    ".............................bb........YY...bb...bb....................bbb..........................",
                    "............................b...........Ybbbb.....bb......................bbb.......................",
                    "...........................b............bb.........bb.......................bbb.....................",
                    ".........................bb............bb............bbb......................bbbb..................",
                    "........................b.............bb................bbb......................bbb................",
                    "......................bb............bb....................bbb......................bbb..............",
                    ".....................b.............bb.......................bbb......................bb.............",
                    "....................b.............b............................bb......................b............",
                    "..................bb...........bbb..............................bbb....................bb...........",
                    ".................b...........bbb................bbbbbbbb..........bbb...................b...........",
                    "..............bbb...........bb...............bbb.......bbb...........bbb................b...........",
                    "..............b............bb...............bb...........bbb...........bbbb..............b..........",
                    "..............b...........b................bb..............bbbb...........bbb............b..........",
                    "..............b..........b................bbt................Vbbbb..........bb...........b..........",
                    ".............b..........bb...............bb..t...............V...bbbb........bbb.........b..........",
                    ".............b..........b...............bb...t...............V......bbbb.......bb........b..........",
                    ".............b..........b..............bb.....t..............V.........bbbbbbbbbb........b..........",
                    ".............b..........b.............bb......t..............V...........................b..........",
                    "............bb..........bb............b........t.............V...........................b..........",
                    "............b............bbb.........bb........t.............V...........................b..........",
                    "............b..............bb........b..........t.......bbbbbV...........................b..........",
                    "............b...............bbbbbb..bb..........t...bbbb....bbbbbb.......................b..........",
                    "............b...................vbbbb............tbbb............bbb.....................b..........",
                    "............b...................v................bb................bbbb................bb...........",
                    "............bb.................v................bb....................bbb..............b............",
                    ".............b.................v...............bb.......................bbbb..........bb............",
                    "..............b...............v................b...........................bbbbb....bbb.............",
                    "..............bb..............v...............bb................................bbbbb...............",
                    "................b.............v...............b.....................................................",
                    "................b............v...............bb.....................................................",
                    ".................bb..........v...............b......................................................",
                    "...................b........v...............bb......................................................",
                    "....................bb......v..............b........................................................",
                    ".....................bbb...v.............bbb........................................................",
                    ".......................bbbbv...........bbb..........................................................",
                    "..........................bbbbbbbbbbbbbb............................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                    "....................................................................................................",
                ],
                0,
                0,
                tileSize,
                tileSize
            );
            break
    }
    // Create Tiles from Tile map depending on the input
    enginestart.play()
    setTimeout(() => {
        engineidle.play()
        engineidle.loop()
    }, 5000);
    
    setInterval(() => {
        if (nitroTime < 10){
            nitroTime += 1/200
        }
    }, 50);

    setInterval(() => {
        if (ForcedRecharge > 0){
            ForcedRecharge--
        }
    }, 1000)
}

 function draw() {
    clear()
    background(track.color)
    AntiCheat(laptime, fastestLap, player.speed, PlayerSensitivity)
    camera.on()
    camera.zoom = 3
    camera.x = player.x
    camera.y = player.y
    camera.on()
    if (mapSelected == "mapC"){
        player.collider = 'd'
        trackLimit.collider = 's'
    }
    controls()
    window.LapTimeModule.UpdateData(frameRate())
    //console.log(laptime)
    //text(laptime, 0, 0)
    if (lapStarted) {
        player.color = "green"
    }
    trackLimit.draw()
    track.draw()
    camera.off()
    rect(0, 0, 250, 100, 0, 0, 20, 0)
    rect(width - 350, height - 100, width, height, 20, 0, 0, 0)
    textAlign(LEFT, TOP)
    textFont('Titillium Web')
    textStyle(BOLD)
    textSize(24)
    if (nitroActive && ForcedRecharge == 0){
        nitroTime -= 1/frameRate()
        if (nitroTime < 0){
            nitroActive = false
            ForcedRecharge = 10
        }
    }
    let currentGear
    if (inReverse){
        currentGear = "R"
    } else {
        currentGear = "1"
    }
    if (window.LapTimeModule.GetFL()) {
        text(`Lap: ${lap}\nTime: ${window.LapTimeModule.GetLaptime().toFixed(3)}\nFastest: ${window.LapTimeModule.GetFL().toFixed(3)} (${fastestOnLap})`, 10, 10)
    } else {
        text(`Lap: ${lap}\nTime: ${window.LapTimeModule.GetLaptime().toFixed(3)}`, 10, 10)
    }
    text(`Speed: ${(floor((player.speed).toFixed(3) * 60))}MPH`, width - 350, height - 85)
    text(`SOC: ${SofC()}`, width - 350, height - 50)
}
function controls(){
    if (contros[0]) {
        if (contro.pressing("rightTrigger") && !endGame) {
            if (slowed) {
                if (player.speed < 1) {
                    player.speed += (20 / 120)
                }
            } else {
                if (player.speed < 3) {
                    player.speed += (45 / 120)
                }
            }
            player.direction = player.rotation;
        }
        let direction = Math.atan2(contro.leftStick.y, contro.leftStick.x)
        player.rotation = (direction * 180) / Math.PI
        player.direction = player.rotation
        if (contro.pressing("leftTrigger")) {
            player.drag = 10;
            player.friction = 10;
            player.direction = player.rotation;
        } else {
            player.drag = 5;
            player.friction = 5;
        }
        
    } else {
        if (kb.presses("w") && !endGame) {
            player.speed = 0.5
            gear = 1
        }
        if (kb.pressing("w") && !endGame) {
            if (slowed) {
                if (player.speed < 1) {
                    player.speed += (20 / 120)
                }
            } else if (PlayerSensitivity != 1){
                if (nitroActive){
                    player.speed = 4
                } else if (player.speed < 3) {
                    player.speed += (45 / 120)
                }
            } else{
                if (player.speed < 1) {
                    player.speed += (1 / 120)
                }  
            }
            player.direction = player.rotation;

        }

        if (kb.pressing("s")) {
            if (player.speed > 0){
                player.drag = 10;
                player.friction = 10;
                player.direction = player.rotation;
            } else if (player.speed <= 0 ){
                player.speed = -1
                gear = "R"
                player.drag = 0
                player.friction = 0
            }
            
        } else {
            player.drag = 5
            player.friction = 5

        }

        if (kb.pressing("a")) {
            player.rotate(UndersteerCalc(player.speed, -PlayerSensitivity, "Left"), PlayerSensitivity);
            player.direction = player.rotation;
        }
        if (kb.pressing("d")) {
            player.rotate(UndersteerCalc(player.speed, PlayerSensitivity, "Right"), PlayerSensitivity);
            player.direction = player.rotation;
        }
        if (kb.pressing('shift') && nitroTime > 0){
            nitroActive = true
        } else {
            nitroActive = false
        }


        if (kb.pressing("escape")) {
            escHeld = true;
            setTimeout(() => {
                if (escHeld){
                    window.sessionStorage.setItem("fastest", ttLaps)
                }
            }, 3000)
            
        } else {
            escHeld = false
        }
        

    }
    if (player.collides(trackLimit) && player.speed > 2) {
        //hasStalled = true
    }

}

function StartLineOverlap() {
    if (!sessionStarted) {
        sector = 1
        sessionStarted = true
        window.LapTimeModule.ResetLaptime()
        lapStarted = true
        player.color = 'blue'
        lapInvalid = false
    }
    if (!lapStarted && !sessionComplete) {
        lapStarted = true
        ttLaps[lap] = window.LapTimeModule.GetLaptime()
        lap++
        FastestLapCalculation(window.LapTimeModule.GetLaptime(), lapInvalid)
        window.LapTimeModule.ResetLaptime()
        lapInvalid = false
    }
    if (!lapStarted && sessionComplete) {
        ttLaps[lap] = window.LapTimeModule.GetLaptime()
        lap++
        FastestLapCalculation(window.LapTimeModule.GetLaptime(), lapInvalid)
        window.LapTimeModule.ResetLaptime()
        endGame = true
    }
}

function TimingOverlap() {
    lapStarted = false
    sector = 2
}

/**
 * @param {Float} prevLap - The laptime given as a comparison to the fastest lap
 * @param {Boolean} InvalidLap - Is the player's current lap invalid?
 */

function FastestLapCalculation(prevLap, InvalidLap) {
    let fast = window.LapTimeModule.GetFL()
    if (!InvalidLap){
        if (fast) {
            if (prevLap < fast) {
                window.LapTimeModule.SetFL(prevLap)
                fastestOnLap = lap - 1
            }
        } else {
            window.LapTimeModule.SetFL(prevLap)
        }
    }
}


/**
 * @param {Float} speed - The current speed of the player
 * @param {Integer} sensitivity - The set sensitivity of the player controller
 * @param {String} direction - The direction the player wants to turn
 * @returns {Float} - The speed of which the player will turn
 */



function UndersteerCalc(speed, sensitivity, direction = 'controller') {
    let turnSpeed, finalsensitivity
    if (speed > 1) {
        if (direction == "Left") {
            turnSpeed = -1 * abs(abs(sensitivity) - (speed - 1) / (6-sensitivity))
            return turnSpeed
        } else if (direction == "Right") {
            turnSpeed = abs(abs(sensitivity) - (speed - 1) / (6-sensitivity))
            return turnSpeed
        } else {
            turnSpeed = (abs(sensitivity) - (speed - 1) / sensitivity)
            return turnSpeed
        }
    } else {
        if (direction == "Left") {
            finalsensitivity = sensitivity
            return finalsensitivity
        } else {
            finalsensitivity = sensitivity
            return finalsensitivity
        }
    }
}

// SOfC is responsible from deciding what is shown to the player on the UI
function SofC(){
    if (nitroTime < 2){
        return `Empty (${floor(nitroTime*10)}%)`
    } else if (nitroTime >= 10){
        nitroTime = 10
        return `Full (100%)`
    } else if (2<=nitroTime<10 && nitroActive){
        return `Discharging (${floor(nitroTime*10)}%)`
    } else {
        return `Recharging (${floor(nitroTime*10)}%)`
    }
}

// function AntiCheat(){
//     if (laptime != 0 || fastestLap != 0 || player.speed > 4){
//         alert("You have attempted to cheat!")
//         window.localStorage.setItem("Cheated", true)
//         let time = Date.now()
//         window.localStorage.setItem("Time", time)
//         window.location.assign("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
//     }
// }
var easystar = new EasyStar.js()
let tileSize = 10
let map1, map2, map3, trackLimit, timingLine, testing, start, player, track, car1, car2, car3, car4, cars, mapSelected, slowArea, startSlowArea, slowed, pathfinderDebug1, pathfinderDebug2
let resButton
let maps = [map1, map2, map3]
let debugInput = "map2"
let gear = 1
let lapStarted = false
let sessionStarted = false
let sessionComplete = false
let lap = 1
let laptime = 0
let fastestLap = null
let fastestOnLap = 1
let ttLaps = []
let fastestLapInfo = []
let hasStalled = false
let Paused = false
let PST = 0
let endGame = false
let timestartheld
let path, newpath
let nodenum = 0
let map2nodes = [
  { x: 15.558750649552039, y: 39.15275752673345 },
  { x: 20.950959425518043, y: 23.61063754871096 },
  { x: 27.863455516827752, y: 16.646632994997532 },
  { x: 46.73189702575641, y: 16.17862660696288 },
  { x: 63.04680679298682, y: 21.337588645951538 },
  { x: 69.51784911636575, y: 12.041885119970008 },
  { x: 72.58963198769126, y: 6.335374611447882 },
  { x: 77.28746748318176, y: 6.170698345461141 },
  { x: 77.30780543796995, y: 11.622555747680382 },
  { x: 77.7619872791976, y: 20.97152182708796 },
  { x: 83.84915443352426, y: 20.555411861315996 },
  { x: 86.12223146660257, y: 15.611298349976062 },
  { x: 89.61662218337332, y: 13.257697448928323 },
  { x: 93.31478635088378, y: 14.846229803095511 },
  { x: 86.75046695288923, y: 32.71837542189617 },
  { x: 85.6875143359764, y: 37.718243937979544 },
  { x: 81.72063867768912, y: 45.86152390975436 },
  { x: 73.60641377380304, y: 53.141567266397 },
  { x: 65.58554427921447, y: 54.02295778264031 },
  { x: 64.86298932604527, y: 58.53830354002501 },
  { x: 59.0039796423442, y: 57.03505805200295 },
  { x: 56.193905825824515, y: 53.887972300173885 },
  { x: 41.847055762738925, y: 53.55013177770453 },
  { x: 33.77412653477797, y: 58.01957257471476 },
  { x: 28.381196238594544, y: 64.68838613856606 },
  { x: 29.48643737824154, y: 71.98396719366046 },
  { x: 31.556072613897705, y: 80.74297545681966 },
  { x: 47.6711208936189, y: 80.44308505459992 },
  { x: 60.95708583372955, y: 78.33651684120056 },
  { x: 71.07618103642473, y: 76.09767623622625 },
  { x: 79.15291792435627, y: 78.4449035487007 },
  { x: 82.8, y: 85.65393018810329 },
  { x: 79.2255096626408, y: 92.66559926350428 },
  { x: 72.39940204099759, y: 95.17550618238587 },
  { x: 54.05082587004203, y: 94.87555171851963 },
  { x: 45.383325484282906, y: 89.76309981104049 },
  { x: 34.616474456394975, y: 90.35155786327667 },
  { x: 17.16266848281508, y: 91.09156748902821 },
  { x: 10.875066026417617, y: 87.29685945908518 },
  { x: 12.727851858241815, y: 76.35864245297684 },
  { x: 12.897086343750392, y: 59.687808019383866 },
  { x: 13.028191317361163, y: 46.77300934866636 }
]
let carImg1, carImg2, carImg3, carImg4, carImages

let images = [carImages]

function preload() {
  carImg1 = loadImage('images/cars/cars_racer (1).png')
  carImg2 = loadImage('images/cars/cars_racer (2).png')
  carImg3 = loadImage('images/cars/cars_racer (3).png')
  carImg4 = loadImage('images/cars/cars_racer (4).png')
  carImages = [carImg1, carImg2, carImg3, carImg4]
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  trackLimit = new Group()
  trackLimit.color = "red"
  trackLimit.tile = 'b'
  trackLimit.collider = 's' //Collisions with the track limit will be processed as static
  trackLimit.w = tileSize
  trackLimit.h = tileSize

  player = new Sprite()
  player.collider = 'd'
  player.tile = 'x'
  player.color = 'yellow'
  player.image = random(carImages)
  player.scale = 0.045
  player.direction = Math.PI / 2
  if (mapSelected == "map2") {
    player.direction = -90
  }
  player.w = 11
  player.h = 6

  track = new Group()
  track.tile = '.'
  track.w = tileSize;
  track.h = tileSize;
  track.collider = "n";
  track.color = "#5a5348";
  track.visible = true;

  start = new Group()
  start.collider = "n"
  start.tile = "s"
  start.visible = true
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

  Cars = new Group()
  Cars.tile = "c"
  Cars.w = 11
  Cars.h = 6
  Cars.counter = 0
  Cars.speed = 0
  Cars.collider = 'd'
  Cars.image = random(carImages)
  Cars.scale = 0.045


  // pathfinderDebug1 = new Group()
  // pathfinderDebug1.collider = "n"
  // pathfinderDebug1.tile = "E"
  // console.log(pathfinderDebug1.x, pathfinderDebug1.y)

  // pathfinderDebug2 = new Group()
  // pathfinderDebug2.collider = "n"
  // pathfinderDebug2.tile = "e"
  // console.log(pathfinderDebug2.x, pathfinderDebug2.y)



  map2 = new Tiles(
    [
      "....................................................................................................",
      "....................................................................................................",
      "....................................................................................................",
      "..........................................................................bbbbbbbbb.................",
      ".....................................................................bbbbbb.......bb................",
      "....................................................................bb.............b................",
      "....................bbbbbbbbb.....................................bbb..............b..bbbbbb........",
      "....................bBBBBBBBb....................................bb................b.bb....bbb......",
      "....................bBBBBBBBb....................................b........bbb......b.b.......bb.....",
      "....................bBBBBBBBb.............bbbbbbb................b.......bbbb......b.b........bb....",
      "....................bBBBBBBBBb....bbbbbbbbb.....bbb..............b......bbbb......bb.b.........b....",
      "....................bBBBBBBBBbbbbbb...............bbb............bb.....bbbb......b..b.........b....",
      "....................bBBBBBBB........................bb............b.....bb.......bb..b.........b....",
      "....................bBBBBB............................bb..........b.....bb.......b...b.........b....",
      "....................bBBB...............................bbb.......bb.....bb......bb..bb.........b....",
      "....................bBB..................................bb......b......bb......b...b..........b....",
      "....................b.....................................bbbb..bb......bb......b..bb....bb....b....",
      "...................bb........................................bbb........bb......b.bb.....bb....b....",
      "...................b...................................................bbb......bbb......b.....b....",
      "...................b...................bbbbbbbb........................b.bb.............bb....bb....",
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
      "...........b.........b............................................................bb......bb........", //(15, 38)
      "...........b........bb...........................................................bb.......b.........",
      "...........b........b...........................................................bb.......b..........",
      "..........b........bb...........................................................b........b..........",
      "..........b........b...........................................................bb.......bb..........",
      "..........bsss....bb..........................................................b.........b...........",
      "..........b..sssssb..........................................................bb........b............",
      ".........b........b.........................................................b.........bb............",
      ".........b.c.....bb.......................................................bbb........bb.............",//(14 , 46)
      ".........b.......b.......................................................bb.........bb..............",
      "........bb....c.b.....................................................bbb.........bb...............",
      "........b.......bb...................................................bbb.........bbb................",
      "........b..c....b.................................................bbbbt.........bb..................",
      "........b.......b...........................bbbbbbbbbbbbbb......bbb...t.........b...................",
      "........b....c..b...................bbbbbbbbb.............b....bb.....tt.......bb...................",
      "........b.......b.................bbb......................b...b.......t......bb....................",
      "........b..c....b...............bbb.........................b..b.......t....bbb.....................",
      "........b.......b.............bbb............................b.b.......t.bbbb.......................",
      "........b....c..b............bb............bbbbbbbbbbbbbb.....bb....bbbbbb..........................",
      "........b.......b...........bb.........bbbbb............bb..........b...............................",
      "........b..c....b...........b........bbb.................bb.........b...............................",
      "........b.......b..........bb.......b.....................b.........b...............................",
      "........b....x..bbb........b.......bb.....................bb........b...............................",
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
    0, 0, tileSize,
    tileSize
  );

  // easystar.setGrid(matrices)
  // easystar.setAcceptableTiles([0])
  // easystar.findPath(15, 28, 14, 46,function( path ){
  //     if (path=== null){
  //         alert("path was not found.")
  //     } else {
  //         newpath = path
  //         console.log(newpath)
  //         alert("Path found. first point is " + path[0].x + path[0].y)
  //         for (p of path){
  //           let n = new node.Sprite(p.x*tileSize, p.y*tileSize)
  //         }
  //     }
  // })
  // easystar.setIterationsPerCalculation(1000);
  // easystar.calculate()

  node = new Group()
  node.visited = false
  node.radius = 10
  node.collider = 'n'
  node.visible = false
  for (no of map2nodes) {
    new node.Sprite(no.x * tileSize, no.y * tileSize)
  }

  // var grid = new PF.Grid(matrices)
  // var finder = new PF.AStarFinder({
  //   allowDiagonal: true
  // })

  // path = finder.findPath(15, 38, 14, 46, grid)
  // //let newPath = PF.Util.smoothenPath(grid,path)
  // for (p of path){
  //   let n = new node.Sprite((p[0] * tileSize), (p[1]*tileSize))
  //   n.visible = true
  // }

  for (c of Cars) {
    c.image = random(carImages)
  }
}

function aiMove() {
  for (c of Cars) {
    c.rotateMinTo({ x: map2nodes[c.counter].x * tileSize, y: map2nodes[c.counter].y * tileSize }, 10, 0)
    c.moveTo(map2nodes[c.counter].x * tileSize, map2nodes[c.counter].y * tileSize, 3)
    if (c.x / tileSize == map2nodes[c.counter].x && c.y / tileSize == map2nodes[c.counter].y) { c.counter++ }
    if (c.counter > 39) { c.counter = 0 }
  }


}

function draw() {
  clear()
  SlowZone()
  background("#5a5348")
  camera.on()
  camera.zoom = 3
  camera.x = player.x
  camera.y = player.y
  camera.on()
  controls()
  aiMove()
  laptime += 1 / 60
  PST += 1 / 60
  //console.log(laptime)
  //text(laptime, 0,0)
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
  if (fastestLap) {
    text(`Lap: ${lap}\nTime: ${laptime.toFixed(3)}\nFastest: ${fastestLap.toFixed(3)} (${fastestOnLap})`, 10, 10)
  } else {
    text(`Lap: ${lap}\nTime: ${laptime.toFixed(3)}`, 10, 10)
  }
  text(`Speed: ${floor(player.speed * 30)}MPH`, width - 350, height - 30)
}

function controls() {
  //Check whether the user has a gamepad connected
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
    if (contro.presses('a') && gear < 6) {
      gear++
    }
    if (contro.presses('b') && gear > 1) {
      gear--
    }
  } else {
    if (kb.presses("w") && !endGame) {
      player.speed = 0.5
    }
    if (kb.pressing("w") && !endGame) {
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

    if (kb.pressing("s")) {
      player.drag = 10;
      player.friction = 10;
      player.direction = player.rotation;
    } else {
      player.drag = 5
      player.friction = 5

    }
    if (kb.presses("shift")) {
      hasStalled = false
    }
    if (kb.pressing("a")) {
      console.log(UndersteerCalc(player.speed, -3, "Left"))
      player.rotate(UndersteerCalc(player.speed, -3, "Left"), 3);
      player.direction = player.rotation;
    }
    if (kb.pressing("d")) {
      console.log(UndersteerCalc(player.speed, 3, "Right"))
      player.rotate(UndersteerCalc(player.speed, 3, "Right"), 3);
      player.direction = player.rotation;
    }
    if (kb.presses('arrowUp') && gear < 6) {
      gear++
      console.log("shift up")
    }
    if (kb.presses('arrowDown') && gear > 1) {
      gear--
      console.log("shift down")
    }
    if (kb.presses("escape")) {
      timestartheld = PST
    }
    if (kb.pressing("escape")) {
      if (PST - timestartheld > 3) {
        sessionComplete = true
      }
    }
    if (kb.presses("enter")) {
      console.log([nodes[nodenum].x, nodes[nodenum].y])
      player.moveTo(nodes[nodenum].x * tileSize, nodes[nodenum].y * tileSize, 4)
      if (player.x / tileSize == nodes[nodenum].x && player.y / tileSize == nodes[nodenum].y) { nodenum++ }
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
    laptime = 0
    lapStarted = true
    player.color = 'blue'
  }
  if (!lapStarted && !sessionComplete) {
    lapStarted = true
    ttLaps[lap] = laptime
    lap++
    FastestLapCalculation(laptime)
    laptime = 0
  }
  if (!lapStarted && sessionComplete) {
    ttLaps[lap] = laptime
    lap++
    FastestLapCalculation(laptime)
    laptime = 0
    endGame = true
  }
}

function TimingOverlap() {
  lapStarted = false
  sector = 2
}

/**
 * @param {Float} prevLap - The laptime given as a comparison to the fastest lap
 */

function FastestLapCalculation(prevLap) {

  if (fastestLap) {
    if (prevLap < fastestLap) {
      fastestLap = prevLap
      fastestOnLap = lap - 1
    }
  } else {
    fastestLap = prevLap
  }
}


/**
 * @param {Float} speed - The current speed of the player
 * @param {Integer} sensitivity - The set sensitivity of the player controller
 * @param {String} direction - The direction the player wants to turn
 * @returns {Float} - The speed of which the player will turn
 */



function UndersteerCalc(speed, sensitivity, direction) {
  let turnSpeed, finalsensitivity
  if (speed > 1) {
    if (direction == "Left") {
      turnSpeed = -1 * (abs(sensitivity) - (speed - 1) / 3)
      return turnSpeed
    } else {
      turnSpeed = (abs(sensitivity) - (speed - 1) / 3)
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

function SlowZone() {
  if (player.overlaps(slowArea) || player.overlaps(startSlowArea)) {
    slowed = true
  } else {
    slowed = false
  }
}
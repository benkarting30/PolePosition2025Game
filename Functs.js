/*
Create a laptime module containing the player's laptime and fastest lap and various functions that work with these variables
*/
window.LapTimeModule = {
    laptime: 0,
    fastestLap: null,
    GetLaptime: function () {
        //
        return LapTimeModule.laptime
    },
    ResetLaptime: function () {
        LapTimeModule.laptime = 0;
        //console.log("ResetLaptime running") 
    },
    UpdateData: function (frames) {
        LapTimeModule.laptime += 1 / frames
    },
    SetFL: function (time) {
        LapTimeModule.fastestLap = time
    },
    GetFL: function () {
        return LapTimeModule.fastestLap
    }

}
// Create an anti-cheat function
window.AntiCheat = function (LT, FL, speed, sensitivity) {
    // check whether the state of the fake laptime and fastest lap variables and whether speed and sensitivity are in a certain range
    if (LT != 24.231 || FL != 22.342 || speed > 4 || (6 < sensitivity || 0 > sensitivity)) {
        // inform the player that they have been caught cheating
        alert("You have attempted to cheat!")
        window.localStorage.setItem("Cheated", true) // Create a item in local storage which informs the code the player cheated upon attempting to resume
        let time = Date.now()
        window.localStorage.setItem("Time", time) // Create a timestamp of when the player was caught
        // Open 7 windows of the youareanidiot on youtube
        window.open("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
        window.open("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
        window.open("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
        window.open("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
        window.open("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
        window.open("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
        window.location.assign("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
    }
}

window.Robustness = function(settings, map, mode){
    if ((settings && map && mode == "TT")||(settings && mode == "Q")){
      return true
    } else {
      return false
    }
}

// Functs.js
window.LapTimeModule = {
    laptime: 0,
    fastestLap: null,
    GetLaptime: function(){
        //console.log("GetLaptime active");
        return LapTimeModule.laptime
    },
    ResetLaptime: function(){
        LapTimeModule.laptime = 0;
        //console.log("ResetLaptime running") 
    },
    UpdateData: function(frames){
        LapTimeModule.laptime += 1/frames
    },
    SetFL: function(time){
        LapTimeModule.fastestLap = time
    },
    GetFL: function(){
        return LapTimeModule.fastestLap
    }
  
}

window.AntiCheat = function(laptime, fastestLap, speed){
    if (laptime != 0 || fastestLap != 0 || speed > 4){
        alert("You have attempted to cheat!")
        window.localStorage.setItem("Cheated", true)
        let time = Date.now()
        window.localStorage.setItem("Time", time)
        window.open("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
        window.open("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
        window.open("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
        window.open("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
        window.open("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
        window.open("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
        window.location.assign("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
    }
}

/**
 * @param {Integer} laptime - The 'laptime' variable
 * @param {Integer} fastestLap - The 'fastest lap' variable
 * @param {Float} speed - The player's current speed
 */
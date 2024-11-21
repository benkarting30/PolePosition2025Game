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

export function AntiCheat(){
    if (laptime != 0 || fastestLap != 0 || player.speed > 4){
        alert("You have attempted to cheat!")
        window.localStorage.setItem("Cheated", true)
        let time = Date.now()
        window.localStorage.setItem("Time", time)
        window.location.assign("https://youtu.be/dPtXaAZHuho?si=nxRhBqF30im7HpSI")
    }
}
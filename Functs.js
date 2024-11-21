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

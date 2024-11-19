// Functs.js
window.LapTimeModule = {
    laptime: 0,
    fastestLap: null,
    GetLaptime: function(){
        console.log("GetLaptime active");
        return laptime
    },
    ResetLaptime: function(){
        laptime = 0;
        console.log("ResetLaptime running") 
    },
    UpdateData: function(frames){
        laptime += 1/frames
    },
    SetFL: function(time){
        fastestLap = time
    },
    GetFL: function(){
        return fastestLap
    }
  
}

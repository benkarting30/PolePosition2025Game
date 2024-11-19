// Functs.js

let laptime = 0;
let fastestLap = null;

// UpdateData function: This updates laptime based on the number of frames
function UpdateData(frames) {
    laptime += 1 / frames; // Accumulate laptime
    console.log("Update Data runs")
}

// Get the current laptime
function GetLaptime() {
    console.log("GetLaptime active")
    return laptime;

}

// Reset the laptime to 0
function ResetLaptime() {
    laptime = 0;
    console.log("ResetLaptime running")
}

// Set the fastest lap time
function SetFL(time) {
    fastestLap = time;
    console.log("SetFL running")
}

// Get the fastest lap time
function GetFL() {
    console.log("GetFL running")
    return fastestLap;
}

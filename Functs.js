// Functs.js

let laptime = 0;
let fastestLap = null;

// UpdateData function: This updates laptime based on the number of frames
export function UpdateData(frames) {
    laptime += 1 / frames; // Accumulate laptime
    console.log("Update Data runs")
}

// Get the current laptime
export function GetLaptime() {
    console.log("GetLaptime active")
    return laptime;

}

// Reset the laptime to 0
export function ResetLaptime() {
    laptime = 0;
    console.log("ResetLaptime running")
}

// Set the fastest lap time
export function SetFL(time) {
    fastestLap = time;
    console.log("SetFL running")
}

// Get the fastest lap time
export function GetFL() {
    console.log("GetFL running")
    return fastestLap;
}

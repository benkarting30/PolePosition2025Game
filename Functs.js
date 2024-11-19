// Functs.js

let laptime = 0;
let fastestLap = null;

// UpdateData function: This updates laptime based on the number of frames
export function UpdateData(frames) {
    laptime += 1 / frames; // Accumulate laptime
}

// Get the current laptime
export function GetLaptime() {
    return laptime;
}

// Reset the laptime to 0
export function ResetLaptime() {
    laptime = 0;
}

// Set the fastest lap time
export function SetFL(time) {
    fastestLap = time;
}

// Get the fastest lap time
export function GetFL() {
    return fastestLap;
}

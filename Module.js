let laptime = 0
let fastestLap = null
export function UpdateData(frames, ){
    laptime += 1/frames

}
export function GetLaptime(){
    return laptime
}
export function ResetLaptime(){
    laptime = 0
}

export function SetFL(time){
    fastestLap = time
}

export function GetFL(){
    return fastestLap
}
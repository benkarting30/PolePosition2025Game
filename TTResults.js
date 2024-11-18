let playerFLInfo, laps
function preload() {
    table = loadTable('TT.csv', 'csv', 'header');
}
function setup() {
    createCanvas(windowWidth, windowHeight)

    playerFLInfo = window.sessionStorage.getItem('fastest')
    let data = []
    for(lap of playerFLInfo){
        if (lap != ''){
            data.push(lap)
        }
    }
    let sorted = data.sort()
    let fastest = sorted[0]

    laps
    for (let i = 0; i < laps; i++) {
        let newRow = table.addRow();
        newRow.setString('Lap', table.getRowCount());
        newRow.setString('time', data[i]);
        newRow.setString('Delta', data[i]-fastest);

    }

    //print the results
    for (let r = 0; r < table.getRowCount(); r++)
        for (let c = 0; c < table.getColumnCount(); c++)
            print(table.getString(r, c));

    setTimeout(() => {
        window.sessionStorage.clear()
        window.location.assign('Main_Menu.html')
    }, 30000);

}
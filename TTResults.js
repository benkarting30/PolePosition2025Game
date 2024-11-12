let playerFLInfo, laps
function preload(){
    table = loadTable('TT.csv', 'csv', 'header');
}
function setup(){
    createCanvas(windowWidth, windowHeight)

    playerFLInfo = window.sessionStorage.getItem('fastest')
    laps
    for (let i = 1; i < laps; i++){
        if (finalOrder[i] == "player"){
            let newRow = table.addRow();
            newRow.setString('id', table.getRowCount());
            newRow.setString('Driver', username);
            newRow.setString('Fastest', playerFLInfo.fastest);
            newRow.setString('On', playerFLInfo.lap)
        } else {
            let newRow = table.addRow();
            let name = random(names)
            const index = array.indexOf(name);
            if (index > -1) {
                array.splice(index, 1); 
            }
            newRow.setString('id', table.getRowCount());
            newRow.setString('Driver', name);
            newRow.setString('Fastest', playerFLInfo.fastest - random(-1.500, 1.500).toFixed(3));
            newRow.setString('On', floor(random(0, 10)))
        }
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
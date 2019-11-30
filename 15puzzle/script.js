var moves = 0;
var table; 
var rows; 
var cols;
var showTurns;
var board;

function start(){
    var button = document.getElementById("newGame");
    button.addEventListener( "click", newGame, false );
    showTurns = document.getElementById("moves");
    table = document.getElementById("table");
    rows = 4;
    cols = 4;
    newGame();
}

function newGame(){
    var arrayOfNumbers = new Array();
    var arrayOfUsedNums;
    var randNum = 0;
    var count = 0;
    moves = 0;

    rows = document.getElementById("rows").value;
    cols = document.getElementById("columns").value;
    showTurns.innerHTML = moves;
    board = new Array(rows);

    for (var i = 0; i < rows; i++){
        board[i] = new Array(cols);
    }
    
    arrayOfUsedNums = new Array( rows * cols );
    for (var i = 0; i < rows * cols; i++){
        arrayOfUsedNums[i] = 0;
    }

    for (var i = 0; i < rows * cols; i++){
        randNum = Math.floor(Math.random()*rows * cols);
        if (arrayOfUsedNums[randNum] == 0){
            arrayOfUsedNums[randNum] = 1;
            arrayOfNumbers.push(randNum);
        }
        else{
            i--;
        }
    }

    count = 0;
    for (var i = 0; i < rows; i++){
        for (var j = 0; j < cols; j++){
        board[i][j] = arrayOfNumbers[count];
        
        count++;
        }
    }
    printTable();
}

function printTable(){
    var outputString = "";
    for (var i = 0; i < rows; i++){
        outputString += "<tr>";
        for (var j = 0; j < cols; j++){
            if (board[i][j] == 0){
                outputString += "<td class=\"blank\"> </td>";
            }else{
                outputString += "<td class=\"tile\" onclick=\"moveThisTile(" + i + ", " + j + ")\">" + board[i][j] + "</td>";
            }
        }
        outputString += "</tr>";
    }
    table.innerHTML = outputString;
}

function moveThisTile( tableRow, tableCol){
    if (checkIfMoveable(tableRow, tableCol, "up") ||
        checkIfMoveable(tableRow, tableCol, "down") ||
        checkIfMoveable(tableRow, tableCol, "left") ||
        checkIfMoveable(tableRow, tableCol, "right") 
    ){
        incrementMoves();
    }else{
        alert("ERROR: Can't move this tile!\nTile must be next to a blank space.");
    }
        
    if (winCheck()){
        alert("Congratulations! You solved the puzzle in " + moves + " moves.");
        newGame();
    }
}

function checkIfMoveable(rowCoordinate, colCoordinate, direction){
    rowOffset = 0;
    columnOffset = 0;

    if (direction == "up"){
        rowOffset = -1;
    }else if (direction == "down"){
        rowOffset = 1;
    }else if (direction == "left"){
        columnOffset = -1;
    }else if (direction == "right"){
        columnOffset = 1;
    }  

    if (rowCoordinate + rowOffset >= 0 && colCoordinate + columnOffset >= 0 &&
        rowCoordinate + rowOffset < rows && colCoordinate + columnOffset < cols
    ){
        if ( board[rowCoordinate + rowOffset][colCoordinate + columnOffset] == 0){
            board[rowCoordinate + rowOffset][colCoordinate + columnOffset] = board[rowCoordinate][colCoordinate];
            board[rowCoordinate][colCoordinate] = 0;
            printTable();
            return true;
        }
    }
    return false; 
}

function winCheck(){
    var count = 1;
    for (var i = 0; i < rows; i++){
        for (var j = 0; j < cols; j++){
            if (board[i][j] != count){
                if ( !(count === rows * cols && board[i][j] === 0 )){
                    return false;
                }
            }
            count++;
        }
    }

    return true;
}

function incrementMoves(){
    moves++;
    if (showTurns){
        showTurns.innerHTML = moves;
    }
}
 
window.addEventListener( "load", start, false );
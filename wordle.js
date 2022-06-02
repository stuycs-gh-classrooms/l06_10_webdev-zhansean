var WON = 0;
var RUNNING = 1;
var LOST = 2;
var gameState = 1;

var upAlpha = "QWERTYUIOPASDFGHJKLZXCVBNM";
var lowAlpha = "qwertyuiopasdfghjklzxcvbnm";
var WHITE = 10;
var GRAY = 11;
var YELLOW = 12;
var GREEN = 13;
var Grid grid;
var Keyboard keyboard;
var allWords;
var reasonableWords;
var target;
var submission = "";

function setup() {
  background(0x434242);
  createCanvas(500, 700);

  var grid = new Grid(width/2-145, 100, 50, 6, 5);
  var keyboard = new Keyboard();
  allWords = loadTable("words.csv");
  reasonableWords = loadTable("words_reasonable.csv");
  target = (reasonableWords.getString(0, int(random(reasonableWords.getColumnCount()))));
  target = target.toUpperCase();
  print(target);
}

function draw() {
  grid.display();
  keyboard.display();
}

function checkValid(checkme) {
  for (var i=0; i<allWords.getColumnCount(); i++) {
    if (checkme.equals(allWords.getString(0, i).toUpperCase())) {
      return true;
    }
  }
  return false;
}

function checkGameState(){
  if(submission.equals(target)){
    gameState = WON;
    return true;
  }
  else if(grid.curRow == 5){
    gameState = LOST;
    return false;
  }
  return false;
}

function keyPressed() {
  if (gameState == RUNNING) {
    if (key != CODED && key != ' ' && key != BACKSPACE && submission.length()<5 && keyCode != ENTER) {
      grid.newLetter(capitalizer(key));
      submission += capitalizer(key);
    } else if (key == BACKSPACE && submission != "" && keyCode != ENTER) {
      grid.removeLetter();
      submission = submission.substring(0, submission.length()-1);
    } else {
      if (keyCode == ENTER && checkValid(submission)) {
        checkGameState();
        keyboard.colorUpdate();
        grid.colorUpdate();        
        submission = "";
      }
    }
  }
}

function capitalizer(letter) {
  for (var i=0; i<26; i++) {
    if (letter == lowAlpha.charAt(i)) {
      letter = upAlpha.charAt(i);
    }
  }
  return letter;
}

class Ktile{
  var state;
  var xPos, yPos;
  var car;
  var size;
  var index;
  
  function Ktile(_xPos, _yPos, keys, _index){
    xPos = _xPos;
    yPos = _yPos;
    state = WHITE;
    index = _index;
    car = keys.charAt(index);
    size = 35;
  }
  
 function display(){
   if(state == WHITE){
      fill(255);
    }
   else if(state == GREEN){
     fill(0x66B261);
   }
   else if(state == YELLOW){
     fill(0xC9C42D);
   }
   else{  //state is GRAY
     fill(0x747474);
   }
   square(xPos, yPos, size);
   textSize(size);
   textAlign(LEFT, TOP);
   fill(0);
   text(car, xPos + 7, yPos - 7); 
 }
}

class Keyboard {
  var Ktile[] kb1;
  var Ktile[] kb2;
  var Ktile[] kb3;
  var x = 75;
  var tempx=x;
  var y = 500;
  var key1 = "QWERTYUIOP";
  var key2 = "ASDFGHJKL";
  var key3 = "ZXCVBNM";
  var state;
  var keyDict;

  function Keyboard() {
    var kb1 = new Ktile[10];
    var kb2 = new Ktile[9];
    var kb3 = new Ktile[7];
    var keyDict = new IntDict();

    for (var num=0; num < 10; num++) {
      var kb1[num] = new Ktile(tempx, y, key1, num);
      tempx+=35;
      keyDict.set(key1.substring(num, num+1), num);
    }

    tempx = x+35/2;
    y+=35;
    for (var num=0; num < 9; num++) {
      var kb2[num] = new Ktile(tempx, y, key2, num);
      tempx+=35;
      keyDict.set(key2.substring(num, num+1), num + 20);
    }

    tempx = x+35;
    y+=35;
    for (var num=0; num < 7; num++) {
      var kb3[num] = new Ktile(tempx, y, key3, num);
      tempx+=35;
      keyDict.set(key3.substring(num, num+1), num + 40);
    }
  }

  function display() {
    for (var num=0; num < 10; num++) {
      kb1[num].display();
    }

    for (var num=0; num < 9; num++) {
      kb2[num].display();
      y+=35;
    }

    for (var num=0; num < 7; num++) {
      kb3[num].display();
      y+=35;
    }
  }

  function colorUpdate() {    
    var Array<Character> uncheckedLetters = new Array<Character>();
    for (var i=0; i<5; i++) {
      uncheckedLetters.add(submission.charAt(i));
    }    
    
    for (var i=0; i<5; i++) {
      if(submission.charAt(i) == target.charAt(i)){
        kTileUpdate(GREEN, target.charAt(i));
        uncheckedLetters.remove(uncheckedLetters.indexOf(target.charAt(i)));
      }
    }
    
    for (var i=0; i<uncheckedLetters.size(); i++) {
      for(var j=0; j<5;j++){
        if(uncheckedLetters.get(i) == target.charAt(j) && getKTileState(target.charAt(j)) != GREEN){
          kTileUpdate(YELLOW, target.charAt(j));
          break;
        }
      }
    }
    
    for (var i=0; i<uncheckedLetters.size(); i++) {
      if(getKTileState(uncheckedLetters.get(i)) != GREEN && getKTileState(uncheckedLetters.get(i)) != YELLOW){
       kTileUpdate(GRAY, uncheckedLetters.get(i));
      }
    }
  }

  function getKTileState(letter) {
    var s= "" + letter;
    var index = keyDict.get(s);
    if (index>=40) {
      return kb3[index-40].state;
    } else if (index>=20) {
      return kb2[index-20].state;
    } else {
      return kb1[index].state;
    }
  }

  function kTileUpdate(newState, letter) {
    var s= "" + letter;
    var index = keyDict.get(s);
    if (index>=40) {
      kb3[index-40].state = newState;
    } else if (index>=20) {
      kb2[index-20].state = newState;
    } else {
      kb1[index].state = newState;
    }
  }
}

class Tile{
  var state;
  var xPos, yPos;
  var c;
  var car;
  var size;
  
  function Tile(_xPos, _yPos){
    xPos = _xPos;
    yPos = _yPos;
    state = WHITE;
    car = ' ';
    size = 50;
  }
  
 function display(){
   if(state == WHITE){
     fill(255);
   }
   else if(state == GREEN){
     fill(0x66B261);
   }
   else if(state == YELLOW){
     fill(0xC9C42D);
   }
   else{  //state is GRAY
     fill(0x747474);
   }
   square(xPos, yPos, size);
   textSize(size);
   textAlign(LEFT, TOP);
   fill(0);
   text(car, xPos + 10, yPos - 10); 
 }
}

class Grid {
  var x, y;
  var rows, cols;
  var Tile[][] tGrid;
  var size;
  var curRow, curCol;

  function Grid(_x, _y, _sz, _rows, _cols) {
    curRow=0;
    curCol=0;
    x = _x;
    y= _y;
    rows = _rows;
    cols = _cols;
    size = _sz;
    var tGrid = new Tile[rows][cols];

    for (var r=0; r<rows; r++) {
      for (var c=0; c<cols; c++) {
        var tGrid[r][c] = new Tile(x+60*c, y+60*r);
      }
    }
  }//constructor

  function display() {
    for (var r=0; r<rows; r++) {
      for (var c=0; c<cols; c++) {
        tGrid[r][c].display();
      }
    }
  }

  function newLetter(letter) {
    tGrid[curRow][curCol].car = letter;
    curCol++;
  }

  function removeLetter() {
    tGrid[curRow][curCol-1].car = ' ';
    curCol--;
  }

  function colorUpdate() {
    var Array<Character> possibleLetters = new Array<Character>();
    for (var i=0; i<5; i++) {
      possibleLetters.add(target.charAt(i));
    }

    for (var i=0; i<5; i++) {
      if (tGrid[curRow][i].car == target.charAt(i)) {
        tGrid[curRow][i].state = GREEN;
        possibleLetters.remove(possibleLetters.indexOf(tGrid[curRow][i].car));
      }
    }
   
    for (var i=0; i<5; i++) {
      if (tGrid[curRow][i].state != GREEN) {
        for (var j=0; j<possibleLetters.size(); j++) {
          if (tGrid[curRow][i].car == possibleLetters.get(j)) {
            tGrid[curRow][i].state = YELLOW;
            possibleLetters.remove(j);
            break;
          }
        }
      }
    }

    for (var i=0; i<5; i++) {
      if (tGrid[curRow][i].state == WHITE) {
        tGrid[curRow][i].state = GRAY;
      }
    }

    curRow++;
    curCol = 0;
  }
}

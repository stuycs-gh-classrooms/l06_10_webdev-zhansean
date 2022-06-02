var arr = [];
var ARRSIZE = 400;

function setup() {
  createCanvas(400, 400);
  background(0);
  var arr = randomArray(ARRSIZE);
}//setup

function draw() {
  background(0);
  displayArray(arr);
}

function bubleSort(ray) {
  for (var endPos = arr.length-1; endPos >= 0; endPos--) {
    for (var pos=0; pos < endPos; pos++) {
      if (arr[pos] > arr[endPos]) {
        swap(arr, pos, endPos);
      }
    }
  }
}//bubleSort

function selectionSort(ray) {
  for (var pos = 0; pos <= arr.length-1; pos++){
    var smallPos = pos;
    for (var testPos = pos ;testPos < arr.length; testPos++){
      if(arr[testPos] <= arr[smallPos]){
        smallPos = testPos;
      }
    }
    swap(arr,pos,smallPos);
  }
}//selectionSort

function insertionSort(ray) {
  for (var sortEnd = 0; sortEnd < arr.length-1; sortEnd++){
    var pos = sortEnd + 1;
    var insertVal = arr[pos];
    while(pos!=0 && insertVal < arr[pos-1]){
      arr[pos] = arr[pos-1];
      pos--;
    }
    arr[pos] = insertVal;
  }
}//insertionSort


function swap(arr, i0, i1) {
  var t = arr[i0];
  arr[i0] = arr[i1];
  arr[i1] = t;
}//swap

function randomArray(num) {
  var values = new var[num];

  for (var i=0; i<values.length; i++) {
    values[i] = int(random(100, 400));
  }//random value loop
  return values;
}//randomArray

function displayArray(arr) {
  var barWidth = width / arr.length;
  var x = 0;
  var y = 0;
  fill(255);
  noStroke();
  for (var i=0; i<arr.length; i++) {
    y = height - arr[i];
    rect(x, y, barWidth, arr[i]);
    x+= barWidth;
  }
}//displayArray

function keyPressed() {
  if (key == 'n') {
    arr = randomArray(ARRSIZE);
  }
  else if (key == 'b') {
    bubleSort(arr);
  }
  else if (key == 's') {
    selectionSort(arr);
  }
  else if (key == 'i') {
    insertionSort(arr);
  }
}

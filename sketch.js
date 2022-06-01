var sx;
var sy;
var mx;
var my;
var hx;
var hy;
var secAng;
var minAng;
var hourAng;
var secCount;
int minCount;
int hourCount;

function setup() {
  createCanvas(500,500);
  background(0,200,0);
  draw();
  clockFace();
}

function draw() {
  clockFace();
  timeToAngle();
  drawHand();
}

function timeToAngle(){
  updateTime();
  secAng = (6*secCount)-90;
  minAng = (6*minCount)-90;
  hourAng = (30*hourCount)-90;
}

function drawHand(){
  stroke(255,0,0);
  line(width/2,height/2,sx,sy); //Second
  stroke(0);
  line(width/2,height/2,mx,my);//Minutes
  strokeWeight(2);
  line(width/2,height/2,hx,hy);//Hour
  strokeWeight(1);
  sx = newX(180, width/2, secAng);
  sy = newY(180, height/2, secAng);
  mx = newX(150, width/2, minAng);
  my = newY(150, height/2, minAng);
  hx = newX(100, width/2, hourAng);
  hy = newY(100, height/2, hourAng);
}

function clockFace(){
  int r = 400;
  float hsx;
  float hsy;
  int num = 0;
  float nangle = 0;
  background(0,200,0);
  fill(#C9ED54);
  circle(width/2,height/2,r);
  fill(0);
  textSize(20);
  while (num <12){
    hsx = newX(165, width/2 - 5, nangle - 60);
    hsy = newY(165, height/2 + 5, nangle - 60);
    nangle+=30;
    text(num+=1,hsx,hsy);
  } // Num Print
  for (int i = 0; i < 60; i++){
    line(width/2 + (r/2) * cos(radians(6 * i)),height/2 + (r/2) * sin(radians(6 * i)),(width/2 + ((r/2)-10) * cos(radians(6 * i))),height/2 + ((r/2)-10) * sin(radians(6 * i)));
  } //Ticks
  text(hour()+":"+minute()+":"+second(),width/2,height/2); //Digital Clock
}

function updateTime(){
  secCount = second();
  minCount = minute();
  hourCount = hour();
}

var newX(int amplitude, int offset, float t){
  float x = cos(radians(t));
  x = x*amplitude + offset;
  return x;
}

var newY(int amplitude, int offset, float t){
  float y = sin(radians(t));
  y = y*amplitude + offset;
  return y;
}

const SW = 1728, SH = 1117;
 
const DOTS = [
  { id:  1, from:[  106, 559], to:[ 367, 456] },
  { id:  2, from:[  272, 559], to:[ 367, 661] },
  { id:  3, from:[  369, 559], to:[ 486, 661] },
  { id:  4, from:[  483, 559], to:[ 673, 661] },
  { id:  5, from:[  557, 559], to:[ 781, 557] },
  { id:  6, from:[  631, 559], to:[ 673, 456] },
  { id:  7, from:[  705, 559], to:[ 574, 557] },
  { id:  8, from:[  849, 559], to:[ 904, 456] },
  { id:  9, from:[  993, 559], to:[ 979, 661] },
  { id: 10, from:[ 1137, 559], to:[1054, 456] },
  { id: 11, from:[ 1289, 559], to:[1334, 456] },
  { id: 12, from:[ 1364, 559], to:[1180, 456] },
  { id: 13, from:[ 1402, 559], to:[1180, 557] },
  { id: 14, from:[ 1454, 559], to:[1275, 557] },
  { id: 15, from:[ 1506, 559], to:[1180, 661] },
  { id: 16, from:[ 1545, 559], to:[1334, 661] },
];
 
const LINE_SEGS = [
  [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],
  [7,8],[8,9],[9,10],[10,11],
  [11,12],[12,13],[13,14],[14,15],[15,16],
];
 
const LOVE_SEGS = [
  [1,2],[2,3],[3,4],
  [6,7],[7,4],[4,5],[5,6],
  [7,8],
  [8,9],[9,10],[10,11],
  [12,15],[12,11],[13,14],[15,16],
];
 
function easeInOut(t){return t<0.5?2*t*t:-1+(4-2*t)*t;}
function easeOut(t){return 1-Math.pow(1-t,3);}
 
let dots=[];
 
function setup(){
  createCanvas(windowWidth,windowHeight);
  for(let d of DOTS){
    dots.push({id:d.id,fromX:d.from[0]/SW,fromY:d.from[1]/SH,toX:d.to[0]/SW,toY:d.to[1]/SH});
  }
}
 
function windowResized(){resizeCanvas(windowWidth,windowHeight);}
 
function dotPos(d,ep){
  return{x:lerp(d.fromX*width,d.toX*width,ep),y:lerp(d.fromY*height,d.toY*height,ep)};
}
 
function drawSegs(segs,pm,col,sw){
  stroke(col);strokeWeight(sw);noFill();
  for(let[a,b]of segs){let pa=pm[a],pb=pm[b];if(pa&&pb)line(pa.x,pa.y,pb.x,pb.y);}
}
 

function drawFlower(cx,cy,ef,dotR){
  let pr=dotR*1.1*ef, dist=pr*0.9;
  noStroke(); fill(255,214,234);
  for(let i=0;i<4;i++){
    let a=-HALF_PI+HALF_PI*i;
    circle(cx+cos(a)*dist, cy+sin(a)*dist, pr*2);
  }
}
 
function draw(){
  let mx=constrain(mouseX/width,0,1);
  let ep=easeInOut(constrain(map(mx,0.00,0.55,0,1),0,1));
  let ec=easeInOut(constrain(map(mx,0.55,0.72,0,1),0,1));
  let ef=easeOut(constrain(map(mx,0.72,1.00,0,1),0,1));
 
  background(lerp(255,183,ec),lerp(214,56,ec),lerp(234,118,ec));
 
  let sc=[lerp(183,255,ec),lerp(56,214,ec),lerp(118,234,ec)];
  let sw=max(5,width*0.006),dotR=max(9,width*0.009);
 
  let pm={};
  for(let d of dots)pm[d.id]=dotPos(d,ep);
 
  if((1-ep)*255>1){let c=color(...sc);c.setAlpha((1-ep)*255);drawSegs(LINE_SEGS,pm,c,sw);}
  if(ep*255>1){let c=color(...sc);c.setAlpha(ep*255);drawSegs(LOVE_SEGS,pm,c,sw);}
 
  noStroke();
  for(let d of dots){
    let p=pm[d.id];
    if(ef>0.01)drawFlower(p.x,p.y,ef,dotR);
    fill(...sc);
    circle(p.x,p.y,dotR*2);
  }
}
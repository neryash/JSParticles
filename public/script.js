var canvas = document.querySelector(".canvas");
var WIDTH = (canvas.width = window.innerWidth);
var HEIGHT = (canvas.height = window.innerHeight);
var ctx = canvas.getContext("2d");

var allParticleSystems = [];
var explosionSystem = new ParticleSystem(WIDTH/2,HEIGHT/2,5000,250,0,360,5,3,3,false,-5,-1,false,true);
allParticleSystems.push(explosionSystem)

var dinamicFPS = 80;
var fps = 0,lastTime = 0,showFps = 0;

function frame(){
  requestAnimationFrame(frame);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  updateAllParticles();
  if(showFps >= dinamicFPS){
    document.querySelector(".fps").innerHTML = Math.floor(fps);
    showFps = 0;
  }else{
    showFps++;
  }
  var nowPerf = performance.now()
  var ms = nowPerf-lastTime
  fps = 1000/ms;
  dinamicFPS = fps;
  lastTime = nowPerf;
}
frame();
canvas.onmousemove = function(e){
  allParticleSystems[0].y = e.y;
  allParticleSystems[0].x = e.x;
}

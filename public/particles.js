function randomBetween(min,max){
  return Math.random() * (max - min) + min;
}
function ParticleSystem(x,y,numberOfParticles,lifetime,beginAngle,finAngle,size,sizeRandomness,speed,gravity,frequency,stopAfter,fade,enabled){
  this.x = x,
  this.y = y,
  this.numberOfParticles = numberOfParticles,
  this.lifetime = lifetime,
  this.beginAngle = beginAngle,
  this.finAngle = finAngle,
  this.size = Math.abs(size),
  this.sizeRandomness = Math.abs(sizeRandomness),
  this.speed = speed,
  this.spawnParticle = 0,
  this.framesRan = 0,
  this.particles = [],
  this.frequency = frequency,
  this.stopAfter = stopAfter,
  this.opacity = 100,
  this.finished = false,
  this.enabled = true,
  this.gravity = gravity,
  this.fade = fade,
  this.addParticle = function(){
    if(this.enabled){
      if(!this.finished){
        for(var j = 0; j < (this.frequency > 0 ? 1 : Math.abs(this.frequency)); j++){
          if(this.spawnParticle == this.frequency || this.frequency < 0){
            var newParticle = new Particle(randomBetween(this.size-this.sizeRandomness,this.size+this.sizeRandomness),
            "hsla(20,100%,"+Math.floor(randomBetween(30,71))+"%,grogu)",
            this.x,
            this.y,
            Math.floor(randomBetween(this.beginAngle,this.finAngle)),
            this.speed,
            this.particles.length < this.numberOfParticles ? this.particles.length : this.particles.indexOf("empty"),
            0,
            true,
            this.gravity,
            this.lifetime,
            this)
            if(this.particles.length < this.numberOfParticles){
              this.particles.push(newParticle)
            }else{
              this.particles[this.particles.indexOf("empty")] = newParticle;
            }
            this.spawnParticle = 0;
          }
        }
        this.spawnParticle++;
      }
    }
  },
  this.drawParticles = function(){
    this.framesRan++;
    if(this.stopAfter == this.framesRan){
      this.finished = true;
    }
    for(var i = 0; i < this.numberOfParticles; i++){
      if(this.particles[i] != "empty" && this.particles[i]){
        this.particles[i].updatePos();
      }
    }
    // this.particles.splice(this.)
  }
}
function updateAllParticles(){
  for(var i = 0; i < allParticleSystems.length; i++){
    if(allParticleSystems[i] != "empty"){
      allParticleSystems[i].addParticle();
      allParticleSystems[i].drawParticles();
      for(var j = 0; j < allParticleSystems[i].particles.length; j++){
        if(allParticleSystems[i].particles[0] != "empty"){
          if(allParticleSystems[i].particles[0].opacity < 0.001){
            allParticleSystems[i] = "empty";
          }
          break;
        }
      }
    }
  }
}
function createExplosion(x,y){
  var explosionSystem = new ParticleSystem(x,y,10,30,0,360,8,3,5,false,-11,10,true);
  allParticleSystems.push(explosionSystem)
}
function Particle(size,colora,x,y,angle,speed,index,cycle,visible,gravity,fade,system){
  this.size = size,
  this.colora = colora,
  this.x = x,
  this.y = y,
  this.angle = angle,
  this.speed = speed,
  this.index = index,
  this.visible = visible,
  this.gravity = gravity,
  this.cycle = cycle,
  this.fade = fade,
  this.system = system,
  this.lifetime = this.fade,
  this.opacity = 100,
  this.updatePos = function(){
    if(this.fade > 0){
      this.opacity = 1-this.cycle/this.fade;
    }
    this.x-= this.speed*Math.sin(this.angle * Math.PI / 180);
    this.y-= this.speed*Math.cos(this.angle * Math.PI / 180);
    if(this.gravity){
      // this.angle+=0.4;
      var angle = getAngle(this.x,this.y,this.x-this.speed*Math.sin(this.angle * Math.PI / 180),this.y-this.speed*Math.cos(this.angle * Math.PI / 180))
      angle-=90;
      // console.log(angle);
      this.angle+=angle/100;
      // console.log((this.x-this.speed*Math.sin(this.angle * Math.PI / 180))/10);
    }
    if(this.visible){
      // ctx.shadowBlur = 10;
      ctx.fillStyle = this.colora.replace("grogu",this.opacity);
      ctx.shadowColor = this.colora.replace("grogu",this.opacity);
    }else{
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.shadowColor = "rgba(0,0,0,0)";
    }
    // console.log(this.colora.replace("grogu",this.opacity));
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    this.cycle++;
    if(this.cycle == this.lifetime){
      // particles.splice(this.index,1);
      (this.system).particles[this.index] = "empty";
    }
  }
}
function getAngle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}
function change(e,toChange) {
  console.log(e);
  allParticleSystems[0][toChange] = parseInt(e);
}

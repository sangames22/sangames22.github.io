var play=1

var end=0
var gamestate= play
var trex, trex_running, trexcollided;
var ground, invisibleGround, groundImage;
var gameover,restart,gameOver,Restart;
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var intro, intros;
var score;
var jumpSound, dieSound, checkPointSound

function preload(){
  trex_running = loadAnimation("trex1(1).png","trex3(1).png","trex4(1).png");
  trexcollided = loadAnimation("trex_collided.png");
  gameover= loadImage("gameOver.png")
  restart= loadImage("restart.png")
  groundImage = loadImage("ground2(1).png"); 
  intros = loadImage("intro.png");
  cloudImage = loadImage("cloud(1).png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  trex = createSprite(50,height-180,20,50);
  trex.addAnimation("running.png", trex_running);
  trex.addAnimation("collided.png" , trexcollided)
  trex.scale = 0.5;
  intro = createSprite(300,height-90,400,20);
  intro.addImage("intro.png", intros);
  Restart = createSprite(300,height-140,10,10);
  gameOver = createSprite(width/2,height/2,400,20);
  Restart.addImage("restart.png", restart);
 gameOver.addImage("gameOver.png", gameover);
  ground = createSprite(width/2,height-145 ,width,20);
  ground.addImage("ground.png",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  gameOver.visible = false;
  Restart.visible = false;
  invisibleGround = createSprite(width/2,height-80,width,125);
  invisibleGround.visible = false;
  obstaclesGroup=createGroup()
  cloudsGroup=createGroup()
  console.log("Hola" + 5);
  
  score = 0;

}

function draw() {
 
  background("white");


  trex.collide(invisibleGround);
  if(mousePressedOver(Restart)) {
    reset()
  }

  if(gamestate===play){
    ground.velocityX = -(4 + 3*score/1000);
    score = score + Math.round(frameCount/60);
    ground.velocityX = -4;
    trex.velocityY = trex.velocityY + 0.8
  if (score > 0 && score% 1000 === 0 ){
checkPointSound.play();

  }
  if (ground.x < 0){
    ground.x = ground.width/2;

  }
  
  

  //aparecer nubes
  spawnClouds();
  
  //aparecer obstáculos en el suelo
  spawnObstacles();
 
  text("Puntuación: "+ score, 500,50);
  if(keyDown("space")&& trex.y >= heigth-160) {
    trex.velocityY = -15;
    jumpSound.play()
  }
  if(keyDown("Up")&& trex.y >= heigth-150) {
    trex.velocityY = -12;
    jumpSound.play()
  } if(keyDown("W")&& trex.y >= heigth-150) {
    trex.velocityY = -12;
    jumpSound.play()
  }
  intro.visible = false;
  }
  if(obstaclesGroup.bounceOff(trex)) {
    gamestate=end
    score=0
    dieSound.play()
  }
  else if(gamestate===end){
    ground.velocityX = 0;
    trex.changeAnimation("trex_collided.png" ,trexcollided)
   obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0) 
  intro.visible = false;

  gameOver.visible = true;
  Restart.visible = true;
}

  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,height-165,10,40);
   
   obstacle.velocityX = -(4 + score/1000);


   
    //generar obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //asignar escala y lifetime al obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle)
 }
}




function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
 
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,height-100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale =(random(0.5,0.8));
    cloud.velocityX = -3;
                                        
     //asignar lifetime a la variable
    cloud.lifetime = 200;
    
    //ajustar la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)
  }        
  
}  
function reset() {
  //escribir aquí el código para aparecer las nubes
 
 gamestate=play
 gameOver.visible = false;
  Restart.visible = false;

  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  score =0
} 
 
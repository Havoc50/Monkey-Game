
var monkey, monkey_running;
var banana, bananaImage;
var obstacle, obstacleImage;
var bananasGroup, obstaclesGroup;
var ground;
var score;
var survivalTime;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
 
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
  
  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
}


function draw() {
  background("lightblue");
  
  if (ground.x < 0){
      ground.x = ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 314) {
        monkey.velocityY = -17;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  
  
  
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime, 115, 50);
  
  if(score >= 1){
  ground.velocityX = -(4 + 3* score/100);
  }
  
  spawnObstacles();
  spawnBananas();
  drawSprites();
}

function spawnBananas() {
   if (frameCount % 80 === 0) {
     banana = createSprite(430,100,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.075;
    banana.velocityX = -5;
    
    banana.lifetime = 100;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananasGroup.add(banana);
    }
}


function spawnObstacles() {
   if (frameCount % 300 === 0) {
    obstacle = createSprite(430,320,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.18;  
    obstacle.velocityX = -5;
    
    obstacle.lifetime = 120;
    
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    obstacle.depth = ground.depth;
    ground.depth = ground.depth + 1;
    
    obstaclesGroup.add(obstacle);
    }
}
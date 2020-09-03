var bananaImage,banana,background1,background1Image,monkey,monkeyImage,obstacle,obstacleImage,bananaGroup,obstacleGroup,ground;

function preload(){
  
  bananaImage = loadImage("banana.png");
  
  background1Image = loadImage("jungle.jpg");
  
  obstacleImage = loadImage("stone.png");
  
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png" );
}

function setup() {
  createCanvas(400, 400);
  
  background1 = createSprite(0,0,400,400);
  background1.addImage(background1Image);
  background1.depth = -5;
  background1.x = background1.width/2
  background1.velocityX = -5;
  
  monkey = createSprite (40,250,20,20);
  monkey.addAnimation("running",monkeyImage);
  monkey.scale = 0.1;
  
  ground = createSprite(200,280,400,20);
  ground.visible = false;
  
  bananaGroup = new Group();
  
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
  background(220);
  
  if(background1.x < 0) {
    background1.x = background1.width/2;
  }
  
  switch(score) {
      case 10: monkey.scale = 0.12;
              break;
      case 20: monkey.scale = 0.14;
              break;
      case 30: monkey.scale = 0.16;
              break;
      case 40: monkey.scale = 0.18;
              break;
      default: break;
    }
  
  if(bananaGroup.isTouching(monkey)) {
    score = score+2;
    bananaGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)) {
   monkey.scale = 0.1;
  }
  
  if(keyDown("space") && monkey.y >= 230){
      monkey.velocityY = -12 ;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  spawnBanana();
  
  spawnObstacle();
  
  drawSprites();
  
  stroke("red");
  text("Score:"+score,20,40);
}

function spawnBanana() {
if (frameCount % 60 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(120,160));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
  
}

function spawnObstacle() {
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(400,250,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
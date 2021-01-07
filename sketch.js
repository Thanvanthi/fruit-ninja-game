var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword,fruits
var fruitGroup
var enemyGroup
var score

function preload(){
  
  swordImage = loadImage("sword.png");
  fruit1Image = loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png")
  fruit3Image = loadImage("fruit3.png")
  fruit4Image = loadImage("fruit4.png")
  monsterImage= loadAnimation("alien1.png","alien2.png");
  gameoverImage= loadImage("gameover.png")
 
}

function setup() {
  createCanvas(400, 400);
  
  sword = createSprite(40,200,10,10)
  sword.addImage(swordImage);
  sword.scale = 0.5;
  
  fruitGroup= new Group();
  enemyGroup= new Group();
  
  score = 0
  
}

function draw(){
  background("lightblue")
  text("Score: "+ score, 330,20);
  
  console.log("this is ",gameState)

  
   if(gameState === PLAY){
     
    sword.y = World.mouseY;
    sword.x = World.mouseX;
     
     if(fruitGroup.isTouching(sword)){
       fruitGroup.destroyEach();
       score=score+2
     }
     
     fruits()
     Enemy()
     
     if(enemyGroup.isTouching(sword)){
       gameState = END;
     }
   }
    else if (gameState === END) {
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     fruitGroup.setLifetimeEach(-1);
     enemyGroup.destroyEach();
      
      sword.addImage(gameoverImage);
      sword.scale = 1
      sword.x = 200;
      sword.y = 200;
     
    }
  
  
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1Image);
    } else if (r == 2){
      fruit.addImage(fruit2Image);
    } else if (r == 3){
      fruit.addImage(fruit3Image);
    } else {
      fruit.addImage(fruit4Image);
    }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-5;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
   }
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-6;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);    
  }
}
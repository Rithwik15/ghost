var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
 // invisibleBlock.visible = false;
// spookySound.loop();
}

function draw() {
  background("black");
  if(gameState==="play"){
    if(tower.y > 400){
      tower.y = 300
    }
 if(keyDown("LEFT_ARROW")){
 ghost.x = ghost.x-3
 }

 if(keyDown("RIGHT_ARROW")){
  ghost.x = ghost.x+3
  }
  if(keyDown("SPACE")){
  ghost.velocityY = -5;
  }
  ghost.velocityY +=0.8

 if(climbersGroup.isTouching(ghost)) {
 ghost.velocityY = 0; 
 }
 if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
 ghost.destroy();
 gameState = "end";
 }
 spawndoor();
 drawSprites();
}
if(gameState==="end"){
 textSize (50);
 fill("yellow");
 stroke("red") 
  text("Game Over",220,250) 
 
}
}
function spawndoor (){
if (frameCount%240===0){
 door = createSprite(200,-50) 
 door.velocityY = 1;
 door.x = Math.round(random(120,400))
 door.addImage(doorImg);
 door.lifetime = 800;
 doorsGroup.add(door);

 climber = createSprite(200,10);
 climber.velocityY = 1;
 climber.x = door.x;
 climber.addImage(climberImg);
 climber.lifetime = 800;
 climbersGroup.add(climber);
 ghost.depth = door.depth;
 ghost.depth +=1;

 invisibleBlock = createSprite(200,15);
 invisibleBlock.velocityY = 1;
 invisibleBlock.x = door.x;
 invisibleBlock.width = climber.width;
 invisibleBlock.height = 2;
 invisibleBlock.debug = true;
 invisibleBlockGroup.add(invisibleBlock); 
}
}
var gameState = 0;
var bgImg;
var veer, veerImg, veerImg2;
var gorgon, gorgonImg, gorgonGroup;
var minotaur, minotaurImg, minotaurGroup;
var cyclops, cyclopsImg, cyclopsGroup;
var soldier, soldierImg, soldierGroup;
var hps = 4;
var hpv = 10;
var hpc = 30;
var ground,border;

function preload(){
bgImg = loadImage("images/bg.jpg");
veerImg = loadImage("images/veer.png");
veerImg2 = loadImage("images/kratosAttacking.jpg");
soldierImg = loadImage("images/draugr.png");
cyclopsImg = loadImage("images/cyclops.png");
gorgonImg = loadImage("images/gorgon.png");
minotaurImg = loadImage("images/minotaur.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  veer = createSprite(200,600,20,20);
  veer.addImage("normal",veerImg);
  veer.addImage("attacking",veerImg2);
  veer.scale = 0.2;
  
  ground=createSprite(windowWidth/2,680,windowWidth+100,10);
  border=createSprite(0,windowHeight/2,10,windowHeight);
  border.visible = false;
  minotaurGroup = new Group();
  cyclopsGroup = new Group();
  soldierGroup = new Group(); 
  gorgonGroup = new Group();
}

function draw() {
  background(bgImg);  
  ground.visible = false;
  if(gameState === 0){
    spawnSoldiers();
    spawnCyclops();
    spawnMinotaurs();
    spawnGorgons();
    jump();
    if(keyIsDown(LEFT_ARROW)){
      veer.changeImage("attacking");
    }
  
    if(keyWentUp(LEFT_ARROW)){
      veer.changeImage("normal");
    }
    veer.x = mouseX;
    if(gorgonGroup.collide(border)){
    gameState = 1;
    }
  }
  
  if(gameState === 0 && hpv<0){
    gameState = 1;
  }
  
  if(gameState === 1){
    fill("white");
    textSize(35);
    text("GAME OVER",windowWidth/2,windowHeight/2);
  }
  
    veer.collide(ground);
  if(veer.isTouching(soldierGroup)){
    soldierGroup.setVelocityXEach(0);
    damage();
  }else{soldierGroup.setVelocityXEach(-3);}

  if(veer.isTouching(cyclopsGroup)){
    cyclopsGroup.setVelocityXEach(0);
    damage();
  }else{cyclopsGroup.setVelocityXEach(-3);}

  if(veer.collide(soldierGroup) && keyDown(LEFT_ARROW)){
    hps = hps - 0.2
  }

  if(veer.isTouching(cyclopsGroup) && keyDown(LEFT_ARROW)){
    hpc = hpc - 0.2
  }

  if(veer.isTouching(minotaurGroup)){
    hpv = 0;
  }
  
  

  if(hps < 0){
    soldierGroup.setLifetimeEach(0);
    hps=4;
    hpv = 10;
  }

  if(hpc < 0){
    cyclopsGroup.setLifetimeEach(0);
    hpc=30;
    hpv = 15;
  }
  drawSprites();
}

function spawnSoldiers(){
  if(frameCount%200 === 0){
    soldier = createSprite(windowWidth+200,600,20,20);
    soldier.addImage("s",soldierImg);
    soldier.scale = 0.3;
    soldier.velocityX = -3;
    soldierGroup.add(soldier);
  }
}

function damage(){
  var x = Math.round(random(1,50))
  if(x === 3){
    hpv--;
  }
}

function spawnCyclops(){
  if(frameCount%1500 === 0){
    cyclops = createSprite(windowWidth+200,600,50,70);
    cyclops.addImage("c",cyclopsImg);
    cyclops.scale = 1.7;
    cyclops.velocityX = -1;
    cyclopsGroup.add(cyclops);
    cyclopsGroup.setLifetimeEach(windowWidth+200);
  }
}

function spawnMinotaurs(){
  var x = Math.round(random(1,2))
  if(x === 1){
  if(frameCount % 400 === 0){
    minotaur = createSprite(windowWidth+200,600,50,50);
    minotaur.addImage("m",minotaurImg);
    minotaur.velocityX = -20;
    minotaurGroup.add(minotaur);
  }
  }else if(x === 2){
    if(frameCount % 400 === 0){
      minotaur = createSprite(-200,600,50,50);
      minotaur.addImage("m",minotaurImg);
      minotaur.velocityX = 20;
      minotaurGroup.add(minotaur);
    }
  }
  minotaurGroup.setLifetimeEach(windowWidth+200/20);
}

function spawnGorgons(){
  if(frameCount % 600 === 0){
    gorgon = createSprite(1000,600,20,50);
    gorgon.addImage("g",gorgonImg);
    gorgon.scale = 0.5;
    gorgonGroup.add(gorgon);
    gorgon.velocityX = -2;
  }
}

function jump(){
  veer.velocityY = 10;
  if(keyDown("space")){
    veer.velocityY = -30;
  }
  
  if(veer.y<250){
    veer.y = 250;
  }
}
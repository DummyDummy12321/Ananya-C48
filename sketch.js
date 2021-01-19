var bgimg;
var b1img, b2img, b3img;
var effectimg;
var auraimg;
var diamondimg;
var ninjastand, ninjafire;
var bg;
var bgroup;
var ninja;
var gameState = "play";
var score = 0;
var lives = 3;
var edges;
var needed = 80;

function preload()
{
  bgimg = loadImage("images/bg2.png");
  b1img = loadImage("images/bomb1.png");
  b2img = loadImage("images/bomb2.png");
  //b3img = loadImage("images/bomb3.png");
  diamondimg = loadImage("images/diamond.png");
  effectimg = loadImage("images/effect1.png");
  ninjastand = loadImage("images/ninja_aim.png");
  ninjafire = loadImage("images/ninja_kill.png");
  auraimg = loadImage("images/aura.png");


}

function setup()
{
  createCanvas(1500,730);
  bg = createSprite(50,400,width,height);
  bg.addImage("bg",bgimg);
  bg.scale = 1.5;

  ninja = createSprite(450,100,50,50);
  ninja.addImage("ninja_Stand",ninjastand);
  ninja.addImage("ninja_fire", ninjafire);
  ninja.scale = 0.04;

  bgroup = new Group();
  shotgroup = new Group();
  edges = createEdgeSprites();
  
  
  

}
function draw()
{
  background(0);

  if(gameState === "play")
  {
    ninja.addImage("ninja_Stand",ninjastand);
    
    bombs();

    if(keyDown("up"))
    {
      ninja.y -= 4;
    }
    if(keyDown("down"))
    {
      ninja.y += 4;
    }
    if(keyDown("left"))
    {
      ninja.x -= 4;
    }
    if(keyDown("right"))
    {
      ninja.x += 4;
    }
  
    if(keyDown("space"))
    {
      ninja.addImage("ninja_fire", ninjafire);
      swoosh();
    }

    if(shotgroup.isTouching(bgroup))
    {
      bgroup.destroyEach();
      shotgroup.destroyEach();
      score++;
      needed--;
    }

    if(bgroup.isTouching(edges[0]))
    {
      lives--;
    }

    if(lives === 0)
    {
      gameState = "end";
    }

    if(score === 80)
    {
      gameState = "won";
    }

    
  }
  
  drawSprites();

 
  textSize(15);

  if(gameState === "end")
  {
    bgroup.destroyEach();
    shotgroup.destroyEach();
    text("NINJA RESURRECTING" , 400,300);
  }

  if(gameState === "won")
  {
    bgroup.destroyEach();
    shotgroup.destroyEach();
    text("YOU DID IT NINJA....... YOU SAVED THE TOWN", 400,300);
  }
  fill("white");
  text("Saved : " + score, 1300,40);
  text("Goal : 80", 500,40);
  text("Needed : "+ needed, 800,40);
  text("Lives : " + lives, 200,40);
}

function bombs()
{
  if(frameCount % 170 === 0)
  {
    bomb = createSprite(1600,300,10,10);
    bomb.y = Math.round(random(200,600));
    bomb.velocityX = -5;
    var r = Math.round(random(1,2));
    switch(r)
    {
      case 1: bomb.addImage(b1img);
      bomb.scale = 0.03;
      break;
      case 2: bomb.addImage(b2img);
      bomb.scale = 0.08;
      break;
      case 3: bomb.addImage(b3img);
      break;
      default: break;
    }
    bomb.lifetime = 500;


    bgroup.add(bomb);

  }
}

function swoosh()
{
  var shot = createSprite(1500, 100, 10,10);
  shot.x = ninja.x;
  shot.addImage(auraimg);
  shot.velocityX = 3;
  shot.y = ninja.y;
  shot.scale = 0.03;
  shotgroup.add(shot);
}
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;

var gameState = "onSling";
var bg = "bg1.jpg";


var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 505, 300, 170);

    box1 = new Box(700,550,80,80);
    box2 = new Box(920,550,80,80);
    vol1 = new Vol(810, 555);
    log1 = new Log(810,500,300, PI/2);

    box3 = new Box(700,450,80,80);
    box4 = new Box(920,450,80,80);
    vol2 = new Vol(810, 460);

    log3 =  new Log(810,400,300, PI/2);

    box5 = new Box(810,355,80,80);
    log4 = new Log(760,300,150, PI/7);
    log5 = new Log(870,300,150, -PI/7);

    harry = new Wiz(200,250);
    ron = new Wiz2(930,150,75,100);
    her = new Wiz3(1050,150,75,100);
    

    slingshot = new Slingshot(harry.body,{x:200, y:250});
    
  
}

function draw(){

   
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("SCORE  -  " + score, width-300, 50);
        textSize(20);
        text("Launch Harry to kill Voldemort!! Click space to reattach! Voldemort, AVADA KEDAVRA!!!",10,40);
         
        if(score >= 400) {
            textSize(20);
            fill("white");
            text("YOU WON! The Wizarding World will forever be in your debt.",10,70);
        }
    
    Engine.update(engine);


    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    vol1.display();
    vol1.score();
    log1.display();

    box3.display();
    box4.display();
    vol2.display();
    vol2.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    harry.display();
    ron.display();
    her.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState !=="launched"){
        Matter.Body.setPosition(harry.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && gameState === "launched"){
        harry.trajectory = [];

        Matter.Body.setPosition(harry.body, {x: 200 , y: 250});      
        Matter.Body.setAngle(harry.body, 0);
       
       gameState = "onSling";
       

       slingshot.attach(harry.body);
    }


  
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);

    
    if(hour>=06 && hour<=18){
        bg = "bg1.jpg";
    }
    else{
        bg = "bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    
}
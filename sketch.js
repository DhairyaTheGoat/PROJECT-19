var dinosaurImg,dinosaur
var volcanoImg
var invisibleBlock
var invisibleBlockGroup
var volcano
var volcanoGroup
var gameState = "play"


function preload(){
dinosaurImg = loadImage("dino.png")
volcanoImg = loadImage("volcanoes.png")
groundImg = loadImage("background.jpg")
}

function setup() {
 createCanvas(600,600)
 ground = createSprite(300,300)
 ground.addImage("ground",groundImg)
 ground.velocityY = 1

 dinosaur = createSprite(200,200,50,50)
 dinosaur.addImage("dinosaur",dinosaurImg) 
 dinosaur.scale = 0.5
          
 invisibleBlockGroup = new Group()
 volcanoGroup = new Group()

}

function draw() {
background(200)

if(gameState === "play"){

if(ground.x > 400 ){
    ground.x = 300
}

if(keyDown("space")){
    dinosaur.velocityY =-5
}

if(keyDown("left_arrow")){
    dinosaur.x = dinosaur.x - 2
}

if(keyDown("right_arrow")){
    dinosaur.x = dinosaur.x + 2
}

dinosaur.velocityY = dinosaur + 0.8

if( volcanoGroup.isTouching(dinosaur)){
    dinosaur.velocityY = 0
}

if(dinosaur.isTouching(invisibleBlockGroup)||dinosaur.y> 600){
dinosaur.destroy()
gameState = "end"
}
spawnVolcano()
drawSprites()
}

if(gameState === "end"){
 stroke("red")
 fill("red")
 textSize(40)
 text("EASY L YOU LOST",100,300)

}
}

function spawnVolcano(){
 if(frameCount %340 === 0){
    volcano = createSprite(200,-50)
    volcano.addImage("volcano",volcanoImg)
    volcano.x = Math.round(random,(130,350))
    volcano.velocityY = 1;
    volcanoGroup.add(volcano)
    volcano.lifeTime = 600

    dinosaur.depth = volcano.depth
    dinosaur.depth += 1;

    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = ground.width
    invisibleBlock.height = 2;
    invisibleBlock.x = volcano.x
    invisibleBlock.velocityY = 1
    invisibleBlock.lifeTime = 600
    invisibleBlockGroup.add(invisibleBlock)

}
}
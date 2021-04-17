var database ;
var foodS=20,foodStock;
var dog,dog1,dog2
var position
var feed,add,last 
var foodobject
var Feedtime
var Lastfeed
var Feedtime,delay=15,state="idle";
var name = "Dog1"
var pasttime=0;

function preload(){
  dog=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
  milkImage=loadImage("images/milk.png")
            
}

function setup(){
  createCanvas(700,650);

  database = firebase.database();
  //console.log(database);
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogImg1)
  dog.scale=0.2

  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  Lastfeed=database.ref('fedTime');
  Lastfeed.on("value",readTime)

  
feed=createButton("Feed"+name)
feed.position(700,115);
feed.mousePressed(FeedDog)
add=createButton("ADD FOOD")
add.position(600,115)
add.mousePressed(AddFood)
}

function readTime(data){
  Feedtime=data.val()
}
function readStock(data){
  foodS=data.val();
  foodobject.updateFoodStock(foodS)
}
function writeStock(x){
if(x<=0){
  x=0;
}
else{
  x=x-1;
}
database.ref("/").update({
  food:x
})
}



function draw(){
  background(46,139,87);

  foodobject.display();
  
  drawSprites();
  fill(255,255,254);
  textSize(15);

  text("Last Feed:" +pasttime,600,115);
  console.log(pasttime)
  drawSprites();
  setToHour()
}
  function setToHour(){
    if(Feedtime>=12){
      pasttime=Feedtime%12+"PM"
      }
    else{
      pasttime=Feedtime%12+"AM"
    }
  }
  
  function showError(){
    console.log("Error in writing to the database");
  }
  
  var pt;
  function FeedDog(){
    dog.addImage(dogImg) 
    if(foodobject.getFoodStock()<=0){
    foodobject.updateFoodStock(foodobject.getFoodStock()*0)
  }
    else{
      foodobject.updateFoodStock(foodobject.getFoodStock()-1)
    }
     database.ref('/').update({
       food:foodobject.getFoodStock(),
       fedTime:hour()
  
     })
    
    }
    function AddFood(){
      foodS++
      database.ref('/').update({
        food:foodS})
      }
   
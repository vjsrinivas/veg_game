var stage;
var stats_raw = `{"player":{"attack":{"carrot":{"carrot_launch":{"max_dmg":50,"min_dmg":0,"chance":0.6,"canDouble":true},"carrot_beam":{"max_dmg":90,"min_dmg":30,"chance":0.5,"canDouble":false},"carrot_smash":{"max_dmg":75,"min_dmg":[15,30,45],"chance":0.4,"canDouble":false}},"celery":{"celery_crush":{"max_dmg":100,"min_dmg":70,"chance":0.6,"canDouble":false}},"egg":{"egg_pan":{"max_dmg":90,"min_dmg":60,"chance":0.3,"canDouble":true}}},"defense":{"carrot":{"carrot_vitc":{"max_heal":20,"min_heal":10,"deflection":0.5,"reduction":0.5,"chance":1,"canMultiple":true}},"egg":{"egg_hard":{"max_heal":0,"min_heal":0,"deflection":1,"reduction":1,"chance":0.9,"canMultiple":true},"egg_selfharden":{"max_heal":0,"min_heal":0,"deflection":1,"reduction":1,"chance":0.4,"canMultiple":true},"egg_angel":{"max_heal":100,"min_heal":99,"deflection":0,"reduction":0,"chance":0.2,"canMultiple":false,"spreadAll":true}},"celery":{"celery_fortify":{"max_heal":0,"min_heal":0,"deflection":1,"reduction":0,"chance":0,"canMultiple":true}}}},"enemy":{"attack":{}}}`
var stats = JSON.parse(stats_raw);
var current_moves = []
var carrot = init_characters(100, stats["player"]["attack"]["carrot"]);
var cupcake = init_characters(100,stats["enemy"]["attack"]);
var snappoints = []

function init() {
  stage = new createjs.Stage("demoCanvas");
  init_background(stage);
  init_action_stage(stage);
  init_enemy_stage(stage);
  init_action_drop(stage);
  /*for(i=0; i<3; i++){
      init_action_move(stage, stats["player"]["attack"][i], 365+(95*i+1), 420, "action_icon_"+(i+1));
  }*/
  init_sprite(stage, "carrot_character", 150, 200);
  init_sprite(stage, "cupcake", 700,200);
  hp_display(stage, 100);
}

function init_background(stage){
  var elements = document.getElementsByTagName('input'); // All divs
  for(var i = 0; i<elements.length; i++){
    elements[i].onclick = clickHandler;
  }
  var img = new Image();
  img.src = "./img/background.png";
  var bitmap = new createjs.Bitmap(img);
  img.onload = function() {
      var image = event.target;
      var bitmap = new createjs.Bitmap(image);
      bitmap.x = 0;
      bitmap.y = 0;
      stage.addChild(bitmap);
      stage.update();
  };
}

function action_stage_visibility(event){
  alert("hi!");
}

function init_action_stage(stage){
  var img = new Image();
  img.src = "./img/action_stage_bg.png";
  var bitmap = new createjs.Bitmap(img);
  img.onload = function() {
      var image = event.target;
      var bitmap = new createjs.Bitmap(image);
      bitmap.x = 30;
      bitmap.y = 30;
      stage.addChild(bitmap);
      stage.update();
  };

  for(var i=0; i<1; i++){
    var p = new createjs.Container();
    p.x = 30;
    p.y = 30;
    snappoints.push(p);
  }
}

function init_enemy_stage(stage){
  var img = new Image();
  img.src = "./img/action_stage_bg.png";
  img.onload = function() {
      var image = event.target;
      var bitmap = new createjs.Bitmap(image);
      bitmap.x = 670;
      bitmap.y = 30;
      bitmap.alpha = 0.5;
      stage.addChild(bitmap);
      stage.update();
  };
}

function init_action_drop(stage){
  var img = new Image();
  img.src = "./img/action_stage_bg.png";
  img.onload = function() {
      var image = event.target;
      var bitmap = new createjs.Bitmap(image);
      bitmap.x = 350;
      bitmap.y = 420;
      stage.addChild(bitmap);
      stage.update();
  };
}

function init_action_move(stage, move, x, y, img_src){
  var img = new Image();
  img.src = "./img/"+img_src+".png";
  var dragger = new createjs.Container();
  img.onload = function() {
      var image = event.target;
      var bitmap = new createjs.Bitmap(image);
      //bitmap.x = 365;
      //bitmap.y = 420;
      //stage.addChild(bitmap);
      //stage.update();
      dragger.x = x
      dragger.y = y;
      dragger.addChild(bitmap);
      stage.addChild(dragger);
      stage.update();
  };
}

  /////

function init_characters(para_hp, moves){
  var character = {hp: para_hp, moves: moves};
  return character;
}

function init_sprite(stage, filename,x,y){
  var img = new Image();
  img.src = "./img/"+ filename +".png";
  img.onload = function() {
      var image = event.target;
      var bitmap = new createjs.Bitmap(image);
      bitmap.x = x;
      bitmap.y = y;
      stage.addChild(bitmap);
      stage.update();
  };
}


/////////////


var clickHandler = function(){
  var attack_chance = Math.floor((Math.random() * 2) + 1);
  if(attack_chance == 2)
   {
	cupcake.hp -= 20;
	alert("Hit! Cupcake is at " + cupcake.hp);
   }
  else
   {
	alert("Miss!");}

   whowon();

   var hit_from_enemy = Math.floor((Math.random() * 2) + 1);

   if(hit_from_enemy == 2){
	carrot.hp -= 20;
	alert("You got hit! You only have " + carrot.hp);
}
   else{
	alert("Your enemy missed!");
}
	whowon();
};

function whowon(){

if(carrot.hp <= 0)
	{
		alert("You lost!");
		document.getElementById("execute").disabled = true;
	}
	if(cupcake.hp <= 0)
	{
		alert("You win!");
		document.getElementById("execute").disabled = true;
	}
}
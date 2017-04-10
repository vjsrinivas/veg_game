var stage;
var stats_raw = `{"player":{"attack":{"carrot_launch":{"max_dmg":50,"min_dmg":0,"chance":0.6,"canDouble":true},"carrot_beam":{"max_dmg":90,"min_dmg":30,"chance":0.5,"canDouble":false},"carrot_smash":{"max_dmg":75,"min_dmg":[15,30,45],"chance":0.4,"canDouble":false},"celery_crush":{"max_dmg":100,"min_dmg":70,"chance":0.6,"canDouble":false},"egg_pan":{"max_dmg":90,"min_dmg":60,"chance":0.3,"canDouble":true}},"defense":{"carrot_vitc":{"max_heal":20,"min_heal":10,"deflection":0.5,"reduction":0.5,"chance":1,"canMultiple":true},"egg_hard":{"max_heal":0,"min_heal":0,"deflection":1,"reduction":1,"chance":0.9,"canMultiple":true},"egg_selfharden":{"max_heal":0,"min_heal":0,"deflection":1,"reduction":1,"chance":0.4,"canMultiple":true},"egg_angel":{"max_heal":100,"min_heal":99,"deflection":0,"reduction":0,"chance":0.2,"canMultiple":false,"spreadAll":true},"celery_fortify":{"max_heal":0,"min_heal":0,"deflection":1,"reduction":0,"chance":0,"canMultiple":true}}},"enemy":{"attack":{}}}`;
var stats = JSON.parse(stats_raw);
var current_moves = []

function init() {
  stage = new createjs.Stage("demoCanvas");
  init_action_stage(stage);
  init_enemy_stage(stage);
  init_action_drop(stage);
  for(i=0; i<3; i++){
      current_moves.append(init_action_move(stage, stats["player"]["attack"][i], 365+(95*i+1), 420));
  }
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

function init_action_move(stage, move, x, y){
  var img = new Image();
  img.src = "./img/action_icon.png";
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

  dragger.on("pressmove", function(evt){
    evt.currentTarget.x = evt.stageX;
    evt.currentTarget.y = evt.stageY;
    stage.update();
  })

}
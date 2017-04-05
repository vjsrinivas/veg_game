var stage;
var stats_raw = `{"player":{"attack":{"carrot_launch":{"max_dmg":50,"min_dmg":0,"chance":0.6,"canDouble":true},"carrot_beam":{"max_dmg":90,"min_dmg":30,"chance":0.5,"canDouble":false},"carrot_smash":{"max_dmg":75,"min_dmg":[15,30,45],"chance":0.4,"canDouble":false},"celery_crush":{"max_dmg":100,"min_dmg":70,"chance":0.6,"canDouble":false},"egg_pan":{"max_dmg":90,"min_dmg":60,"chance":0.3,"canDouble":true}},"defense":{"carrot_vitc":{"max_heal":20,"min_heal":10,"deflection":0.5,"reduction":0.5,"chance":1,"canMultiple":true},"egg_hard":{"max_heal":0,"min_heal":0,"deflection":1,"reduction":1,"chance":0.9,"canMultiple":true},"egg_selfharden":{"max_heal":0,"min_heal":0,"deflection":1,"reduction":1,"chance":0.4,"canMultiple":true},"egg_angel":{"max_heal":100,"min_heal":99,"deflection":0,"reduction":0,"chance":0.2,"canMultiple":false,"spreadAll":true},"celery_fortify":{"max_heal":0,"min_heal":0,"deflection":1,"reduction":0,"chance":0,"canMultiple":true}}},"enemy":{"attack":{}}}`;
var stats = JSON.parse(stats_raw);

function init() {
  stage = new createjs.Stage("demoCanvas");
  init_action_stage(stage);
  stage.update();
}

function action_stage_visibility(event){
  alert("hi!");
}

function init_action_stage(stage){
  var action_stage = new createjs.Shape();
  action_stage.graphics.beginFill("red").drawRect(20,20,300,75);
  stage.addChild(action_stage);
  stage.addEventListener("click", action_stage_visibility)
}
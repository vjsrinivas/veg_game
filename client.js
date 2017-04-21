var stage;
var stats = JSON.parse(stats_raw);
var carrot = init_characters(100, stats["player"]["attack"]["carrot"]);
var cupcake = init_characters(100, stats["enemy"]["attack"]);
var lost;

function init() {
    stage = new createjs.Stage("demoCanvas");
    init_background(stage);
    init_action_stage(stage, 30, 30);
    init_action_stage(stage, 670, 30);
    init_action_stage(stage, 350, 420);
    carrot.meta = init_sprite(stage, "carrot_character", 150, 200);
    cupcake.meta = init_sprite(stage, "cupcake", 700, 200);
}

function init_background(stage) {
    var elements = document.getElementById('execute');
    var elements2 = document.getElementById('restart');
    elements.onclick = clickHandler;
    elements2.onclick = restartHandler;
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

function init_action_stage(stage, x, y) {
    var img = new Image();
    img.src = "./img/action_stage_bg.png";
    var bitmap = new createjs.Bitmap(img);
    img.onload = function() {
        var image = event.target;
        var bitmap = new createjs.Bitmap(image);
        bitmap.x = x;
        bitmap.y = y;
        stage.addChild(bitmap);
        stage.update();
    };
    }
}

function init_enemy_stage(stage) {
    var img = new Image();
    img.src = "./img/action_stage_bg.png";
    img.onload = function() {
        var image = event.target;
        var bitmap = new createjs.Bitmap(image);
        bitmap.x = 670;
        bitmap.y = 30;
        stage.addChild(bitmap);
        stage.update();
    };
}

function init_action_drop(stage) {
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

function init_action_move(stage, move, x, y, img_src) {
    var img = new Image();
    img.src = "./img/" + img_src + ".png";
    var dragger = new createjs.Container();
    img.onload = function() {
        var image = event.target;
        var bitmap = new createjs.Bitmap(image);
        dragger.x = x
        dragger.y = y;
        dragger.addChild(bitmap);
        stage.addChild(dragger);
        stage.update();
    };
}

function init_characters(para_hp, moves) {
    var character = {
        hp: para_hp,
        moves: moves,
        meta: ["", 0, 0]
    };
    return character;
}

function init_sprite(stage, filename, x, y) {
    var img = new Image();
    img.src = "./img/" + filename + ".png";
    var bitmap;
    img.onload = function() {
        var image = event.target;
        bitmap = new createjs.Bitmap(image);
        bitmap.x = x;
        bitmap.y = y;
        stage.addChild(bitmap);
        stage.update();
    };
    return [filename, x, y];
}


/////////////


var clickHandler = function() {
    var attack_chance = Math.floor((Math.random() * 2) + 1);
    if (attack_chance == 2) {
        cupcake.hp -= 20;
        alert("Hit! Cupcake is at " + cupcake.hp + " HP");
    } else {
        alert("Miss!");
    }

    var done = whowon();

    if (done != 1) {
        var hit_from_enemy = Math.floor((Math.random() * 2) + 1);

        if (hit_from_enemy == 2) {
            carrot.hp -= 20;
            alert("You got hit! You only have " + carrot.hp + " HP");
        } else {
            alert("Your enemy missed!");
        }
    }

    done = whowon();
};

function whowon() {

    if (carrot.hp <= 0) {
        alert("You lost!");
        document.getElementById("execute").disabled = true;
        show_restart(carrot);
        lost = carrot;
        return 1;
    }
    if (cupcake.hp <= 0) {
        alert("You win!");
        document.getElementById("execute").disabled = true;
        show_restart(cupcake);
        lost = cupcake;
        return 1;
    }
    return 0;
}

function show_restart(loser) {
    document.getElementById("restart").style.display = "inherit";
    var img = new Image();
    img.src = "./img/" + loser.meta[0] + "_dead" + ".png";
    img.onload = function() {
        var image = event.target;
        var bitmap = new createjs.Bitmap(image);
        bitmap.x = loser.meta[1];
        bitmap.y = loser.meta[2];
        stage.addChild(bitmap);
        stage.update();
    };

}

var restartHandler = function() {
    carrot.hp = 100;
    cupcake.hp = 100;
    document.getElementById("execute").disabled = false;
    document.getElementById("restart").style.display = "none";
    var img = new Image();
    img.src = "./img/" + lost.meta[0] + ".png";
    img.onload = function() {
        var image = event.target;
        var bitmap = new createjs.Bitmap(image);
        bitmap.x = lost.meta[1];
        bitmap.y = lost.meta[2];
        stage.addChild(bitmap);
        stage.update();
    };
}
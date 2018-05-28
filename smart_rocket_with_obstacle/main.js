
var lifetime;
var population;
var life_counter;
var target;
var obstacles = [];

function setup() {

    // this behaves best in my second monitor.
    createCanvas(1024, 400);
    init_game_parameters();
    init_population();
    init_obstacles();

}


function init_game_parameters() {

    lifetime = height;
    life_counter = 0;
    target = new PVector(width / 2 , 24);
}


function init_population() {

    var mutation_date = 0.01;
    population = new Population(mutation_date , 50);
}


function init_obstacles() {

    obstacles.push(new Obstacle( (width / 2) - 100, (height / 2), 200, 10));
}

function draw() {

    background(255);
    fill(0);
    ellipse(target.x , target.y , 24 , 24);

    draw_obstacles();
    run_simulation();
    draw_data();

}




function draw_obstacles() {

    for(var i = 0 ; i < obstacles.length ; i++) {

        obstacles[i].display();
    }
}

function run_simulation() {

    if(life_counter < lifetime)
        update_simulation();
    else
        generate_generation();

}

function update_simulation() {

    population.live();
    life_counter++;

}


function generate_generation() {

    life_counter = 0;
    population.fitness();
    population.selection();
    population.reproduction();

}

function draw_data() {

    fill(0);
    text("Generation #:" + population.get_generations() , 10 , 18);
    text("Cycle left #:" + (lifetime - life_counter ) , 10 , 36);
}


function mousePressed() {

    target.x = mouseX;
    target.y = mouseY;
}



function Rocket(position , dna) {

    this.position = undefined;
    this.velocity =  undefined;
    this.acceleration =  undefined;
    this.dna = undefined;
    this.radius = 4;
    this.gene_counter = 0;
    this.hit_target = false;
    this.hit_obstacle = false;
    this.record_dist = 1000;
    this.finish_time = 0;

    this.init = function(position , dna) {

        this.acceleration = new PVector();
        this.velocity = new PVector();
        this.position = position;
        this.dna = dna;
    };

    this.init(position , dna);

    this.fitness = function() {

        if(this.record_dist < 1)
            this.record_dist = 1;

        this.fitness_score = this.get_fitness_score();
        this.update_fitness_according_to_env();


    };

    this.get_fitness_score = function() {


        var fitness_score =  (1 / (this.finish_time * this.record_dist));
        fitness_score = pow(fitness_score , 4);

        return fitness_score;
    };

    this.update_fitness_according_to_env = function() {

        if(this.hit_obstacle)
            this.fitness_score *= 0.1;

        if(this.hit_target)
            this.fitness_score *= 2;
    };

    this.run = function() {

        if(this.hit_obstacle || this.hit_target)
            return;

        this.check_target();

        if(this.hit_target === false)
            this.update_rocket();

        this.display();
        this.obstacled(obstacles);


    };

    this.update_rocket = function() {

        this.apply_force(this.dna.genes[this.gene_counter]);
        this.gene_counter = (this.gene_counter + 1) % this.dna.genes.length;
        this.update();
    };

    this.apply_force = function(f) {

        this.acceleration.add(f);
    };

    this.update = function() {

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

    };

    this.display = function() {

        var theta = this.velocity.heading() + PI / 2;
        fill(200 , 100);
        stroke(0);

        push();
        translate(this.position.x , this.position.y);
        rotate(theta);

        rectMode(CENTER);
        fill(0);
        rect(-this.radius / 2 , this.radius * 2 , this.radius / 2 , this.radius);
        rect(this.radius / 2 , this.radius * 2 , this.radius / 2 , this.radius);

        fill(175);
        beginShape(TRIANGLES);

        vertex(0 , -this.radius * 2 );
        vertex(-this.radius , this.radius * 2 );
        vertex(this.radius , this.radius * 2 );
        endShape();

        pop();
    };

    this.get_fitness = function() {

        return this.fitness_score;
    };

    this.get_dna = function() {

        return this.dna;
    };


    this.stopped = function() {

        return this.hit_obstacle;
    };

    this.obstacled = function(obstacles) {

        for(var i = 0 ; i < obstacles.length ; i++) {

            if(obstacles[i].contains(this.position)) {

                this.hit_obstacle = true;
                break;
            }
        }
    };

    this.check_target = function() {

        this.update_distance();

        if(this.hit_target === false && target.contains(this.position))
            this.hit_target = true;

        else if(!this.hit_target)
            this.finish_time++;


    };

    this.update_distance = function() {

        var distance = dist(this.position.x , this.position.y , target.position.x , target.position.y);

        if(distance < this.record_dist)
            this.record_dist = distance;

    };


}

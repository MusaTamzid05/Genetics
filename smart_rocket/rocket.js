

function Rocket(position , dna) {

    this.position = undefined;
    this.velocity =  undefined;
    this.acceleration =  undefined;
    this.dna = undefined;
    this.radius = 4;
    this.gene_counter = 0;
    this.hit_target = false;

    this.init = function(position , dna) {

        this.acceleration = new PVector();
        this.velocity = new PVector();
        this.position = position;
        this.dna = dna;
    };

    this.init(position , dna);

    this.fitness = function() {

        var distance = dist(this.position.x , this.position.y , target.x , target.y);
        this.fitness_score = pow(1 / distance , 2);
    };

    this.run = function() {


        var distance = dist(this.position.x , this.position.y , target.x , target.y);


        if(distance < 12)
            this.hit_target = true;

        if(this.hit_target === false)
            this.update_rocket();

        this.display();

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

}

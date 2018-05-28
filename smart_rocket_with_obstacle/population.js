


function Population(mutation_rate , total_rockets) {

    this.mutation_rate = mutation_rate;
    this.total_rockets = total_rockets;
    this.mating_tools = [];
    this.generations = 0;
    this.population = [];


    this.init = function() {

        for(let i = 0 ; i < this.total_rockets; i++) {

            var position = new PVector(width / 2 , height + 20);
            this.population[i] = new Rocket(position , new DNA());
        }
    };

    this.init();

    this.live = function() {

        for(let i = 0 ; i < this.population.length; i++)
            this.population[i].run();
    };

    this.fitness = function() {


        for(let i = 0 ; i < this.population.length; i++)
            this.population[i].fitness();
    };


    this.selection = function() {

        this.mating_tools = [];
        var max_fitness = this.get_max_fitness();

        this.init_pool_acording_to_fitness(max_fitness);

    };

    this.get_max_fitness = function() {

        var record = 0;

        for(let i = 0 ; i < this.population.length; i++)
            if(this.population[i].get_fitness() > record)
                record = this.population[i].get_fitness();

        return record;
    };

    this.init_pool_acording_to_fitness = function(max_fitness) {



        for(let i = 0 ; i < this.population.length; i++){

            var fitness_normal = map(this.population[i].get_fitness() , 0 , max_fitness , 0 , 1);
            var total_data = Math.round(fitness_normal * 100);

            for(let j = 0 ; j < total_data; j++)
                this.mating_tools.push(this.population[i]);

        }
    };

    this.get_generations = function() {
        return this.generations;
    };

    this.reproduction = function() {

        for(var i = 0 ; i < this.population.length; i++) {

            var child = this.get_child();
            this.add_child(child , i);

        }

        this.generations++;
    };

    this.get_child = function() {


        var mother_index  = Math.floor(Math.random() * (this.mating_tools.length - 1));
        var father_index  = Math.floor(Math.random() * (this.mating_tools.length - 1));


        var mother = this.mating_tools[mother_index];
        var father = this.mating_tools[father_index];

        var mother_genes = mother.get_dna();
        var father_genes = father.get_dna();

        return  mother_genes.crossover(father_genes);

    };

    this.add_child = function(child , index) {

        child.mutate(this.mutation_rate);
        var position = new PVector(width / 2 , height + 20);
        this.population[index] = new Rocket(position , child);
    };
}

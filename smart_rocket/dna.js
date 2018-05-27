

function DNA(genes = undefined) {

    this.genes = [];
    this.max_force = 0.1;

    this.init_genes = function() {

        for(let i = 0 ; i < lifetime ; i++) {

            var angle = random(TWO_PI);
            this.genes[i] = new PVector(cos(angle) , sin(angle));
            this.genes[i].mult(random(0 , this.max_force));
        }

    };

    if(genes === undefined)
        this.init_genes();

    else
        this.genes = genes;

    this.genes[0].normalize();

    this.crossover = function(partner) {

        var child = [];

        var midpoint = random(this.genes.length);

        for(let i = 0 ; i < this.genes.length; i++)
            child.push(this.select_gene_based_on(midpoint , partner , i));

        var new_genes = new DNA(child);
        return new_genes;

    };

    this.select_gene_based_on = function(midpoint, partner , index) {

        if(index > midpoint)
            return this.genes[index];

        return partner.genes[index];

    };

    this.mutate = function(m) {

        for(let i = 0 ; i < this.genes.length; i++) {

            if(this.should_mutate(m) === false)
                continue;

            this.mutate_gene_at(i);

        }
    };

    this.should_mutate = function(m) {

        if(random(1) > m)
            return false;

        return true;

    };


    this.mutate_gene_at = function(index) {

        var angle = random(TWO_PI);
        this.genes[index] = new PVector(cos(angle) , sin(angle));
        this.genes[index].mult(random(0 , this.max_force));

        if(index === 0)
            this.genes[index].normalize();
    };

}






function PVector(x  , y) {

    if(x == undefined && y == undefined) {

        this.x = 0;
        this.y = 0;

    } else {

        this.x = x;
        this.y = y;
    }



    this.add = function(vec) {

        this.x += vec.x;
        this.y += vec.y;
    };

    this.sub = function(vec) {


        this.x -= vec.x;
        this.y -= vec.y;

    };


    this.mult = function(num) {

        this.x *= num;
        this.y *= num;
    };


    this.div = function(num) {

        this.x /= num;
        this.y /= num;
    };

    this.mag = function() {

        return sqrt(this.x * this.x + this.y * this.y);
    };

    this.normalize = function() {

        var m = this.mag();

        if(m != 0)
            this.div(m);
    };

    this.set_equal = function(val) {

        this.x = val;
        this.y = val;
    };

    this.limit = function(max) {


        var mag = this.mag();

        if(mag > max) {

            this.normalize();
        }



    };

    this.show_value = function() {

        console.log("x = " + this.x +  " , y = " + this.y);
    };

    this.get = function() {

        return new PVector(this.x , this.y);
    };

    this.heading = function() {

        return Math.atan2(this.y , this.x);
    };

}


function Add(vec1 , vec2) {


    var vec = new PVector(vec1.x , vec1.y);
    vec.add(vec2);
    return vec;

}

function Sub(vec1 , vec2) {

    var vec = new PVector(vec1.x , vec1.y);
    vec.sub(vec2);
    return vec;

}

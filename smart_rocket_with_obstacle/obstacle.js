

function Obstacle(x , y , width , height){


    this.position = new PVector(x , y);
    this.width = width;
    this.height = height;


    this.contains = function(object) {

        if(object.x > this.position.x &&
            object.x < (this.position.x + this.width) &&
            object.y > this.position.y &&
            object.y < (this.position.y + this.height)) {

            return true;
        }

        return false;

    };

    this.display = function() {

        stroke(0);
        fill(175);
        strokeWeight(2);
        rectMode(CORNER);
        rect(this.position.x , this.position.y, this.width , this.height);

    };

}

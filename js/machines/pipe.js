function Pipe(_pos,_variant){
    this.texture = {x: 0+((_variant||0)*16), y: 96, width: 16, height: 32};
    this.inventory = new Inventory({input: [], output: []});
    Machine.call(this,_pos);
}
Pipe.prototype = Object.create(Machine.prototype);
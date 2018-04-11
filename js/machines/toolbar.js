function Toolbar(_pos){
    this.texture = {x: 0, y: 128, width: 108, height: 16};
    Machine.call(this,_pos);
    this.inventory = new Inventory({
        input: [{x: 4, y: 4},{x: 17, y: 4},{x: 30, y: 4},{x: 43, y: 4},{x: 57, y: 4},{x: 70, y: 4},{x: 83, y: 4},{x: 96, y: 4}],
        output: [{x: 111, y: 4}]
    });
}
Toolbar.prototype = Object.create(Machine.prototype);
Toolbar.prototype.update = function(){
    //this.inventory.output[0] = screen.hand;
    this.pos.x = 31-screen.position;
}
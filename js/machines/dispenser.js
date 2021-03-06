function Dispenser(_pos,_resource){
    this.texture = {x: 256, y: 32, width: 32, height: 64};
    Machine.call(this,_pos);
    this.inventory = new Inventory({
        output: [{x: 12, y: 46}]
    });
    this.resource = _resource.res?_resource:{max: 500, val: 500, res: new ItemStack(new Item(13))};
    this.gauges = [new Gauge({x: 23.5, y: 27.5},this.resource,true)];
}
Dispenser.prototype = Object.create(Machine.prototype);
Dispenser.prototype.CraftingList = {
    "x0,": [15],
    "x1,": [8],
    "x2,": [10],
    "x3,": [13]
}
Dispenser.prototype.update = function () {
    if (this.resource.val>0 && !this.inventory.isBlocked()){
        this.inventory.output[0] = this.resource.res;
        this.resource.val--;
    }
};

function Recycler(_pos){
    this.texture = {x: 448, y: 32, width: 32, height: 64};
    Machine.call(this,_pos);
    this.inventory = new Inventory({
        input: [{x: 12, y: 10}]
    });
    this.resource = {max: 100, val: 100};
    this.gauges = [new Gauge({x: 23.5, y: 27.5},this.resource)];
}
Recycler.prototype = Object.create(Machine.prototype);
Recycler.prototype.CraftingList = {
    "12,": []
};
Recycler.prototype.update = function () {
    if (this.resource.val>0 && this.inventory.getRecipe()!=""){
        this.inventory.input = [];
        this.resource.val--;
    }
};

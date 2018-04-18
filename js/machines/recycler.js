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
    "0,": ["Recykling"],
    "1,": ["Recykling"],
    "2,": ["Recykling"],
    "3,": ["Recykling"],
    "4,": ["Recykling"],
    "5,": ["Recykling"],
    "6,": ["Recykling"],
    "7,": ["Recykling"],
    "8,": ["Recykling"],
    "9,": ["Recykling"],
    "10,": ["Recykling"],
    "11,": ["Recykling"],
    "12,": ["Recykling"],
    "13,": ["Recykling"],
    "14,": ["Recykling"],
    "15,": ["Recykling"],
};
Recycler.prototype.update = function () {
    if (this.resource.val>0 && this.inventory.getRecipe()!=""){
        this.inventory.input = [];
        this.resource.val--;
    }
};

function Crusher(_pos,_flux){
    this.texture = {x: 0,y: 32, width: 64, height: 64};
    this.flux = _flux || screen.flux;
    Machine.call(this,_pos);
    this.inventory = new Inventory({
        input: [{x: 28, y: 16}],
        output: [{x: 10, y: 46},{x: 28, y: 46},{x: 46, y: 46}]
    });
    this.progress = {max: 500,val: 0};
    this.gauges = [new Gauge({x: 12.5, y: 20.5},this.progress),new Gauge({x: 55.5, y: 17.5},this.flux,true)];
}
Crusher.prototype = Object.create(Machine.prototype);
Crusher.prototype.CraftingList={
  "8,":[9,9,9],
  "10,":[11,11,11]
};

Crusher.prototype.update = function () {
    if(!this.proccesing && (this.flux.val-this.flux.reserved)>=100 && !this.inventory.isBlocked()){
        if(this.CraftingList[this.inventory.getRecipe()]){
            //console.log("test");
            this.last=this.CraftingList[this.inventory.getRecipe()];
            this.inventory.input = [];
            this.progress.val=this.progress.max;
            this.proccesing=true;
            this.flux.reserved+=(0.2*500);
        }
    }
    if (this.progress.val>0){
        this.progress.val--;
        this.flux.val-=(0.2);
        this.flux.reserved=Math.max(this.flux.reserved-0.2,0);
    }
    if(this.progress.val<1 && this.proccesing){
        this.proccesing=false;
        for(let i in this.inventory.slots.output){
            this.inventory.output[i]=new ItemStack(new Item(this.last[i]));
        }
    }
};
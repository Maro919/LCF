function Assembler(_pos, _flux){
    this.texture = {x: 64,y: 32, width: 64, height: 64};
    this.flux = _flux || screen.flux;
    Machine.call(this,_pos);
    this.inventory = new Inventory({
        input: [{x: 10, y: 10},{x: 46, y: 10},{x: 10, y: 46},{x: 46, y: 46}],
        output: [{x: 28, y: 28}]
    });
    this.progress = {max: 500,val: 0};
    this.gauges = [new Gauge({x: 16.5, y: 30.5},this.progress),new Gauge({x: 47.5, y: 30.5},this.flux,true)];
}
Assembler.prototype = Object.create(Machine.prototype);
Assembler.prototype.CraftingList={
  "14,14,14,12,":[2],
  "2,2,12,12,":[1],
  "0,1,2,12,":[3],
  "11,9,1,2,":[0],
  "1,1,0,12,":[5],
  "3,5,2,2,":[4],
  "4,5,6,3,":[7]
};

Assembler.prototype.update = function () {
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

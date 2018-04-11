function Press(_pos,_steam){
    this.texture = {x: 128,y: 32, width: 64, height: 64};
    this.steam = _steam || screen.steam;
    Machine.call(this,_pos);
    this.inventory = new Inventory({
        input: [{x: 10, y: 10},{x:46,y:10}],
        output: [{x: 28, y: 46}]
    });
    this.progress = {max: 500,val: 0};
    this.gauges = [new Gauge({x: 13.5, y: 30.5},this.progress),new Gauge({x: 50.5, y: 29.5},this.steam,true)];
}
Press.prototype = Object.create(Machine.prototype);
Press.prototype.CraftingList={
"8,13,":[14],
"9,13,":[12],
"3,12,":[6]
};

Press.prototype.update = function () {
    if(!this.proccesing && (this.steam.val-this.steam.reserved)>=100 && !this.inventory.isBlocked()){
        if(this.CraftingList[this.inventory.getRecipe()]){
            console.log("test");
            this.last=this.CraftingList[this.inventory.getRecipe()];
            this.inventory.input = [];
            this.progress.val=this.progress.max;
            this.proccesing=true;
            this.steam.reserved+=(0.2*500);
        }
    }
    if (this.progress.val>0){
        this.progress.val--;
        this.steam.val-=(0.2);
        this.steam.reserved=Math.max(this.steam.reserved-0.2,0);
    }
    if(this.progress.val<1 && this.proccesing){
        this.proccesing=false;
        for(let i in this.inventory.slots.output){
            this.inventory.output[i]=new ItemStack(new Item(this.last[i]));
        }
    }
};
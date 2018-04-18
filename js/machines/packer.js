function Packer(_pos,_flux,_lock){
    this.texture = {x: 320, y: 32, width: 128, height: 64};
    this.flux = _flux || screen.flux;
    this.lock = _lock;
    //console.log(_pos,_flux,_lock);
    Machine.call(this,_pos);
    this.inventory = new Inventory({
        input: [{x: 28, y: 8}]
    });
    this.progress = {max: 500,val: 0};
    this.gauges = [new Gauge({x: 45.5, y: 9.5},this.progress),new Gauge({x: 55.5, y: 9.5},this.flux,true)];
}
Packer.prototype = Object.create(Machine.prototype);
Packer.prototype.CraftingList = {
    "7,": ["Wygrana"]
}
Packer.prototype.update = function () {
    if(!this.proccesing && (this.flux.val-this.flux.reserved)>=100){
        if(this.CraftingList[this.inventory.getRecipe()]){
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
    if(this.progress.val<1 && this.proccesing && this.lock) this.progress.val=this.progress.max;
    if(this.progress.val<1 && this.proccesing && !this.lock){
        this.proccesing=false;
        var tmp = (new Date().getTime()-screen.time);
        var sec = Math.floor(tmp/1000);
        var min = Math.floor(sec/60);
        sec-=(min*60);
        this.used = false;
        localStorage.score = ""+min+"min:"+sec+"sec";
        screen = new MainScreen();
    }
};
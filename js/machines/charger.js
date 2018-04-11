function Charger(_pos){
    this.texture = {x: 288, y: 32, width: 32, height: 64};
    Machine.call(this,_pos);
    this.inventory = new Inventory({
        input: [{x: 12, y: 10}]
    });
    this.progress = {max: 150, val: 0};
    this.burn = {max: 499, val: 0, reserved: 0};
    this.gauges = [new Gauge({x: 23.5, y: 27.5},this.progress),new Gauge({x: 8.5, y: 27.5},this.burn,true)];
}
Charger.prototype = Object.create(Machine.prototype);
Charger.prototype.update = function () {
    if(!this.proccesing){
        if(this.inventory.getRecipe()=="14," && this.burn.val+this.burn.reserved<=this.burn.max-(this.burn.max/(3/2))){
            this.inventory.input = [];
            this.progress.val=this.progress.max;
            this.proccesing=true;
            this.burn.reserved += this.burn.max/(3/2);
        }
    }
    if (screen.flux.val < screen.flux.max && this.burn.val > 0){
        this.burn.val--;
        screen.flux.val+=1;
    }
    if (this.progress.val > 0){
        this.progress.val--;
        this.burn.val += (this.burn.max/(3/2))/150;
        this.burn.reserved = Math.max( this.burn.reserved-((this.burn.max/(3/2))/150) , 0);
    }
    if(this.progress.val<1 && this.proccesing){
        this.proccesing=false;
        //this.burn.val += this.burn.max/(3/2);
    }
};
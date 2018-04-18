function Boiler(_pos){
    this.texture = {x: 192,y: 32, width: 64, height: 64};
    Machine.call(this,_pos);
    this.inventory = new Inventory({
        input: [{x: 28, y: 11}]
    });
    this.progress = {max: 150, val: 0};
    this.burn = {max: 499, val: 0, reserved: 0};
    this.gauges = [new Gauge({x: 47.5, y: 15.5},this.progress),new Gauge({x: 16.5, y: 36.5},this.burn,true)];
    this.animation = {time: 0, frame: [0,0,0,0,0,0,0]};
}
Boiler.prototype = Object.create(Machine.prototype);
Boiler.prototype.CraftingList = {
  "15,":["Para"],
};
Boiler.prototype.display = function(){
    Machine.prototype.display.call(this);
    if (this.burn.val > 0){
        for (let i=0;i<7;i++){
            ctx.save();
            ctx.translate(this.pos.x+(i*6*scale)+12*scale,this.pos.y+45*scale);
            ctx.drawImage(texture, this.animation.frame[i], 144, 4, 10, 0, 0, scale*4, scale*10);
            ctx.restore();
        }
    }
}
Boiler.prototype.update = function () {
    this.animation.time++;
    if (this.animation.time%10==0) {
        for (let i=0;i<7;i++) this.animation.frame[i] = Math.floor(Math.random()*16)*4;
    }
    if(!this.proccesing){
        if(this.inventory.getRecipe()=="15," && this.burn.val+this.burn.reserved<=this.burn.max-(this.burn.max/(3/2))){
            this.inventory.input = [];
            this.progress.val=this.progress.max;
            this.proccesing=true;
            this.burn.reserved += this.burn.max/(3/2);
        }
    }
    if (screen.steam.val < screen.steam.max && this.burn.val > 0){
        this.burn.val--;
        screen.steam.val+=1;
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
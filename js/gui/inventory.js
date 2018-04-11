function Inventory(_slots, _locked){
    this.input = [];
    this.output = [];
    this.locked = _locked;
    this.slots = _slots;
    for (let i in this.slots.input) if (this.slots.input[i].preset!=undefined) this.input[i] = this.slots.input[i].preset;
    for (let i in this.slots.output) if (this.slots.output[i].preset!=undefined) this.output[i] = this.slots.output[i].preset;
}
Inventory.prototype.display = function(){
    for (let i in this.slots.input)
        if (this.input[i]!=undefined) this.input[i].display(this.slots.input[i].x, this.slots.input[i].y);
    for (let i in this.slots.output)
        if (this.output[i]!=undefined) this.output[i].display(this.slots.output[i].x, this.slots.output[i].y);
}
Inventory.prototype.getRecipe = function(){
    var tmp = "";
    for (let i in this.input)
        if (this.input[i]!=undefined)
            if (this.input[i].item.id!=undefined)
                tmp+=this.input[i].item.id+",";
    return tmp;
}
Inventory.prototype.isBlocked = function(){
    for(let i in this.output){
      if(this.output[i]!=undefined)
        return true;
    }
    return false;
}
Inventory.prototype.onClick = function(e){
    let output = [-1,-1];
    for (let i in this.slots.input){
        if (e.x>=this.slots.input[i].x && e.x<=this.slots.input[i].x+8 && e.y>=this.slots.input[i].y && e.y<=this.slots.input[i].y+8){
            console.log("Clicked on input slot "+i);
            if (!this.locked){
                let tmp = screen.hand;
                screen.hand = this.input[i];
                this.input[i] = tmp;
            }
            output[0] = parseInt(i);
        }
    }
    for (let i in this.slots.output){
        if (e.x>=this.slots.output[i].x && e.x<=this.slots.output[i].x+8 && e.y>=this.slots.output[i].y && e.y<=this.slots.output[i].y+8){
            console.log("Clicked on output slot "+i);
            if (!this.locked && !screen.hand){
                screen.hand = this.output[i];
                this.output[i] = undefined;
            }
            output[1] = parseInt(i);
        }
    }
    return output;
}
Inventory.prototype.update = function(){}
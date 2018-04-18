function StaticButton(_x,_y,_scale,_item,_texture,_func,_disable){
    this.scale = _scale;
    this.width = _texture.width*this.scale;
    this.height = _texture.height*this.scale;
    this.pos = {x: _x,y: _y};
    this.texture = _texture;
    this.texture.display = _disable?false:this.texture.display;
    this.func = _disable?"":_func;
    this.itemType = _disable?undefined:_item[0];
    this.active = false;
    switch(_item[0]){
        case 0: this.item = undefined; break;
        case 1: this.item = new ItemStack(new Item(_item[1]),_item[2]); break;
        case 2: this.item = new ItemStack(new StaticButton.machines[_item[1]]({x:0,y:0},StaticButton.dummyGauge),_item[2]); break;
    }
    this.item = _disable?undefined:this.item;
}
StaticButton.dummyGauge = {max: 500, val: 500, reserved: 0};
StaticButton.machines = [
    Dispenser,
    Boiler,
    Charger,
    Press,
    Crusher,
    Assembler,
    Recycler,
    Packer
];
StaticButton.prototype.display = function(){
    ctx.save();
    ctx.translate(this.pos.x,this.pos.y);
    if (this.texture.display) ctx.drawImage(texture,this.texture.x+(this.active&&this.texture.oX?this.texture.oX:0),this.texture.y+(this.active&&this.texture.oY?this.texture.oY:0),this.texture.width,this.texture.height,0,0,this.width,this.height);
    if (this.item){
        ctx.translate(this.texture.width/2*this.scale,this.texture.height/2*this.scale);
        switch(this.itemType){
            case 1: ctx.translate(-4*this.item.scale,-4*this.item.scale); break;
            case 2: ctx.translate(-this.item.item.texture.width/2*this.item.scale,-this.item.item.texture.height/2*this.item.scale); break;
        }
        this.item.display();
    }
    ctx.restore();
}
StaticButton.prototype.update = function(){}
StaticButton.prototype.onClick = function(e){
    eval(this.func);
}
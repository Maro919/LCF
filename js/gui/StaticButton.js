function StaticButton(_param,_item,_func,_bg){
    this.param = _param;
    this.pos = {x: _param.x,y: _param.y};
    this.func = _func;
    this.item = _item;
    this.texture = {x: 0,y: 32, width: _param.width/scale*this.param.scale, height: _param.height/scale*this.param.scale};
    this.bg = _bg;
    
}
StaticButton.prototype.display = function(){
    ctx.save();
    ctx.translate(this.pos.x,this.pos.y);
    //ctx.fillRect(0,0,this.param.size*this.param.scale,this.param.size*this.param.scale);
    ctx.scale(1/scale,1/scale);
    ctx.scale(this.param.scale,this.param.scale);
    if (this.bg) ctx.drawImage(texture,this.bg.x,this.bg.y,this.bg.width,this.bg.height,0,0,this.texture.width*this.param.scale,this.texture.height*this.param.scale);
    this.item.display();
    ctx.restore();
}
StaticButton.prototype.update = function(){
    this.pos.x = this.param.x-screen.position;
}
StaticButton.prototype.onClick = function(e){
    console.log("Clicked");
    eval(this.func);
}
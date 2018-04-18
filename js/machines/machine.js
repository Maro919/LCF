function Machine(_pos){
    this.pos = _pos || {x:0,y:0};
    this.proccesing = false;
}
Machine.prototype.display = function() {
    ctx.save();
    ctx.translate(this.pos.x,this.pos.y);
    ctx.drawImage(texture, this.texture.x, this.texture.y, this.texture.width, this.texture.height, 0, 0, scale*this.texture.width, scale*this.texture.height);
    for (let i in this.gauges) this.gauges[i].display();
    this.inventory.display();
    ctx.restore();
}
Machine.prototype.update = function () {
};
Machine.prototype.CraftingList = {};

Machine.prototype.onClick = function(e){
    //console.log("Clicked on Machine!",e);
    return this.inventory.onClick(e);
}
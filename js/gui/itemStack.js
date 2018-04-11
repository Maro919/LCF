function ItemStack(_item,_scale) {
    this.item = _item;
    this.scale=this.item.pos?(3/4):scale;
    this.scale = _scale || this.scale;
    this.display = function(_x,_y) {
        ctx.save();
        ctx.translate(scale*_x,scale*_y);
        ctx.scale(1/scale,1/scale);
        ctx.scale(this.scale,this.scale);
        this.item.display();
        ctx.restore();
    }
}
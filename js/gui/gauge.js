function Gauge(_pos,_value,_reverse){
    this.value = _value;
    this.pos = _pos;
    this.reverse = _reverse;
}
Gauge.prototype.display = function(){
    ctx.save();
    ctx.translate(this.pos.x*scale,this.pos.y*scale);
    this.value.val = Math.max(Math.min(this.value.val,this.value.max),0);
    var tmp = (this.value.val/this.value.max);
    if (this.reverse) tmp = 1-tmp;
    if (tmp>=0) ctx.rotate( (Math.max(Math.min(1-tmp,1),0)*Math.PI)-(Math.PI/2) );
    else ctx.rotate(-Math.PI/2);
    ctx.fillStyle = "red";
    ctx.scale(scale,scale);
    ctx.fillRect(-0.5,-3.5,1,3);
    ctx.restore();
}

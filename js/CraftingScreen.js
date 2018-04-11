function Crafting() {
    console.log("Created a new CraftingScreen");
    this.position = 0;
    this.elements = [];
    this.elements.push(
        new StaticButton({x: 14*scale,y: 16*scale,width: 8,height: 8,scale: 6}, new ItemStack(new Item(81),5),"tmpScreen = hiddenScreen; hiddenScreen = screen; screen = tmpScreen;",{x: 96,y: 160,width: 8,height: 8})
    );
    this.hand = undefined;
}

Crafting.prototype.update = function(){
    for (let i=0;i<this.elements.length;i++) this.elements[i].update();
}
Crafting.prototype.display = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0,800,600);
    ctx.drawImage(menu,50,50,700,500);
    ctx.font = "30px VT323";
    ctx.fillText("Powrót",160,130);
    ctx.save();
    
    for (let i=0;i<this.elements.length;i++) this.elements[i].display();
    
    ctx.restore();
}
Crafting.prototype.onScroll = function(e){

}
Crafting.prototype.onClick = function(e){
    e.x-=this.position;
    for (var i in this.elements){
        if (e.x>=this.elements[i].pos.x && e.x<=this.elements[i].pos.x+(this.elements[i].texture.width*scale) && e.y>=this.elements[i].pos.y && e.y<=this.elements[i].pos.y+(this.elements[i].texture.height*scale)){
            e.x-=this.elements[i].pos.x;
            e.y-=this.elements[i].pos.y;
            e.x = Math.floor(e.x/scale);
            e.y = Math.floor(e.y/scale);
            return this.elements[i].onClick(e);
        }
    }
}

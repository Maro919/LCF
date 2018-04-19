function GameScreen() {
    console.log("Created a new GameScreen");
    
    this.position = -149;
    this.steam = {max: 500, val: 0, reserved: 0};
    this.flux = {max: 500, val: 0, reserved: 0};
    this.hand = undefined;
    hiddenScreen = new Crafting();
    this.time = new Date().getTime();
    
    this.initButtons();
    
    this.elements = [];
    this.elements.push(new Toolbar({x: 31,y: 480}));
    this.elements.push(new Crusher({x: 32*scale, y: 64},this.flux));
    this.elements.push(new Pipe({x: 96*scale,y: 64+(32*scale)}));
    this.elements.push(new Assembler({x: 112*scale,y: 64},this.flux));
    this.elements.push(new Pipe({x: 176*scale,y: 64+(32*scale)}));
    this.elements.push(new Press({x: 192*scale,y: 64},this.steam));
    this.elements.push(new Pipe({x: 256*scale,y: 64},1));
    this.elements.push(new Pipe({x: 256*scale,y: 64+(32*scale)}));
    this.elements.push(new Boiler({x: 272*scale,y: 64}));
    this.elements.push(new Pipe({x: 336*scale,y: 64+(32*scale)}));
    let group = 352;
    this.elements.push(new Dispenser({x: (0+group)*scale,y: 64},{max: 300,val: 300, res: new ItemStack(new Item(15))}));
    this.elements.push(new Dispenser({x: (32+group)*scale,y: 64},{max: 200,val: 200, res: new ItemStack(new Item(8))}));
    this.elements.push(new Dispenser({x: (64+group)*scale,y: 64},{max: 10,val: 10, res: new ItemStack(new Item(10))}));
    this.elements.push(new Dispenser({x: (96+group)*scale,y: 64},{max: 300,val: 300, res: new ItemStack(new Item(13))}));
    this.elements.push(new Pipe({x: 480*scale,y: 64+(32*scale)}));
    this.elements.push(new Charger({x: 496*scale,y: 64}));
    this.elements.push(new Pipe({x: 528*scale,y: 64+(32*scale)}));
    this.elements.push(new Recycler({x: 544*scale,y: 64}));
    this.elements.push(new Pipe({x: 576*scale,y: 64+(32*scale)}));
    this.elements.push(new Packer({x: 592*scale,y: 64},this.flux));
}

GameScreen.prototype.initButtons = function(){
    this.buttons = [new StaticButton(canvas.width/2+300, 488, 10, [1,82,13],{x: 96,y: 160,width: 8,height: 8,display: false},"tmpScreen = hiddenScreen; hiddenScreen = screen; screen = tmpScreen;")];
}

GameScreen.prototype.update = function(){
    this.initButtons();
    this.position = Math.max(Math.min(-149,this.position),canvas.width-4354);
    for (var i in this.elements) this.elements[i].update();
}
GameScreen.prototype.display = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0;i<canvas.width/800;i++) ctx.drawImage(background,i*800,0,800,600);
    ctx.save();
    for (let i=0;i<this.buttons.length;i++) this.buttons[i].display();
    ctx.translate(this.position,0);
    for(let e of this.elements) {
        e.display();
    }
    if (screen.hand) screen.hand.display(mouse.x/scale-this.position/scale-2*(scale/3), mouse.y/scale-2*(scale/3));
    /*
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Instrukcje",400-this.position, 20);
    */
    
    ctx.restore();
}
GameScreen.prototype.onScroll = function(e){
    this.position+=e*50;
}
GameScreen.prototype.onClick = function(e){
    for (let i of this.buttons) if (e.x>=i.pos.x && e.x<=i.pos.x+i.width && e.y>=i.pos.y && e.y<=i.pos.y+i.height){i.onClick(e); return [this.buttons.indexOf(i),-1]}
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
function Crafting() {
    console.log("Created a new CraftingScreen");
    this.position = 0;
    this.buttons = [];
    this.buttons.push(
        new StaticButton(canvas.width/2-47*8.3, canvas.height/2-21*8.3, 8.3, [1,80,4],{x: 96,y: 168,width: 8,height: 8,display: true},"tmpScreen = hiddenScreen; hiddenScreen = screen; screen = tmpScreen;"),
        new StaticButton(canvas.width/2+39*8.3, canvas.height/2-21*8.3, 8.3, [1,81,4],{x: 104,y: 168,width: 8,height: 8,display: true},"hiddenScreen = screen; screen = new MainScreen();"),
        new StaticButton(canvas.width/2-47*8.3, canvas.height/2-12*8.3, 8.3, [2,0,4/6],{oY: -8,x: 96,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2-47*8.3, canvas.height/2-3*8.3, 8.3, [2,1,4/6],{oY: -8,x: 96,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2-47*8.3, canvas.height/2+6*8.3, 8.3, [2,2,4/6],{oY: -8,x: 96,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2-47*8.3, canvas.height/2+15*8.3, 8.3, [2,3,4/6],{oY: -8,x: 96,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2+39*8.3, canvas.height/2-12*8.3, 8.3, [2,4,4/6],{oY: -8,x: 104,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2+39*8.3, canvas.height/2-3*8.3, 8.3, [2,5,2/6],{oY: -8,x: 104,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2+39*8.3, canvas.height/2+6*8.3, 8.3, [2,6,4/6],{oY: -8,x: 104,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2+39*8.3, canvas.height/2+15*8.3, 8.3, [2,7,4/6],{oY: -8,x: 104,y: 168,width: 8,height: 8,display: true},"")
    );
    
    this.index = 0;
    this.page = 0;
    this.machine = new StaticButton.machines[this.index]({x:0,y:0},Object.create(StaticButton.dummyGauge));
    
    this.steam = {max: 500, val: 500, reserved: 0};
    this.flux = {max: 500, val: 500, reserved: 0};
    
    this.hand = undefined;
}

Crafting.prototype.update = function(){
    for (let i of this.buttons) i.active = false;
    this.buttons[this.index+2].active = true;
    this.info = [this.machine,this.desc[this.index]];
    this.info[0].inventory.input = [];
    this.info[0].inventory.output = [];
    for (let i of Object.keys(this.info[0].CraftingList)[this.page].split(",")){
        if (i!=""){
            this.info[0].inventory.input.push(new ItemStack(new Item(i)));
        }
    }
    this.info[0].update();
    this.info[0].flux = {max: 500, val: 500, reserved: 0};
    this.info[0].steam = {max: 500, val: 500, reserved: 0};
    for (let i of Object.keys(this.info[0].CraftingList)[this.page].split(",")){
        if (i!=""){
            this.info[0].inventory.input.push(new ItemStack(new Item(i)));
        }
    }
    for(let i of this.info[0].CraftingList[Object.keys(this.info[0].CraftingList)[this.page]]) this.info[0].inventory.output.push(new ItemStack(new Item(i)));
}
Crafting.prototype.desc = [
    ["Automat montażowy - służy do składania skomplikowanych częśći maszyn"],
];
Crafting.prototype.display = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0,800,600);
    
    //ctx.drawImage(menu,50,50,700,500);
    
    ctx.save();
    
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.scale(8.3,8.3);
    ctx.drawImage(menu,-40,-30);
    
    ctx.restore();
    
    ctx.save();
    ctx.translate(canvas.width/2-21*8.3,canvas.height/2-25*8.3);
    ctx.translate(-(this.info[0].texture.width*3)*(3/5),0);
    ctx.scale(3/5,3/5);
    this.info[0].display();
    ctx.restore();
    
    ctx.save();
    for (let i=0;i<this.buttons.length;i++) this.buttons[i].display();
    ctx.restore();
}
Crafting.prototype.onScroll = function(e){

}
Crafting.prototype.onClick = function(e){
    for (let i of this.buttons) if (e.x>=i.pos.x && e.x<=i.pos.x+i.width && e.y>=i.pos.y && e.y<=i.pos.y+i.height){
        i.onClick(e);
        switch(this.buttons.indexOf(i)){
            case 0:
            case 1: break;
            case 10: this.page--; break;
            case 11: this.pag = Math.max(Math.min(++this.page,),0); break;
            default:
                this.index = this.buttons.indexOf(i)-2;
                this.page = 0;
                this.machine = new StaticButton.machines[this.index]({x:0,y:0},Object.create(StaticButton.dummyGauge));
        }
    }
}
function Crafting(_mode) {
    console.log("Created a new CraftingScreen"+(_mode?" - disabled exit":""));
    this.position = 0;
    
    this.initButtons();
    
    this.mode = _mode;
    
    this.index = 0;
    this.page = 0;
    this.machine = new StaticButton.machines[this.index]({x:0,y:0},Object.create(StaticButton.dummyGauge),true);
    
    this.steam = {max: 500, val: 500, reserved: 0};
    this.flux = {max: 500, val: 500, reserved: 0};
    
    this.hand = undefined;
}

Crafting.prototype.initButtons = function(){
    this.buttons = [];
    this.buttons.push(
        new StaticButton(canvas.width/2-47*8.3, canvas.height/2-21*8.3, 8.3, [1,84,4],{x: 96,y: 168,width: 8,height: 8,display: true},"tmpScreen = hiddenScreen; hiddenScreen = screen; screen = tmpScreen;"),
        new StaticButton(canvas.width/2+39*8.3, canvas.height/2-21*8.3, 8.3, [1,81,4],{x: 104,y: 168,width: 8,height: 8,display: true},"hiddenScreen = screen; screen = new MainScreen();",this.mode),
        
        new StaticButton(canvas.width/2-47*8.3, canvas.height/2-12*8.3, 8.3, [2,0,4/6],{oY: -8,x: 96,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2-47*8.3, canvas.height/2-3*8.3, 8.3, [2,1,4/6],{oY: -8,x: 96,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2-47*8.3, canvas.height/2+6*8.3, 8.3, [2,2,4/6],{oY: -8,x: 96,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2-47*8.3, canvas.height/2+15*8.3, 8.3, [2,3,4/6],{oY: -8,x: 96,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2+39*8.3, canvas.height/2-12*8.3, 8.3, [2,4,4/6],{oY: -8,x: 104,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2+39*8.3, canvas.height/2-3*8.3, 8.3, [2,5,4/6],{oY: -8,x: 104,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2+39*8.3, canvas.height/2+6*8.3, 8.3, [2,6,4/6],{oY: -8,x: 104,y: 168,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2+39*8.3, canvas.height/2+15*8.3, 8.3, [2,7,2/6],{oY: -8,x: 104,y: 168,width: 8,height: 8,display: true},""),
        
        new StaticButton(canvas.width/2-39*8.3, canvas.height/2+19*8.3, 8.3, [0,0],{x: 96,y: 176,width: 8,height: 8,display: true},""),
        new StaticButton(canvas.width/2+31*8.3, canvas.height/2+19*8.3, 8.3, [0,0],{x: 104,y: 176,width: 8,height: 8,display: true},"")
    );
}

Crafting.prototype.update = function(){
    this.initButtons();
    
    for (let i of this.buttons) i.active = false;
    this.buttons[this.index+2].active = true;
    this.info = [this.machine,this.desc[this.index]];
    this.info[0].inventory.input = [];
    this.info[0].inventory.output = [];
    for (let i of Object.keys(this.info[0].CraftingList)[this.page].split(",")) if (i!="") this.info[0].inventory.input.push(new ItemStack(new Item(i)));
    this.info[0].update();
    this.info[0].flux = {max: 500, val: 500, reserved: 0};
    this.info[0].steam = {max: 500, val: 500, reserved: 0};
    this.info[0].inventory.input = [];
    for (let i of Object.keys(this.info[0].CraftingList)[this.page].split(",")) if (i!="") this.info[0].inventory.input.push(new ItemStack(new Item(i)));
    this.info[0].inventory.output = [];
    for(let i of this.info[0].CraftingList[Object.keys(this.info[0].CraftingList)[this.page]]) this.info[0].inventory.output.push(new ItemStack(new Item(i)));
    
    if (this.page == 0) this.buttons[10].disabled = true;
    else this.buttons[10].disabled = false;
    
    if (this.page == Object.keys(this.machine.CraftingList).length-1) this.buttons[11].disabled = true;
    else this.buttons[11].disabled = false;
}
Crafting.prototype.desc = [
    "Dozownik",
    "Boiler",
    "Ładowarka",
    "Prasa",
    "Rozdrabniarka",
    "Automat Montażowy",
    "Kosz na odpady",
    "Paczkomat"
];
Crafting.prototype.display = function(){
    hiddenScreen.display();
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.restore();
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //for (let i=0;i<canvas.width/800;i++) ctx.drawImage(background,i*800,0,800,600);
    
    //ctx.drawImage(menu,50,50,700,500);
    
    ctx.save();
    
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.scale(8.3,8.3);
    ctx.drawImage(menu,-40,-30);
    
    ctx.restore();
    
    ctx.save();
    ctx.translate(canvas.width/2-21*8.3,canvas.height/2-25*8.3);
    ctx.translate(-(this.info[0].texture.width*3)*(3/5),0);
    if (this.info[0].lock) ctx.translate((this.info[0].texture.width*1.5)*(3/5),(this.info[0].texture.height*1.5)*(3/5));
    ctx.scale(3/5,3/5);
    if (this.info[0].lock) ctx.scale(0.5,0.5);
    this.info[0].display();
    ctx.restore();
    
    
    ctx.save();
    ctx.translate(canvas.width/2-21*8.3,42*8.3);
    ctx.drawImage(texture,64,192,80,64,-40*scale/2,0,80*scale/2,64*scale/2);
    ctx.restore();
    
    ctx.save();
    ctx.font = "25px VT323";
    ctx.textAlign = "center";
    ctx.fillText("Wynik:",canvas.width/2-21*8.3, canvas.height/2+10*8.3);
    ctx.fillText(this.machine.inventory.output[0].item.name||this.machine.inventory.output[0].item.id,canvas.width/2-21*8.3, canvas.height/2+13*8.3);
    ctx.restore();
    
    ctx.save();
    ctx.font = "30px VT323";
    ctx.textAlign = "center";
    ctx.fillText(this.desc[this.index],canvas.width/2+21*8.3, 14*8.3+20*scale/2);
    ctx.restore();
    
    ctx.save();
    ctx.translate(canvas.width/2+21*8.3,19*8.3);
    if (this.machine.inventory.input[0].item.name) ctx.drawImage(texture,160,192,80,64,-40*scale/2,32*scale/2,80*scale/2,64*scale/2);
    ctx.restore();
    
    ctx.save();
    ctx.font = "25px VT323";
    ctx.textAlign = "center";
    if (this.machine.inventory.input[0].item.name) ctx.fillText("Składniki:",canvas.width/2+21*8.3, 19*8.3+40*scale/2);
    for (let i=0;i<this.machine.inventory.input.length;i++) if (this.machine.inventory.input[i].item.name) ctx.fillText(this.machine.inventory.input[i].item.name,canvas.width/2+21*8.3, 19*8.3+40*scale/2+(4*(i+1)*8.3));
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
            case 10: this.page = Math.max(--this.page,0); break;
            case 11: this.page = Math.min(++this.page,Object.keys(this.machine.CraftingList).length-1); break;
            default:
                this.index = this.buttons.indexOf(i)-2;
                this.page = 0;
                this.machine = new StaticButton.machines[this.index]({x:0,y:0},Object.create(StaticButton.dummyGauge),true);
        }
    }
}
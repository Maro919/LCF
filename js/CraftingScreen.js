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
    
    this.machine = 0;
    this.page = 0;
    
    this.hand = undefined;
}

Crafting.prototype.update = function(){
    for (let i of this.buttons) i.active = false;
    this.buttons[this.machine+2].active = true;
}
Crafting.prototype.display = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0,800,600);
    
    //ctx.drawImage(menu,50,50,700,500);
    
    ctx.save();
    
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.scale(8.3,8.3);
    ctx.drawImage(menu,-40,-30);
    
    ctx.restore();
    
    /*
    ctx.font = "30px VT323";
    ctx.fillText("Powrót",160,130);
    */
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
            case 1:
            case 10: this.page--; break;
            case 11: this.pag = Math.max(Math.min(++this.page,),0); break;
            default:
                this.machine = this.buttons.indexOf(i)-2;
                this.page = 0;
        }
    }
}
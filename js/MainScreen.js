function MainScreen() {
    console.log("Created a new MainScreen");
    this.elements = [];
    this.elements.push(new Inventory({
        input: [
            {x: 14+20/6, y: 16, preset: new ItemStack(new Item(80))},
            {x: 14+20/6, y: 24, preset: new ItemStack(new Item(82))},
            {x: 14+20/6, y: 32, preset: new ItemStack(new Item(85))}
        ],
    },true));
    this.hand = undefined;
    hiddenScreen = new Crafting(true);
}

MainScreen.prototype.update = function(){
}
MainScreen.prototype.display = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0;i<canvas.width/800;i++) ctx.drawImage(background,i*800,0,800,600);
    
    ctx.save();
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.scale(8.3,8.3);
    ctx.drawImage(menu,-40,-30);
    ctx.restore();
    
    ctx.save();
    ctx.translate(canvas.width/2-400,0);
    
    ctx.font = "30px VT323";
    ctx.fillText("Graj",170, 130);
    ctx.fillText("Instrukcje",170, 177);
    ctx.fillText(experimental?"Okno standardowe":"Okno skalowane",170, 224);
        
    if (localStorage.score){
        ctx.save();
        ctx.drawImage(texture,0,192,64,64,20+18*scale,41*scale,64*scale/2,64*scale/2);
        ctx.textAlign = "center";
        ctx.fillText("Gratulacje!",20+34*scale, 300);
        ctx.fillText("Twój wynik to: ",20+34*scale,330);
        ctx.fillText(localStorage.score,20+34*scale,390);
        ctx.restore();
    }
    
    ctx.fillText("Jesteś więźniem i",450, 120);
    ctx.fillText("odpracowujesz swoje",450, 170);
    ctx.fillText("winy w fabryce",450, 220);
    ctx.fillText("Armat Świetlnych.",450, 270);
    ctx.fillText("Twoim zadaniem jest",450, 320);
    ctx.fillText("w jak najkrótszym",450, 370);
    ctx.fillText("czasie wyprodukowanie",450, 420);
    ctx.fillText("armaty świetlnej.",450, 470);

    ctx.save();
    for(let e of this.elements) {
        e.display();
    }
    ctx.restore();
    
    ctx.restore();
}
MainScreen.prototype.onScroll = function(e){

}
MainScreen.prototype.onClick = function(e){
    //console.log(e);
    e.x += 400-canvas.width/2;
    for (var i in this.elements){
        e.x = Math.floor(e.x/scale);
        e.y = Math.floor(e.y/scale);
        //console.log(e);
        var tmp = this.elements[i].onClick(e);
        //console.log(tmp[0]);
        switch(tmp[0]){
            case 0:
                screen = new GameScreen();
                break;
            case 1:
                tmpScreen = hiddenScreen;
                hiddenScreen = screen;
                screen = tmpScreen;
                break;
            case 2:
                console.log("2");
                experimental = ! experimental;
                break;
            default:
                console.log("test");
        }
    }
}

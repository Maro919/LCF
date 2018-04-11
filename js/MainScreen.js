function MainScreen() {
    console.log("Created a new MainScreen");
    this.elements = [];
    this.elements.push(new Inventory({
        input: [{x: 14, y: 16, preset: new ItemStack(new Item(80))},{x: 14, y: 30, preset: new ItemStack(new Item(82))}],
    },true));
    this.hand = undefined;
    hiddenScreen = new Crafting();
}

MainScreen.prototype.update = function(){
}
MainScreen.prototype.display = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0,800,600);
    ctx.drawImage(menu,50,50,700,500);
    ctx.font = "30px VT323";
    ctx.fillText("Graj",150, 130);
    ctx.fillText("Instrukcje",150, 215);
        
    if (localStorage.score){
        ctx.save();
        ctx.drawImage(texture,0,192,64,64,18*scale,41*scale,64*scale/2,64*scale/2);
        ctx.textAlign = "center";
        ctx.fillText("Gratulacje!",210, 300);
        ctx.fillText("Twój wynik to: ",210,330);
        ctx.fillText(localStorage.score,210,390);
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
    ctx.translate(this.position,0);
    for(let e of this.elements) {
        e.display();
    }
    ctx.restore();
}
MainScreen.prototype.onScroll = function(e){

}
MainScreen.prototype.onClick = function(e){
    //console.log(e);
    for (var i in this.elements){
        e.x = Math.floor(e.x/scale);
        e.y = Math.floor(e.y/scale);
        console.log(e);
        var tmp = this.elements[i].onClick(e);
        console.log(tmp[0]);
        switch(tmp[0]){
            case 0:
                screen = new GameScreen();
                break;
            case 1:
                tmpScreen = hiddenScreen;
                hiddenScreen = screen;
                screen = tmpScreen;
                break;
            default:
                console.log("test");
        }
    }
}
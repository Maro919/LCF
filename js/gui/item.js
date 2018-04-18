function Item(_id) {
    this.id = _id;
    this.name = Item.prototype.names[_id];
    this.display = function(_x,_y) {
        ctx.save();
        ctx.translate(scale*_x,scale*_y);
        ctx.drawImage(texture,this.id%16*32,Math.floor(this.id/16)*32,32,32,0,0,scale*8,scale*8);
        ctx.restore();
    }
}
Item.prototype.names = [
    "Regulator CMYK",
    "Induktor Światła",
    "Kondensator Fotonów",
    "Kontroler Dystrybucji",
    "Reaktor Błyskowy",
    "Stabilizator Promienia",
    "Wykrywacz Celów",
    "Armata Świetlna",
    "Kryształ Górski",
    "Fragmenty Kryształu",
    "Uran",
    "Fragment Uranu",
    "Przekaźnik Światła",
    "Stalowa Płytka",
    "Ogniwo Zasilające",
    "Węgiel"
];
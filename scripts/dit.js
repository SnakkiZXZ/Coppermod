const Eff = require("EffectsLib");

const d = extendContent(Wall, "dit", {
    
    update(tile){
        
        if(tile.entity.health < tile.entity.maxHealth()){
            
            tile.entity.heal();
            
            Effects.effect(Fx.healBlock, Pal.heal, tile.drawx(), tile.drawy(), this.size);
            
        }
        
    },
    
    /*draw(tile){
        
        this.super$draw(tile);
        
        green = new Color();
        
        Draw.color(green.set(Color(0.0, 1.0, 0.0, Mathf.absin(Time.time(), 9, 1.5))));
        
        Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());
        
        Draw.reset();
        
    },*/
    
});
d.update = true
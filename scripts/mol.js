const Eff = require("EffectsLib")

const m = extendContent(Block, "mol", {
    
    update(tile){
        
        x = tile.drawx()
        
        y = tile.drawy()
        
        core = Vars.state.teams.closestCore(x, y, tile.getTeam())
        
        coreBlock = Vars.world.tileWorld(core.getX(), core.getY())
        
        for(i = 0; i < Vars.content.items().size; i++){
            
            item = Vars.content.items().get(i)
            
            if(core.items.get(item) < 1000000000){
            
                core.items.add(item, 1)
            
            }
            
        }
        
    }
    
});

m.update = true;
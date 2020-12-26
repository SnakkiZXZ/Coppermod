//const Eff = require("EffectsLib")
const dial = require("diaL");

const m = extendContent(Block, "mol", {})

m.buildType = () => extend(Building, {
    _item: null,
    
    update(){
        
        var x = this.x
        var y = this.y
        
        var core = Vars.state.teams.closestCore(x, y, this.team)
        
        if(core != null && this != null){
            
        var coreBlock = Vars.world.tileWorld(core.x, core.y);
        for(var i = 0; i < Vars.content.items().size; i++){
            
            var item = Vars.content.items().get(i)
            
            if(core.items.get(item) < 100000000){
            
                core.items.add(item, 1);
            
            }
            
           };
        };
        
    },
    kill(){},
    placed(){
        
        this.super$placed();
        
    },
    buildConfiguration(table){
        
        var text = new TextField(0);
        
        table.button(Icon.editor, 36, run(() => {
            
            if(Vars.state.rules.infiniteResources){
                
                Vars.state.rules.infiniteResources = false
                
            }
            else{
                
                Vars.state.rules.infiniteResources = true
                
            };
            
        })).size(60);
        
        table.button(Icon.add, 36, run(() => {
            
            
            
        })).size(60);
        
        
    },
    
});

m.update = true;
m.configurable = true;
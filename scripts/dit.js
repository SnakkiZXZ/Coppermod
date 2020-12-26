//const Eff = require("EffectsLib");

const d = extendContent(Wall, "dit", {
    
    setStats(){
        
    this.super$setStats();
    this.stats.remove(Stat.health);
    this.stats.add(Stat.health, "∞", "");
    
  }
    
});
d.update = true;
d.insulated = true;
d.absorbLasers = true;
d.buildType = () => extendContent(Wall.WallBuild, d, {
    
    /*update(){
        
        if(this.health < this.maxHealth){
            
            this.heal()
            
        }
        
    },*/
    damage(amount){
        if(this.team != Team.sharded && Vars.state.isCampaign()){
            
            this.super$damage(amount);
            
        };
    },
    kill(){
        if(this.team != Team.sharded && Vars.state.isCampaign()){
            
            this.super$kill();
            
        };
    },
    killed(){
        if(this.team != Team.sharded && Vars.state.isCampaign()){
            
            this.super$killed();
            
        };
    },
    
}) 
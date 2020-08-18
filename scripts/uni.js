//var unit

const point = newEffect(30, e => {
    
    Draw.color(Pal.accent);
    Draw.alpha(e.fslope())
    
    Draw.rect(Core.atlas.find("[#624200]copper-uni-point"), e.x, e.y);
    
})

const m = extendContent(Block, "uni", {
    
    addButtonTeam(i, table, tile){
        
    
    table.addImageButton(new TextureRegionDrawable(Core.atlas.find(this.name + "-" + i)), 
    Styles.clearFulli, run(() => {
        
        tile.setTeam(Team.base()[i]);
    	Vars.player.setTeam(Team.base()[i])
    	
    })).size(40);
    
        
        
    },
    
    addButtonUnit(b, table, tile){
        
        //style = Styles.clearToggleTransi;
        
        //style.imageUp = new TextureRegionDrawable(Vars.content.units().get(b).icon(Cicon.small));
        
        //style = new ImageButtonStyle(null, null, null, new TextureRegionDrawable(Vars.content.units().get(b).icon(Cicon.small)), null, null)
        
        //button = table.addImageButton(Tex.whiteui, Styles.clearToggleTransi, 1, run(() => {
        
        button = table.addImageButton(new TextureRegionDrawable(Vars.content.units().get(b).icon(Cicon.small)), Styles.clearFulli, 26, run(() => {
        
        contentUnit = Vars.content.units().get(b);
        
        unit = contentUnit.create(tile.getTeam());
        unit.set(this.spawnX, this.spawnY);
        unit.add();
    	
    })).size(40);
    
    //button.setStyle(style)
    
    //button.setStyle(style)
    
    //button.getStyle(). = new TextureRegionDrawable(Vars.content.units().get(b).icon(Cicon.small))
    
    //button.getStyle().imageUp = new TextureRegionDrawable(Vars.content.units().get(b).icon(Cicon.small))
        
    },
    
    addButtonControl(v, table, tile){
        
        table.addImageButton(new TextureRegionDrawable(Core.atlas.find(this.name + "-arroy-" + v)), 
    Styles.clearFulli, run(() => {
        
        this.spawnX += this.spawnAddX[v];
        
        this.spawnY += this.spawnAddY[v]
    	
    })).size(40);
        
    },
    
    
    //button add
    buildConfiguration(tile, table) {
        
        //Team
        for(i = 0; i < Team.base().length; i++){
            
            this.addButtonTeam(i, table, tile)
            
        };
     
    table.row();
    
     //unit
        for(b = 0; b < Vars.content.units().size; b++){
        
        this.addButtonUnit(b, table, tile);
        
        if(b % 6 == 5){
            
            table.row()
            
        }
        
        };
        
    table.row();
    
    //control
        for(v = 0; v < this.spawnAddX.length; v++){
            
            this.addButtonControl(v, table, tile);
            
        }
        
    //add clear unit
    table.addImageButton(new TextureRegionDrawable(Core.atlas.find("error")), 
    Styles.clearFulli, 23, run(() => {
        
        unit = Units.all(cons(Unit => {
            
            Unit.kill()
            
        }))
    	
    })).size(40);
        
    //print(this.spawnX)
        
        
        /*ItemSelection.buildTable(table, Vars.content.units(), Prov(() => unit), cons(item => {
            
            print(item)
            unit = item.create(tile.getTeam());
        unit.set(tile.drawx(), tile.drawy()); 
        unit.add();
            
        }))
        
        //this good work
        
        */
        

    },
    placed(tile){
        
        /*for(i = 0; i < Vars.content.units().size; i++){
        
    print(Vars.content.units().get(i))
    
        };*/
        
        this.super$placed(tile);
        
        this.spawnX = tile.drawx();
        this.spawnY = tile.drawy();
    
    },
    init(){
        
        this.super$init();
        
        this.spawnX = 0;
        this.spawnY = 0;
        
        this.spawnAddX = [0, 8, 0, -8];
        
        this.spawnAddY = [8, 0, -8, 0]
        
    },
    
    update(tile){
        
        if(tile.entity.timer.get(30)){
        
        Effects.effect(point, this.spawnX, this.spawnY)
        
        }
        
    }
    
});
m.update = true;
m.configurable = true;
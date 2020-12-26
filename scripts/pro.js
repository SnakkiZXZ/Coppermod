const dia = require("diaL");
var mTeamGroup = [];
const playerBust = new StatusEffect("eeeeee");
const effectRadius = new Effect(90, e => {
    
    Draw.color(e.color, Color.white, e.fin());
    
    Lines.stroke(3.2 * e.fout());
    Lines.circle(e.x, e.y, e.rotation);
    
});

const p = extendContent(Block, "pro", {
    
    init(){
        this.super$init();
        mTeamGroup = Team.all;
    }
    
});

p.update = true;
p.targetable = false;
p.solid = false;
//p.configurable = true;
//p.layer = Layer.power;
p.buildType = () => extend(Building, {
    radius: 0,
    range: 100,
    bust: 1,
    pRealB: 1,
    pDamgB: 1,
    healting: true,
    pHeal: false,
    busting: false,
    shelded: false,
    uHeal: false,
    uDamaged: false,
    heat: 0,
    _team: Team.crux,
    
    write(write){
        this.super$write(write);
        
        /*write.s(this.range);
        write.s(this.bust);
        write.s(this.healting ? 1:0);
        write.s(this.busting ? 1:0);
        write.s(this.shelded ? 1:0);
        write.s(this.pHeal ? 1:0);
        write.s(this.uHeal ? 1:0);
        write.s(this.uDamaged ? 1:0);*/
        write.f(this.range);
        write.f(this.bust);
        write.f(this.pRealB);
        write.f(this.pDamgB);
        write.bool(this.healting);
        write.bool(this.busting);
        write.bool(this.shelded);
        write.bool(this.pHeal);
        write.bool(this.uHeal);
        write.bool(this.uDamaged);
        write.s(this._team.id)
        
    },
    
    read(read, revision){
        this.super$read(read, revision);
        /*this.range = read.s();
        this.bust = read.s();
        this.healting = read.s() == 1 ? true : false;
        this.busting = read.s() == 1 ? true : false;
        this.shelded = read.s() == 1 ? true : false;
        this.pHeal = read.s() == 1 ? true : false;
        this.uHeal = read.s() == 1 ? true : false;
        this.uDamaged = read.s() == 1 ? true : false;*/
        //this.bust = arr[1];
        
        this.range = read.f();
        this.bust = read.f();
        this.pRealB = read.f();
        this.pDamgB = read.f();
        this.healting = read.bool();
        this.busting = read.bool();
        this.shelded = read.bool();
        this.pHeal = read.bool();
        this.uHeal = read.bool();
        this.uDamaged = read.bool();
        this._team = Team.get(read.s());
        
    },
    
    /*
    read(Reads read, byte revision){
            super.read(read, revision);
            outputItem = content.item(read.s());
    */
    
    mTeamButtonAdd(table, b){
        
        table.button(cons(bat => {
                
				bat.left();
				bat.image(new TextureRegionDrawable(Core.atlas.find("[#624200]copper-saw-picker"))).size(40).pad(2).color(mTeamGroup[b].color);
				
			}), run(() => {
				
				this._team = mTeamGroup[b];
				
			})).pad(2);
			
			if(b % 3 == 2){
			    
			    table.row();
			    
			};
        
    },
    
    /*buildConfiguration(table) {
        table.button(new TextureRegionDrawable(Core.atlas.find("error")), 
    Styles.clearFulli, 26, run(() => {
        
        this.tapped()
    	
    })).size(40);
    },*/
    
    loaded(){
        
        
        
    },
    
    /*controlBut(table){
        
        table.button(new TextureRegionDrawable(Core.atlas.find("[#624200]copper-uni-arroy-1")), Styles.clearToggleTransi, 36, run(() => {
        
        this.triger++
    	
    })).size(70);
    
    table.button(new TextureRegionDrawable(Core.atlas.find("[#624200]copper-uni-arroy-3")), Styles.clearToggleTransi, 36, run(() => {
        
        this.triger--
    	
    })).size(70);
        
    },*/
    
    tapped(){
        
        const dialog = new BaseDialog("Меню");
        dialog.setFillParent(false);
        
        const tabler = new Table();
        const checkA = new CheckBox("Ремонтный проектор")
        checkA.checked = this.healting;
        const checkB = new CheckBox("Ускоряющий проектор");
        checkB.checked = this.busting;
        const checkC = new CheckBox("Щитовой проектор");
        checkC.checked = this.shelded;
        const checkP = new CheckBox("Авторемонт игрока");
        checkP.checked = this.pHeal;
        const checkU = new CheckBox("Авторемонт юнитов");
        checkU.checked = this.uHeal;
        const checkUD = new CheckBox("Уничтожение юнитов");
        checkUD.checked = this.uDamaged;
        //const checkG = new CheckBox("Бесконечные ресурсы")
        //checkG.checked = Vars.state.rules.infiniteResources
        const textt = new TextField(this.range);
        const texth = new TextField(this.bust);
        const textpd = new TextField(this.pDamgB);
        const textpr = new TextField(this.pRealB);
        
        tabler.pane(cons(table => {
            
            //table settings
                
            table.add(new Label("Радиус действия")).left;
            dia.textFilder(table, textt, 9999).fillX();
            
            table.row();
            
            table.add(new Label("Множитель ускорения")).left;
            dia.textFilder(table, texth, 9999).fillX();
                
            table.row();
            table.add(checkA).colspan(2).left;
                
            table.row();
            table.add(checkB).colspan(2).left;
                
            table.row();
            table.add(checkC).colspan(2).left;
            
            //player settings  ///////////////////////////
            dia.title(table, "игрок и юниты", 2);
            table.row();
            table.add(new Label("множитель урона")).left;
            dia.textFilder(table, textpd, 9999).fillX();
            table.row();
            table.add(new Label("Множитель перезарядки")).left;
            dia.textFilder(table, textpr, 9999).fillX();
            table.row();
            
            table.add(checkP).colspan(2).left;
            table.row();
            table.add(checkU).colspan(2).left;
            table.row();
            table.add(checkUD).colspan(2).padBottom(10).left;
            table.row();
            
            table.pane(cons(tabl => {
                
                for(var c = 0; c < mTeamGroup.length; c++){
                    
                    this.mTeamButtonAdd(tabl, c)
                    
                };
                
            })).maxHeight(140).maxWidth(300).colspan(2).expandX();
            
            //table.row();
            //table.add(checkG).colspan(2).left;
            //end table
        
        })).maxHeight(600).maxWidth(500).minHeight(300);
        
        //dialog.<table/cont>.image().width(4).fillX().center();
        
        
        //dialog settings
        
        dialog.cont.add(tabler)
        dialog.cont.row();
        dialog.buttons.button("закрыть", run(() => {
            
            this.range = textt.getText();
            this.bust = texth.getText();
            this.pDamgB = textpd.getText();
            this.pRealB = textpr.getText();
            this.healting = checkA.isChecked();
            this.busting = checkB.isChecked();
            this.shelded = checkC.isChecked();
            this.pHeal = checkP.isChecked();
            this.uHeal = checkU.isChecked();
            this.uDamaged = checkUD.isChecked();
            //Vars.state.rules.infiniteResources = checkG.isChecked();
            
            effectRadius.at(this.x, this.y, this.range, this.team.color);
            
            dialog.hide();
         
        })).width(125);
        
    dialog.show();
        
    },
    
    /*placed(){
        
        this.super$placed();
        
    },*/
    
    update(){
        
        if(this.healting && this.radius > 0){
            
            Vars.indexer.eachBlock(this, this.radius, boolf(other => other.damaged()), cons(other => {
                    other.heal();
                    Fx.healBlockFull.at(other.x, other.y, other.block.size, Pal.heal);
                }));
            
        };
        
        if(this.busting && this.radius > 0){
            
            Vars.indexer.eachBlock(this, this.radius, boolf(other => true), cons(other => {
                
                other.applyBoost(this.bust, 10);
                
            }));
            
        };
        
        if(this.shelded && this.radius > 0){
            
            Groups.bullet.intersect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2, cons(bullet => {
                
                if(Mathf.within(bullet.x, bullet.y, this.x, this.y, this.radius) && bullet.team != this.team){
                    
                    Fx.absorb.at(bullet.x, bullet.y);
                    this.heat = 1;
                    bullet.absorb();
                    
                }
                
            }));
            
        };
        //heal player
        if(this.pHeal && Vars.player.unit().team == this.team){
            
            Vars.player.unit().heal()
            
        };
        //heal units
        if(this.uHeal){
            
            Groups.unit.each(boolf(unit => unit.team == this.team), cons(unit => unit.heal()))
            
        };
        //damage units
        if(this.uDamaged){
            
            Groups.unit.each(boolf(unit => unit.team == this._team), cons(unit => unit.kill()))
            
        };
        //player busting
        playerBust.damageMultiplier = this.pDamgB;
        playerBust.reloadMultiplier = this.pRealB;
        playerBust.permanent = true;
        if(this.pDamgB > 1 && Vars.player.unit() != null || this.pRealB > 1 && Vars.player.unit() != null){
            
            var player = Vars.player.unit();
            if(player.team == this.team){
                
                player.apply(playerBust, 5);
                
            }
            
        };
        
        //heating
        if(this.heat > 0){
            
            this.heat -= 0.03
            
        }
        else if(this.heat < 0){
            
            this.heat = 0
            
        };
        
        //radius change range
        this.radius = Mathf.lerpDelta(this.radius, this.range, 0.1);
        
    },
    
    draw(){
        
        this.super$draw();
        
        var color = this.team.color
        
        if(Core.settings.getBool("animatedshields") && this.radius > 0 && this.shelded){
            
            Draw.z(Layer.shields);
            Draw.color(color.cpy().set(Math.max(color.r, this.heat), Math.max(color.g, this.heat), Math.max(color.b, this.heat), 1));
            
            Fill.circle(this.x, this.y, this.radius);
            Draw.color();
            
        }
        else if(this.radius > 0 && this.shelded){
            
            Draw.color(color.cpy().set(Math.max(color.r, this.heat), Math.max(color.g, this.heat), Math.max(color.b, this.heat), 1));
            
            Draw.alpha(0.5);
            Fill.circle(this.x, this.y, this.radius);
            
            Draw.color(color.cpy().set(Math.max(color.r, this.heat), Math.max(color.g, this.heat), Math.max(color.b, this.heat), 1));
            
            Lines.stroke(2);
            Lines.circle(this.x, this.y, this.radius);
            Draw.color();
            
        };
        
    },
    drawLayer(){
        
        Draw.color(this.team.color);
        Draw.rect(Core.atlas.find("[#624200]copper-dit-top"), this.x, this.y);
        Draw.color();
        
    }
});
p.layer = Layer.power;
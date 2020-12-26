module.exports = {
    
    title(d, text, i){
        d.row();
        d.add(text).color(Pal.accent).padBottom(6).expandX().colspan(i);
        d.row();
        d.image().color(Pal.accent).expandX().height(3).fillX().colspan(i);
        d.row();
        
    },
    
    textFilder(table, text, ower){
        
        return table.add(text).update(cons(a => {if(a.getText() > ower){a.setText(ower)}})).addInputDialog();
        
    },
    
    plasmaTrailBullet(damage, speed){
        const sBullet = extend(BasicBulletType, {
            
        effect(b, lif, data){
            
            var tral = this.traill
            
            return new Effect(lif, e => {
            
            data.draw(e.color, 2);
            if(!Vars.state.isPaused()){
                data.length = tral;
                data.update(e.x, e.y);
            }
                
            });
            
        },
        
        draw(b){
            
            Draw.z(Layer.bullet);
            Tmp.c1.set(this.color);
            Draw.color(Tmp.c1);
            
            var rot = 360 * b.fin() * this.spinSpeed;
            
            for(var i = 0; i < this.colcost; i++){
                Drawf.tri(b.x, b.y, this.size, this.size, b.rotation() + rot - (360 / this.colcost * i));
            };
            

            
        },
        update(b){
            if(b.data == null){
                b.data = EffectState.create();
                b.data.effect = this.effect(b, 60, new Trail(1));
                b.data.set(b.x, b.y);
                b.data.time = 0;
                b.data.lifetime = 20;
                b.data.color.set(this.color);
                b.data.add();
            }
            this.super$update(b);
            Tmp.v1.trns(b.rotation(), 0, 0);
            b.data.set(b.x + Tmp.v1.x, b.y + Tmp.v1.y);
            b.data.time = 0;
            
            //b.data.length = 9;
            //b.data.update(Tmp.v1.x + b.x, Tmp.v1.y + b.y);
            
        },
        
        despawn(b){
            
            b.data = null;
            
            this.super$despawn(b);
        },
        /*hit(b){
            
            b.data = null;
            
            this.super$hit(b);
        },*/
    
        });
        sBullet.lifetime = 80;
        sBullet.speed = speed;
        sBullet.damage = damage;
        sBullet.pierce = true;
        
        sBullet.size = 6;
        sBullet.spinSpeed = 1;
        sBullet.colcost = 4;
        sBullet.color = Pal.accent;
        sBullet.traill = 8;
        
        sBullet.homingPower = 0.2;
        sBullet.weaveScale = 3;
        sBullet.weaveMag = 2;
        
        return sBullet;
    },
    
    getMultiblockTiles(entity, xc, yc, block){
        
        var count = 0;
        var tsize = Vars.tilesize;
        var bsize = entity.block.size;
        
        var x = entity.x + (tsize * ((bsize / 2 - 0.5 * (xc == 0 ? 0 : 1)) + Math.abs(xc)) * (xc >= 0 ? 1 : -1));
        var y = entity.y + (tsize * ((bsize / 2 - 0.5 * (yc == 0 ? 0 : 1)) + Math.abs(yc)) * (yc >= 0 ? 1 : -1));
        var tile = Vars.world.tileWorld(x, y);
        
        if(tile != null && block != null){
            return tile.block() == block
        }
        return false;
        
    },
    
}
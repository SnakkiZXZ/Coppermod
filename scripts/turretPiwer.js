const EffLib = require("EffectsLib")

const colors = [Pal.meltdownHit.cpy().mul(1, 0.6, 0.6, 0.4), Pal.meltdownHit, Color.red];
const tscales = [1, 0.7, 0.5, 0.2];
const lenscales = [1, 1.1, 1.13, 1.14];
const length = 210;

const redLancer  = extendContent(ChargeTurret, "turretPiwer", {
});

//bullet
const redLancerLaser = extend(BasicBulletType, {
    
    draw(b){
        
        var f = Mathf.curve(b.fin(), 0, 0.2);
        var baseLen = length * f;

                Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
                for(s = 0; s < 3; s++){
                    Draw.color(colors[s]);
                    for(i = 0; i < tscales.length; i++){
                        Lines.stroke(7 * b.fout() * (s == 0 ? 1.5 : s == 1 ? 1 : 0.3) * tscales[i]);
                        Lines.lineAngle(b.x, b.y, b.rot(), baseLen * lenscales[i]);
                    }
                }
                Draw.reset();
        
    },
    
    update(b){
        
        if(b.timer.get(18)){
            
        Damage.collideLine(b, b.getTeam(), Fx.lava, b.x, b.y, b.rot(), length);
        
        }
        
    },
    
});
redLancerLaser.lifetime = 17;
redLancerLaser.speed = 0.1;
redLancerLaser.damage = 155;
redLancerLaser.pierce = true;


//extend redLancer
redLancer.shootType = redLancerLaser
redLancer.chargeEffect = EffLib.charge(Pal.meltdownHit, 30)
redLancer.smokeEffect = EffLib.shoot(Pal.meltdownHit, Color.red, 15, 10)
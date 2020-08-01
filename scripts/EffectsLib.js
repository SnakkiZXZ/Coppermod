

module.exports = {	

    //new effect
    charge(color, size){
        
        return newEffect(38, e => {
    
    Draw.color(color);

        Angles.randLenVectors(e.id, 2, 1 + size * e.fout(), e.rotation, 120, Floatc2((x, y) => {
            
            Lines.lineAngle(e.x+x, e.y+y, Mathf.angle(x, y), 4);
            
        }))
    
    Fill.circle(e.x, e.y, 3*e.fin())
    
    })
        
    },
    
    //new effect
    shoot(color1, color2, size, int){
        
        return newEffect(15, e => {
        
        Draw.color(color1, color2, e.fin());
        
        Angles.randLenVectors(e.id, int, 1 + size * e.finpow(), e.rotation, 20, Floatc2((x, y) => {
            
            Lines.lineAngle(e.x+x, e.y+y, Mathf.angle(x, y), 3 + 2 * e.fout());
            
        }));
        
        })
        
    },

}

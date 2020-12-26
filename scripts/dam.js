//var unit
const m = extendContent(MessageBlock, "dam", {
});
m.update = true;

m.buildType = prov(() => extendContent(MessageBlock.MessageBuild, m, {
    tabl: new Table(),
    
    damage(amount){
        
        this.massage.setText(amount);
        
    },
    placed(){
        this.super$placed();
        
        var table = this.tabl;
        table.right;
        table.top;
        //var pos = Core.input.mouseScreen(this.x, this.y - m.size * Vars.tilesize / 2 - 1);
        //table.setPosition(this.x-8, this.y, Align.top);
        //table.drawBackground(this.x, this.y);
        //table.hit(this.x, this.y, true);
        table.button("5555555557777777444333322456", run(() => {
            
            table.x = this.x
            table.y = this.y
            
        })).size(50);
        Vars.ui.hudGroup.addChild(table);
        
        
    },
}));
m.configurable = true;
//const Eff = require("EffectsLib");

const s = extendContent(Block, "scTester", {
});
s.update = true
s.buildType = () => extend(Building, {
    text: "",
    check: true,
    
    tapped(){
        
        const dialog = new BaseDialog("Меню");
        dialog.setFillParent(false);
        
        
        const tabler = new Table();
        const textArea = new TextArea(this.text)
        const check = new CheckBox("kill this block")
        
        tabler.pane(cons(table => {
            
            tabler.add(textArea).size(460, 650);
            tabler.row();
            tabler.add(check);
            
        })).maxHeight(700).maxWidth(500)
        
        dialog.cont.add(tabler)
        
        dialog.buttons.button("закрыть", run(() => {
            
            this.text = textArea.getText()
            if(check.isChecked()){
                
                this.kill()
                
            }
            
            this.check = true
            
            dialog.hide();
         
        })).width(125);
        
    dialog.show();
        
    },
    
    draw(){
        
        try{
            
        this.super$draw();
        
        Draw.z(Layer.shields);
        /*Draw.color(this.team.color);
        
        if(Core.settings.getBool("animatedshields")){
            
            Fill.circle(this.x, this.y, 15);
            
        };*/
            
            eval(this.text)
            
        }
        catch(err){
            Draw.rect(Core.atlas.find("error"), this.x, this.y);
            
            Vars.player.sendMessage(err);
            
            if(this.check){
                
                this.text += "\n\n\n//" + err;
                print(err)
                
                this.check = false;
                
            };
            
        }
    }
    
}) 
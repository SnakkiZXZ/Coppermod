//require("EffectsLib")
require("diaL")
require("mol")
//require("turretPiwer")
require("dit")
require("uni")
require("sct")
require("saw")
require("pro")
require("dam")
//require("pl")

const teamGroup = Team.baseTeams;
const unitGroup = Vars.content.units();

function teamCounter(table, b, con, player){
        
        table.button(new TextureRegionDrawable(Core.atlas.find("[#624200]copper-uni-" + b)), /*Styles.clearTogglePartiali,*/ 37, run(() => {
        player.team(teamGroup[b]);
    })).size(60).color(teamGroup[b].color).pad(2);
    
    if(b % con == con - 1){
        table.row();
    };
        
};

function unitCounter(table, b, con, player){
        
        table.button(new TextureRegionDrawable(Core.atlas.find(unitGroup.get(b).icon(Cicon.large))), /*Styles.clearTogglePartiali,*/ 37, run(() => {
        unitGroup.get(b).spawn(player.unit().team, player.x, player.y);
    }));
    if(b % con == con - 1){
        table.row();
    };
};
//table in game
if(!Vars.headless){
    var tab = new Table();
    
Events.on(EventType.ClientLoadEvent, () => {
    let tabl = new Table();
    tab.bottom().left();
    tabl.button(Icon.turret, run(() => {
        
        Vars.control.pause();
        let player = Vars.player
        
        let d = new BaseDialog("меню игрока");
        d.setFillParent(false);
        let tu = new Table();
        
        if(player != null){
            for(let i = 0; i < teamGroup.length; i++){
            
                teamCounter(tu, i, 3, player);
            };
            tu.row();
            tu.pane(cons(table => {
            for(let k = 0; k < unitGroup.size; k++){
                
                unitCounter(table, k, 3, player);
                
            };
            })).maxHeight(160).maxWidth(320).colspan(3);
        };
        d.cont.add(tu);
        d.cont.row();
        d.cont.add(new Label("health")).update(cons(l => l.setText("health:" + Vars.player.unit().health)));
        d.cont.row();
        d.cont.button("закрыть", run(() => {
            Vars.control.resume();
            d.hide();
        }));
        d.cont.button("фантомный игрок", run(() => {
            var fplayer = Player.create();
            fplayer.name = "phantom";
            fplayer.color.set(Color.pink);
            fplayer.add();
            Vars.control.resume();
            d.hide();
        }));
        d.show();
        
    }));
    tab.add(tabl);
    Vars.ui.hudGroup.addChild(tab);
    
});
}
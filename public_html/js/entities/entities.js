// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
            image: "Mario",
            spritewidth: "128",
            spriteheight: "128",
            width: 128,
            height: 128,
            getShape: function(){
                return (new me.Rect(0, 0, 30, 128)).toPolygon();
            }
        }]);
    
        this.renderable.addAnimation("idle", [4]);
        this.renderable.addAnimation("smallWalk", [9, 10, 11, 12, 13, 14], 80);
        
        this.renderable.setCurrentAnimation("idle");
        
        this.body.setVelocity(5, 20);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    
    update: function(delta){
        if(me.input.isKeyPressed("right")){
            this.body.vel.x += this.body.accel.x * me.timer.tick;
//        }else if(me.input.isKeyPressed("left")){
//            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            }else{
            this.body.vel.x = 0;
        }
        
        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        if(this.body.vel.x !== 0){
            if(!this.renderable.isCurrentAnimation("smallWalk"))
                this.renderable.setCurrentAnimation("smallWalk");
        }else{
            this.renderable.setCurrentAnimation("idle");
        }
            this.body.update(delta);
            this._super(me.Entity, "update", [delta]);
            return true;
    },
    
    collideHandler: function(response){
        
    }
    
});

game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xspawn = settings.xSpawn;
        this.yspawn = settings.ySpawn;
    },
    onCollision: function(){
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer(this.xspawn, this.yspawn);
    }
});
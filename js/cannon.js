//炮
	var CANNON_SIZE=[
		null,
		{w: 74, h: 74},
		{w: 74, h: 76},
		{w: 74, h: 76},
		{w: 74, h: 83},
		{w: 74, h: 85},
		{w: 74, h: 90},
		{w: 74, h: 94}
	];
	
	function Cannon(type){
		this.type=type;
		this.x=431;
		this.y=560;
		this.w=CANNON_SIZE[this.type].w;
		this.h=CANNON_SIZE[this.type].h;
		this.cur=0;
		this.rotate=0;
		this.timer=null;
	}
	
	Cannon.prototype.draw=function(gd){
		gd.save();
		
		gd.translate(this.x,this.y);
		gd.rotate(d2a(this.rotate));
		gd.drawImage(JSON['cannon'+this.type],0,this.h*this.cur,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
		
		gd.restore();
	};
	Cannon.prototype.move=function(){
		var _this=this;
		
		clearInterval(this.timer);
		this.timer=setInterval(function(){
			_this.cur++;
			
			if(_this.cur==5){
				clearInterval(_this.timer);
				_this.cur=0;
			}
			
		},100);	
	}
	
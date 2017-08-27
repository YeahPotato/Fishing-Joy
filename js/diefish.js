function Diefish(type){
	this.type=type;
	this.cur=4;
	this.move();
}
	
Diefish.prototype.draw=function(gd){
		gd.save();
		
		gd.translate(this.x,this.y);
		gd.rotate(d2a(this.rotate));
		gd.drawImage(JSON['fish'+this.type],0,this.cur*this.h,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
		
		gd.restore();
	};
	Diefish.prototype.move=function(){
		var _this=this;
		setInterval(function(){
			_this.cur++;
			if(_this.cur==8){
				_this.cur=4;
			}	
		},100);
	};
	
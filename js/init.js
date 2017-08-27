window.onload=function(){
		var oC=document.querySelector('canvas');
		
		var gd=oC.getContext('2d');
		
		//素材载入完成的函数
		function fnSucc(){
			
			var oCannon=new Cannon(5);
			
			//存炮弹
			var bulletArr=[];
			
			//存鱼
			var fishArr=[];
			
			//存死鱼
			var dieFishArr=[];
			
			//保存金币
			var coinArr=[];
			
			setInterval(function(){
				gd.clearRect(0,0,oC.width,oC.height);
				
				//生成鱼
				if(Math.random()<0.08){
					var oF=new Fish(rnd(1,6));
					
					if(Math.random()<0.5){
						oF.x=0;
						oF.y=rnd(100,500);
						oF.rotate=rnd(-45,45);
					}else{
						oF.x=800;
						oF.y=rnd(100,500);
						oF.scale=true;
						oF.rotate=rnd(-135,-225);	
					}
					
					
					fishArr.push(oF);
				}
				
				//画金币
				for(var i=0; i<coinArr.length;i++){
					coinArr[i].draw(gd);
				}
				
				
				
				//画鱼
				for(var i=0; i<fishArr.length;i++){
					fishArr[i].draw(gd);
				}
				
				
				//画炮台
				gd.drawImage(JSON['bottom'],0,0,765,70,6,530,765,70);
				
				//炮弹
				for(var i=0; i<bulletArr.length;i++){
					bulletArr[i].draw(gd);	
				}
				
				//画炮
				oCannon.draw(gd);
				
				
				//画死鱼
				for(var i=0; i<dieFishArr.length;i++){
					dieFishArr[i].draw(gd);
				}
				
				
				//检测是否撞了
				for(var i=0; i<fishArr.length;i++){
					for(var j=0;j<bulletArr.length;j++){
						if(fishArr[i].isIn(bulletArr[j].x,bulletArr[j].y)){
							//删除炮弹
							bulletArr.splice(j,1);
							
							
							//保存鱼的信息
							var type=fishArr[i].type;
							var x=fishArr[i].x;
							var y=fishArr[i].y;
							var rotate=fishArr[i].rotate;
							var w=fishArr[i].w;
							var h=fishArr[i].h;
							//删除鱼
							fishArr.splice(i,1);
							
							
							
							//生成死鱼
							var dieFish=new Diefish(type);
							dieFish.x=x;
							dieFish.y=y;
							dieFish.rotate=rotate;
							dieFish.w=w;
							dieFish.h=h;
							dieFishArr.push(dieFish);
							
							setTimeout(function(){
								dieFishArr.shift();	
							},500);
							
							
							//生成金币
							var coin=new Coin(type);
							coin.x=x;
							coin.y=y;
							
							coinArr.push(coin);
							
							//加金币音效
							var oA=new Audio();
							
							oA.src='snd/coin.wav';
							oA.play();
							
						}
							
					}	
					
				}
				
				//性能优化：
				for(var i=0; i<bulletArr.length;i++){	
					if(bulletArr[i].x<0 || bulletArr[i].x>oC.width || bulletArr[i].y<0 || bulletArr[i].y>oC.height){
						bulletArr.splice(i,1);
						i--;
					}		
				}
				for(var i=0; i<fishArr.length;i++){	
					if(fishArr[i].x<0 || fishArr[i].x>oC.width || fishArr[i].y<0 || fishArr[i].y>oC.height){
						fishArr.splice(i,1);
						i--;
					}		
				}
				
				//console.log(fishArr.length+']['+bulletArr.length);
				
			},30);
			
			
			//加点击事件
			oC.onclick=function(ev){
				
				//加音效
				var oA=new Audio();
				oA.src='snd/cannon.mp3';
				oA.play();
				
				
				var x1=ev.clientX-oC.offsetLeft;
				var y1=ev.clientY-oC.offsetTop;
				var x2=431;
				var y2=560;
				
				var a=x2-x1;
				var b=y2-y1;
				
				var d=Math.atan2(b,a);
				
				oCannon.rotate=a2d(d)-90;
				oCannon.move();
				
				
				//生成炮弹
				var oBullet=new Bullet(oCannon.type);
				oBullet.rotate=a2d(d)-90;
				bulletArr.push(oBullet);
				
			};
			
			
		}
		loadImage(source,fnSucc);
			
	};
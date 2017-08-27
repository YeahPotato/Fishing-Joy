function d2a(n) {
 	 return n / 180 * Math.PI;
}

function a2d(n) {
  	return n / Math.PI * 180;
}

function rnd(n, m) {
  	return parseInt(Math.random() * (m - n) + n);
}

//存所有的对象
var JSON = {}; //{"fish1":oImg,...}

//加载素材函数
function loadImage(arr, fnSucc, fnLoad) {
  	var count = 0;
  	for (var i = 0; i < arr.length; i++) {
    var oImg = new Image();
    (function(index) {
      oImg.onload = function() {
        count++;

        JSON[arr[index]] = this;

        fnLoad && fnLoad(count, arr.length);

        if (count == arr.length) {
          //成功
          fnSucc && fnSucc();
        }
      };
    })(i);
    oImg.src = "img/" + arr[i] + ".png";
  }
}

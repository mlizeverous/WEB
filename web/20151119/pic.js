window.onload = function() {
	var start = 0; // 判断游戏是否开始
	var pics = document.getElementsByClassName("pic"); // 获取所有picture
	var picc = []; // 变换后的pic位置记录
	var total = 0; // 步数统计
		
	document.getElementById("start").onclick = function () {
		var i = 0;
		var classname = "";
		var arr = [];
		start = 1;
		total = 0;
		document.getElementById("num").textContent = "步数："+total; // 重置步数为零
		var s = document.getElementById("start");
		s.textContent = "RESTART!";
		document.getElementById("blank").className = "p15 pic"; // 最后一格确定为空白
		for (k = 0; k < pics.length; k++) {
			arr[k] = k;
		}
		for (var j = 0; j < pics.length-1; j++) { // 随机产生每个图片的新位置
			i = parseInt(Math.random()*arr.length-1,10);
			if (arr[i] < 10) {classname = "p"+"0"+arr[i];}
			else classname = "p"+arr[i];
			pics[j].className = classname +" pic";
			arr.splice(i,1);
		}
		for (var m = 0; m < pics.length; m++) { // 获取每个图片的新位置
			if (m < 10) {
				picc[m] = document.getElementsByClassName("p"+"0"+m)[0];
			}
			else picc[m] = document.getElementsByClassName("p"+m)[0];
		}
		play(start);
	}

	function change(a, b) { // 交换图片位置
		var temp = a.className;
		a.className = b.className;
		b.className = temp;
	}

	function play(start) {
		for (var i = 0; i < pics.length; i++) {

			picc[i].onclick = function (i) {
				if (start == 1){
					return function() { // 如果满足交换位置的条件则交换并步数增加，反之无变化
						var n = this.className;
						n = n.substr(1,2);
						n = parseInt(n,10);
						var a = n+1;
						var b = n-1;
						var c = n+4;
						var d = n-4;
						if (a < 10) var aa = document.getElementsByClassName("p"+"0"+a)[0];
						else var aa = document.getElementsByClassName("p"+a)[0];
						if (b < 10) var bb = document.getElementsByClassName("p"+"0"+b)[0];
						else var bb = document.getElementsByClassName("p"+b)[0];
						if (c < 10) var cc = document.getElementsByClassName("p"+"0"+c)[0];
						else var cc = document.getElementsByClassName("p"+c)[0];
						if (d < 10) var dd = document.getElementsByClassName("p"+"0"+d)[0];
						else var dd = document.getElementsByClassName("p"+d)[0];
						if (a < 16 && a >= 0 && a != 0 && a != 4 && a != 8 && a != 12 && aa.id == "blank") {
							change(picc[n], picc[a]);
							var temp1 = picc[n];
							picc[n] = picc[a];
							picc[a] = temp1;
							delete temp1;
							total++;
							document.getElementById("num").textContent = "步数："+total;
							judgewin();
						} else if (b < 16 && b >= 0 && b!= 3 && b != 7 && b != 11 && bb.id == "blank") {
							change(picc[n], picc[b]);
							var temp2 = picc[n];
							picc[n] = picc[b];
							picc[b] = temp2;
							delete temp2;
							total++;
							document.getElementById("num").textContent = "步数："+total;
							judgewin();
						} else if (c < 16 && c >= 0 && cc.id == "blank") {
							change(picc[n], picc[c]);
							var temp3 = picc[n];
							picc[n] = picc[c];
							picc[c] = temp3;
							delete temp3;
							total++;
							document.getElementById("num").textContent = "步数："+total;
							judgewin();
						} else if (d < 16 && d >= 0 && dd.id == "blank") {
							change(picc[n], picc[d]);
							var temp4 = picc[n];
							picc[n] = picc[d];
							picc[d] = temp4;
							delete temp4;
							total++;
							document.getElementById("num").textContent = "步数："+total;
							judgewin();
						} else {
							return;
						}
				
					};
				}
			}(i);
	
		}
		
	}

    function judgewin() {
    	for (var m = 0; m < pics.length-1; m++) { // 判断胜利
			if (picc[m].id != "pic"+m) {
				break;
			} else if (m == pics.length-2) {
				alert("You Win!");
				total = 0;
				document.getElementById("num").textContent = "步数："+total;
				start = 0;
				return;
			}
		}
    }

	document.getElementById("showpic").onmouseover = function() { // 查看原图
		document.getElementById("the_pic").id = "on";
	}
	document.getElementById("showpic").onmouseleave = function() {
		document.getElementById("on").id = "the_pic";
	}

	document.getElementById("replace").onclick = function() { // 一键恢复
		var classname;
		for (var j = 0; j < picc.length; j++) {
			if (j < 10) {classname = "p"+"0"+j;}
			else classname = "p"+j;
			pics[j].className = classname +" pic";
			picc[j] = pics[j];
		}
		judgewin();
	}
}
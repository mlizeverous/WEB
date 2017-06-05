window.onload = function() {
	var countdown = 30; // 倒计时
	var start = 0; // 记录游戏是否开始
	var now_mole = 0; //是否有地鼠
	var score = 0; // 记录分数
	var moles = document.getElementsByClassName("mole");

	function CountDown() { // 倒计时
		if (start == 1) {
			if (countdown == -1) {
				document.getElementById("gameover").value = "Game Over";
				var str = "Game Over.\nYour score is: " + score;
			    alert(str);
				start = 0;
				countdown = 30;
			} else {
				document.getElementById("timeleft").value = countdown;
				countdown--;
			}
		    setTimeout(function () {CountDown()}, 1000);
		}

	}

	document.getElementById("start_and_stop").onclick = function() {
		if (start == 0) {
			start = 1;
			for (var j = moles.length-1; j >= 0; j--) { // 恢复初始外观重新随机出现地鼠
				moles[i].id = "";
			}
			now_mole = 0;
			if (countdown == 30) {
				score = 0;
				document.getElementById("scoreget").value = score;
				document.getElementById("gameover").value = "Hurry up~";
			}
			CountDown();
			showmole();
		} else {
			start = 0;
		}
	}

	var i = 0;
	function random() {
		i = parseInt(Math.random()*60,10); // 随机产生地鼠
		moles[i].id = "choosen"; // 改变外观

	}
	function showmole() { // 出现地鼠
		if (now_mole == 0 && start == 1) {
			random();
			now_mole = 1;
		}
		for (var j = moles.length-1; j >= 0; j--) {
			moles[j].onclick = function() {
				if (event.target == moles[i] && start == 1) { // 判断是否点中地鼠
					score++;
					moles[i].id = ""; // 改变外观
					now_mole = 0;
					showmole();
				} else if (start == 0) { // 游戏未开始时点击无效
					return;
				} else if (score > 0){ // 分数最小为零
					score--;
				}
				document.getElementById("scoreget").value = score;
			}
		}
	}

}
window.onload = function() {

	var flag = 0; //标记游戏是否在进行中，1为进行中，0为停止状态
	var start = 0; //标记是否经过startarea开始游戏

	function show(message) {
		document.getElementById("reminder").textContent = message;
	}
	function getAllWalls() {
		return document.getElementsByClassName("wall");
	}

	var wall = getAllWalls();
	for (var i = wall.length-1; i >= 0; i--) {
		wall[i].onmouseover = function() {
			if (flag == 1 && start == 1) { // 当经过startarea开始游戏时判断是否触壁
				show("You lose!");
				flag = 0; // 游戏停止
				start = 0;
				this.style.backgroundColor = 'red'; // 墙壁变为红色
			} else {
				return;
			}
		}
	}

	function resetcolor() { // 恢复墙壁颜色
		for (var j = wall.length-1; j >= 0; j--) {
				wall[j].style.backgroundColor = 'rgb(238,238,238)';
			}
	}

	document.getElementById("gamebox").onmouseleave = function() { // 离开迷宫，恢复颜色
			resetcolor();
	}

	document.getElementById("startarea").onmouseover = function() { // 游戏开始
		if (start == 0) {
			start = 1;
			resetcolor();
		}
		if (flag == 0){ // 游戏重新开始，显示清空
			flag = 1;
			show("");
		}
	}
	document.getElementById("endarea").onmouseover = function() {
		if (flag) {
			show("You win!");
			flag = 0;
			start = 0;
		}
	}
	document.getElementById("cheat").onmouseover = function() { // 经过start后从外侧经过end为作弊
		if (start == 1 && flag == 1) {
			show("Don't cheat,you should start from the 'S' and move to the 'E' inside the maze!");
			start = 0;
			flag = 0;
		}
	}

	
}

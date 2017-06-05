window.onload = function() {
	var str = "";
	var flag = 0;

	function judge () { // 判断是否是按过等号之后继续计算
		if (flag == 1) {
			document.getElementById("show").value = 0;
			flag = 0;
			str = "";
		}
	}
	function button (num) {
		str += num;
		document.getElementById("show").value = str;
	}

	document.getElementById("number0").onclick = function() {
		judge();
		button(0);
	}

	document.getElementById("number1").onclick = function() {
		judge();
		button(1);
	}

	document.getElementById("number2").onclick = function() {
		judge();
		button(2);
	}

	document.getElementById("number3").onclick = function() {
		judge();
		button(3);
	}

	document.getElementById("number4").onclick = function() {
		judge();
		button(4);
	}

	document.getElementById("number5").onclick = function() {
		judge();
		button(5);
	}

	document.getElementById("number6").onclick = function() {
		judge();
		button(6);
	}

	document.getElementById("number7").onclick = function() {
		judge();
		button(7);
	}

	document.getElementById("number8").onclick = function() {
		judge();
		button(8);
	}

	document.getElementById("number9").onclick = function() {
		judge();
		button(9);
	}

	document.getElementById("point").onclick = function() {
		judge();

		if (str.charAt(str.length-1) ==".") { // 不可连续输入两个小数点
			return;
		} else {
			str += ".";
			document.getElementById("show").value = str;
		}
	}

	document.getElementById("add").onclick = function() {
		if (flag == 1) { // 可接着上次计算结果计算
			str += "+";
			document.getElementById("show").value = str;
			flag = 0;
			return;
		}
		if (str.charAt(str.length-1) =="(" || str.charAt(str.length-1) ==".") { // 判断非法输入
			alert("Illegal input");
			return;
		} else if (str.charAt(str.length-1) =="-" || str.charAt(str.length-1) =="*"
			|| str.charAt(str.length-1) =="/" || str.charAt(str.length-1) =="+") { // 判断非法输入
			str = str.substring(0,str.length-1);
		}
		str += "+";
		document.getElementById("show").value = str;
	}

	document.getElementById("divide").onclick = function() {
		if (flag == 1) {
			str += "/";
			document.getElementById("show").value = str;
			flag = 0;
			// str = "";
			return;
		}
		if (str.charAt(str.length-1) =="(" || str.charAt(str.length-1) =="." || str.charAt(str.length-1) =="") { // 判断非法输入
			alert("Illegal input");
			return;
		} else if (str.charAt(str.length-1) =="-" || str.charAt(str.length-1) =="*"
			|| str.charAt(str.length-1) =="/" || str.charAt(str.length-1) =="+") { // 判断非法输入
			str = str.substring(0,str.length-1);
		}
		str += "/";
		document.getElementById("show").value = str;
	}

	document.getElementById("multiply").onclick = function() {
		if (flag == 1) {
			str += "*";
			document.getElementById("show").value = str;
			flag = 0;
			// str = "";
			return;
		}
		if (str.charAt(str.length-1) =="(" || str.charAt(str.length-1) =="." || str.charAt(str.length-1) =="") { // 判断非法输入
			alert("Illegal input");
			return;
		} else if (str.charAt(str.length-1) =="-" || str.charAt(str.length-1) =="*"
			|| str.charAt(str.length-1) =="/" || str.charAt(str.length-1) =="+") { // 判断非法输入
			str = str.substring(0,str.length-1);
		}
		str += "*";
		document.getElementById("show").value = str;
	}

	document.getElementById("minus").onclick = function() {
		if (flag == 1) {
			str += "-";
			document.getElementById("show").value = str;
			flag = 0;
			return;
		}
		
		if (str.charAt(str.length-1) =="(" || str.charAt(str.length-1) ==".") { // 判断非法输入
			alert("Illegal input");
			return;
		} else if (str.charAt(str.length-1) =="-" || str.charAt(str.length-1) =="*"
			|| str.charAt(str.length-1) =="/" || str.charAt(str.length-1) =="+") { // 判断非法输入
			str = str.substring(0,str.length-1);
		}
		str += "-";
		document.getElementById("show").value = str;
	}

	document.getElementById("left").onclick = function() {
		judge();
		if (str.charAt(str.length-1) ==")" || str.charAt(str.length-1) ==".") { // 判断非法输入
			alert("Illegal input");
			return;
		} else if (str.charAt(str.length-1) =="-" || str.charAt(str.length-1) =="*" ||
			str.charAt(str.length-1) =="/" || str.charAt(str.length-1) =="+" || str.charAt(str.length-1) =="") { // 判断非法输入
			str += "(";
			document.getElementById("show").value = str;
		} else {
			alert("Illegal input");
			return;
		}
	}

	document.getElementById("right").onclick = function() {
		judge();
		if (str.charAt(str.length-1) =="(" || str.charAt(str.length-1) =="." || str.charAt(str.length-1) =="-"
		    || str.charAt(str.length-1) =="*" || str.charAt(str.length-1) =="/" ||
		    str.charAt(str.length-1) =="+" || str.charAt(str.length-1) =="") { // 判断非法输入
			alert("Illegal input");
			return;
		} else {
			str += ")"
			document.getElementById("show").value = str;
		}
	}

	document.getElementById("CE").onclick = function() {
		str = "";
		document.getElementById("show").value = 0;
	}

	document.getElementById("back").onclick = function() {
		judge();
		str = str.substring(0,str.length-1);
		if (str.length == 0) {
			document.getElementById("show").value = 0;
			return;
		}
		document.getElementById("show").value = str;
	}

	document.getElementById("result").onclick = function() {
		var temp = str;
		flag = 1;
		if (str.charAt(str.length-1) =="-" || str.charAt(str.length-1) =="*"
			|| str.charAt(str.length-1) =="/" || str.charAt(str.length-1) =="+") {
			alert("Illegal input!");
			return;
		}

		if (temp == "") {
			alert("Illegal input!");
			document.getElementById("show").value = 0;
			return;
		}

		if (document.getElementById("show").value == "undefined") {
			alert("Illegal input!");
			document.getElementById("show").value = 0;
			return;
		}

		// 判断左右括号数是否一致
		var left = 0;
		var right = 0;
		for (var i = 0; i < temp.length; i++) {
			if (temp.charAt(i) == "(") {
				left++;
			} else if (temp.charAt(i) == ")") {
				right++;
			}
		}
		if (left != right) {
			alert("Illegal input!");
			return;
		}

		// 判断是否一个数字中有多个小数点
		var points = 0;
		for (var i = 0; i < temp.length; i++) {
			if (temp.charAt(i) == ".") {
				points++;
			}
			if (temp.charAt(i) =="-" || temp.charAt(i) =="*"
			|| temp.charAt(i) =="/" || temp.charAt(i) =="+") {
				if (points > 1) {
					alert("Illegal input!");
					return;
				}
				points = 0;
			}
		}

		// 判断是否有被除数为零，或第一位为乘号除号的情况
		for (var i = 0; i < temp.length; i++) {
			if (temp.charAt(i) == "/" && temp.charAt(i+1) == "0" && temp.charAt(i+2) != ".") {
				alert("Illegal input!");
				return;
			}
			if ((temp.charAt(i) == "/" || temp.charAt(i) == "*") && i == 0) {
				alert("Illegal input!");
				return;
			}
		}
		

		str = eval(str);
		if (str == "Infinity") {
			alert("Illegal input!");
			document.getElementById("show").value = 0;
			return;
		} else if (str == "NaN") {
			alert("Illegal input!");
			document.getElementById("show").value = 0;
			return;
		}
		document.getElementById("show").value = str;
	}
}

var could_select = new Array();
var selected = new Array();
var all = 0;
var big_select = false;
var apb_select = false;
var times = 0;
var sequence = new Array();
for (var i = 0; i < 5; i++) {
	could_select[i] = true;
	selected[i] = false;
};

window.onload = function() {
	hidden();
	initialize();
}



function initialize() {
	var buttons = document.getElementById("control-ring-container").getElementsByTagName("li");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = make_click(buttons[i], buttons, i);
	};
	var big = document.getElementById("info-bar");
	big.onclick = big_click(big);
	document.getElementById("bottom-positioner").onmouseleave=function() {
		hidden();
	};
	document.getElementById("apb").onclick = one_by_one(buttons);
}

function one_by_one (buttons) {
	return function() {
		//console.log(apb_select);
		if (apb_select == true) return;
		else {
			apb_select = true;
			sequence = getArray();
			document.getElementById("sequence").innerHTML = numToabc(sequence);
			//console.log(sequence[0]);
			buttons[sequence[0]].click();
		}
		console.log(apb_select);
	};
}

function getArray() {
	var array = new Array();
	for (var i = 0; i < 5; i++) {
		var success = false;
		while (success == false) {
			success = true;
		    var temp = Math.floor(Math.random()*5);
		    for (var j = 0; j < array.length; j++) {
		    	if (array[j] == temp) {
		    		success = false;
		    		break;
		    	};
		    };
		    if (success == true)
		    	array.push(temp);
	    }
    }
    return array;
}

function hidden() {
	big_select = false;
	apb_select = false;
	times = 0;
	all = 0;
	var buttons = document.getElementById("control-ring-container").getElementsByTagName("li");
    for (var i = 0; i < 5; i++) {
	    could_select[i] = true;
	    selected[i] = false;
	    buttons[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
	    buttons[i].getElementsByTagName("span")[1].style.visibility = "hidden";
    };
    document.getElementsByTagName("p")[0].innerHTML = "";
    document.getElementById("sequence").innerHTML = "";
}

var http = new XMLHttpRequest();

function loadXMLDoc(fun) {
	http.onreadystatechange=fun;
	http.open("GET","/", true);
	http.send();
}

function make_click(button, buttons, index) {
	return function() {
		if (could_select[index] == false)
			return;
		var ballon = button.getElementsByTagName("span")[1];
		ballon.style.visibility = "visible";
		ballon.style.backgroundColor="#F7382E";
		ballon.innerHTML = "...";
		for (var i = 0; i <buttons.length; i++) {
			if (i == index)
				continue;
			buttons[i].style.backgroundColor = "#7E7E7E";
			could_select[i] = false;
		};
		loadXMLDoc( function() {
			if (http.readyState == 4) {
		        for (var i = 0; i < buttons.length; i++) {
		    	    if (index == i) {
		    	    	buttons[i].style.backgroundColor = "#7E7E7E";
		    	    	selected[i] = true;
		    	    	could_select[i] = false;
		    	    } else {
		    	    	if (selected[i] == false) buttons[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
		    	    	if (selected[i] == false) could_select[i] = true;
		    	    }
		        }
		    	var num = http.responseText;
		        ballon.innerHTML = num;
		        all += parseInt(num);
		        if (apb_select == true) {
		        	if (times < 4) {
		        		times++;
		            	buttons[sequence[times]].click();
		        	} else {
		            	var big = document.getElementById("info-bar");
	                	big.click();
                	}
            	}
		    }
		});
	};
}

function big_click(big) {
	return function() {
		if (big_select == true)
			return;
		for (var i = 0; i < 5; ++i) {
			if (selected[i] == false) {
				return;
			}
		}
		context = big.getElementsByTagName("p")[0];
		context.innerHTML = all;
		big_select = true;
	};
}

function numToabc(array) {
	var string = "";
	for (var i = 0; i < 5; i++) {
		if(array[i] == 0) string += "A  ";
		if(array[i] == 1) string += "B  ";
		if(array[i] == 2) string += "C  ";
		if(array[i] == 3) string += "D  ";
		if(array[i] == 4) string += "E  ";
	}
	return string;
}
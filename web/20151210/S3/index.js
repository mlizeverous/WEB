var could_select = new Array();
var selected = new Array();
var all = 0;
var big_select = false;
var apb_select = false;
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
	document.getElementById("apb").onclick = allclick(buttons);
}

function allclick (buttons) {
	return function() {
		if (apb_select == true) return;
		else apb_select = true;
		for (var i = 0; i < buttons.length; i++) {
			var ballon = buttons[i].getElementsByTagName("span")[1];
		    ballon.style.visibility = "visible";
		    ballon.style.backgroundColor="#F7382E";
		    ballon.innerHTML = "...";
		    could_select[i] = false;
		};
		handle(buttons[0], 0, buttons);
	};
}

function handle(button, index, buttons) {
    loadXMLDoc( function() {
	    if (http.readyState == 4) {
	    	var ballon = button.getElementsByTagName('span')[1];
		    button.style.backgroundColor = "#7E7E7E";
		    selected[index] = true;
		    could_select[index] = false;
		    var num = http.responseText;
		    ballon.innerHTML = num;
		    all += parseInt(num);
		    if (index < 4)
		        handle(buttons[index+1], index+1, buttons)
		    else
		    	big = document.getElementById("info-bar").click();
		}
	});
}

function hidden() {
	big_select = false;
	apb_select = false;
	all = 0;
	var buttons = document.getElementById("control-ring-container").getElementsByTagName("li");
    for (var i = 0; i < 5; i++) {
	    could_select[i] = true;
	    selected[i] = false;
	    buttons[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
	    buttons[i].getElementsByTagName("span")[1].style.visibility = "hidden";
    };
    document.getElementsByTagName("p")[0].innerHTML = "";
}

var http = new XMLHttpRequest();

function loadXMLDoc(fun) {
	http.onreadystatechange=fun;
	http.open("GET","/", true);
	http.send();
}

function make_click(button, buttons, index) {
	return function() {
		if (apb_select == false) apb_select = true;
		if (could_select[index] == false)
			return;
		var ballon = button.getElementsByTagName("span")[1];
		ballon.style.visibility = "visible";
		ballon.style.backgroundColor="#F7382E";
		ballon.innerHTML = "...";
		could_select[index] = false;
		for (var i = 0; i <buttons.length; i++) {
			if (i == index)
				continue;
			buttons[i].style.backgroundColor = "#7E7E7E";
			could_select[i] = false;
		};
		loadXMLDoc( function() {
			if (index<4)
		        buttons[index+1].click();
			if (http.readyState == 4) {
		        for (var i = 0; i < buttons.length; i++) {
		    	    if (index == i) {
		    	    	buttons[i].style.backgroundColor = "#7E7E7E";
		    	    	selected[i] = true;
		    	    	could_select[i] = false;
		    	    } else {
		    	    	if (selected[i] == false)
		    	    	    buttons[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
		    	    	if (selected[i] == false)
		    	    		could_select[i] = true;
		    	    }
		        }
		    	var num = http.responseText;
		        ballon.innerHTML = num;
		        all = all+parseInt(num);
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
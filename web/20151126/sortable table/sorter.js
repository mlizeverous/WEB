function top_down(that, arr){ // 顺序排列
	var i = that.index();
	that.children('span').removeClass("down").addClass("top");
	arr.sort(function(a, b) {
		return a.childNodes[i*2+1].textContent>b.childNodes[i*2+1].textContent?1:-1;
	})
}
function down_top(that, arr) { // 倒序排列
	var i = that.index();
	that.children('span').removeClass("top").addClass("down");
	arr.sort(function(a, b) {
		return a.childNodes[i*2+1].textContent<b.childNodes[i*2+1].textContent?1:-1;
	})
}
function change(that, arr) { // 改变顺序
	that.parents("thead").find("th").not(that).removeClass("change").children('span').removeClass().addClass("none");
	that.addClass("change");
	if(that.children('span').hasClass("top")) {
		down_top(that,arr);
   	} else {
       	top_down(that,arr);
   	}
}	

window.onload = function() {
	$("#what,#when,#where,#Firstname,#Lastname,#Latestcheckin").click(function() { // 点击表头触发事件
		var arr = $(this).parents("table").find("tbody tr");
		change($(this),arr);
		$(this).parents("table").children('tbody').empty().append(arr).find("tr").removeClass("alternate");
		$(this).parents("table").find("tbody tr:odd").addClass("alternate");
	})
}
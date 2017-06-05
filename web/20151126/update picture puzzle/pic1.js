var start = 0, step = 0;

function random() { // 随机改变图片位置
	var arr = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14"],i = 0;
	arr.sort(function(a, b) {return Math.random()>.5 ? -1 : 1;});
	$(".pic").each(function() {
		$(this).removeClass().addClass("pic").addClass("p"+arr[i]);
		i++;
	})
	$("#blank").removeClass().addClass("pic").addClass("p15"); // 最后一个为空白
}

function get_position(that) { // 获取某元素的位置
	var position = that.attr("class").toString().substr(5,6);
	position = parseInt(position,10);
	return position;
}

function judge_move(that) { // 判断某图是否可以移动
	var p_blank = get_position($("#blank")), p_that = get_position(that);
	if (p_that+1 == p_blank && p_blank != 4 && p_blank != 8 && p_blank != 12) return 1;
	if (p_that-1 == p_blank && p_blank != 3 && p_blank != 7 && p_blank != 11) return 1;
	if (p_that+4 == p_blank) return 1;
	if (p_that-4 == p_blank) return 1;
}

function move(that, blank) { // 移动图片，与空白格子交换位置
	var str1 = that.attr("class").toString(), str2 = blank.attr("class").toString();
	if (start == 1 && judge_move(that)){
		that.removeClass().addClass(str2);
		blank.removeClass().addClass(str1);
		judge_win();
		$("#num").html("步数："+(++step));
	}
}

function replace() { // 一键恢复
	var arr = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15"], i = 0;
	$(".pic").each(function() {
		$(this).removeClass().addClass("pic").addClass("p"+arr[i]);
		i++;
	})
	judge_win();
}

function judge_win() { // 判断胜利
	var i = 0;
	$(".pic").each(function() {
		if (get_position($(this)) == i) i++;
		else return;
	})
	if (i == 16) {
		alert("YOU WIN !!!");
		start = 0;
		step = 0;
		$("#num").html("步数："+step);
	}
}

window.onload = function() {
	$("#start").click(function(){
		start = 1;
		random();
	});
	$(".pic").click(function() {move($(this),$("#blank"));});
	$("#replace").click(function(){replace();});
	$("#showpic").mouseover(function() {$("#the_pic").attr('id','on');})
	$("#showpic").mouseout(function() {$("#on").attr('id','the_pic');})
}
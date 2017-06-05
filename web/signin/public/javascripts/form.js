window.onload = function() {
	var illegal_name, illegal_num, illegal_tel, illegal_email = 1;
	var illegal_password, illegal_again = 1;
	var name = "",num = "",tel = "",email = "",password = "",again = "";
	$("input[name='username']").blur(function() { // 判断用户名合法性
		name = $("input[name='username']").val();
	if(/^[a-zA-Z]\w{5,17}$/.test(name)) {
		$("#n_valid").html("用户名合法");
		illegal_name = 0;
		} else if (name == "") {
			$("#n_valid").html("用户名不可为空");
			illegal_name = 1;
		} else if (name.match(/\W/)) {
			$("#n_valid").html("用户名只能包括字母，数字和下划线");
			illegal_name = 1;
		} else if (!name[0].match(/[a-zA-Z]/)) {
			$("#n_valid").html("用户名必须以英文字母开头");
			illegal_name = 1;
		} else if (name.length<6 || name.length>18) {
			$("#n_valid").html("用户名长度应在6-18之间");
			illegal_name = 1;
		}
	});
	$("input[name='number']").blur(function() { // 判断学号合法性
		num = $("input[name='number']").val();
	if(/^[1-9]{1}[0-9]{7}$/.test(num)) {
		$("#num_valid").html("学号合法");
		illegal_num = 0;
		} else if (num == "") {
			$("#num_valid").html("学号不能为空");
			illegal_num = 1;
		} else if (num.match(/\D/)) {
			$("#num_valid").html("学号只能为数字");
			illegal_num = 1;
		} else if (num.toString().length != 8) {
			$("#num_valid").html("学号长度只能为8");
			illegal_num = 1;
		} else if (num.toString()[0] == "0") {
			$("#num_valid").html("学号不能以0开头");
			illegal_num = 1;
		}
	});
	$("input[name='tel']").blur(function() { // 判断电话合法性
		tel = $("input[name='tel']").val();
	if(/^[1-9]{1}[0-9]{10}$/.test(tel)) {
		$("#tel_valid").html("合法电话");
		illegal_tel = 0;
		} else if (tel.match(/\D/)) {
			$("#tel_valid").html("电话只能为数字");
			illegal_tel = 1;
		} else if (tel == "") {
			$("#tel_valid").html("电话不能为空");
			illegal_tel = 1;
		} else if (tel.toString()[0] == "0") {
			$("#tel_valid").html("电话不能以0开头");
			illegal_tel = 1;
		} else if (tel.toString().length != 11) {
			$("#tel_valid").html("电话长度只能为11位");
			illegal_tel = 1;
		}
	});
	$("input[name='email']").blur(function() { // 判断邮箱合法性
		email = $("input[name='email']").val();
	if(!(/^[a-z0-9]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i.test(email))) {
		$("#email_valid").html("非法邮箱");
		illegal_email = 1;
		} else {
			illegal_email = 0;
			$("#email_valid").html("合法邮箱");
		}
	});
	$("input[name='password']").blur(function() { // 判断密码合法性
		password = $("input[name='password']").val();
		if (password == "") {
			illegal_password = 1;
			$("#password_valid").html("密码不能为空");
		}
		 else if (!(/^[a-zA-Z][a-zA-Z0-9_\-]{6,12}$/.test(password))) {
			illegal_password = 1;
			$("#password_valid").html("密码为6~12位数字、大小写字母、中划线、下划线");
		}
		if (/^[a-zA-Z0-9][a-zA-Z0-9_\-]{6,12}$/.test(password)) {
			illegal_password = 0;
			$("#password_valid").html("合法密码");
		}
	});
	$("input[name='passwordd']").blur(function() { // 判断两次输入密码是否一致
		again = $("input[name='passwordd']").val();
		if (again == "") {
			illegal_again = 1;
			$("#again_valid").html("请再次输入密码");
		}
		else if (again != password) {
			illegal_again = 1;
			$("#again_valid").html("两次输入密码不一致");
		} else {
			illegal_again = 0;
			$("#again_valid").html("通过");
		}
	});


	$(".upload").click(function() { // 信息完全正确方可提交
		$(".blur").trigger('blur');
		if(illegal_name||illegal_num||illegal_tel||illegal_email||illegal_password||illegal_again) {
			alert("信息未全部正确填写");
			return false;
		} else return true;
	});

	$(".reset").click(function() { // 重置
		$("#n_valid, #email_valid, #tel_valid, #num_valid, #password_valid, #again_valid").html("");
		$("input").not(":button, :submit").val("");
	});
}
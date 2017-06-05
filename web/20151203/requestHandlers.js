var querystring = require("querystring");
var fs = require("fs");

function start(response) { // 注册页面的html
	response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("<!DOCTYPE 'html'>\n");
    response.write("<html>\n");
    response.write("<head>\n");
    response.write("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />\n");
    response.write("<link href='form.css' type='text/css' rel='stylesheet' />\n");
    response.write("<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js' type='text/javascript'></script>");
    response.write("<script type='text/javascript' src='form.js'></script>");
    response.write("<title>Sign-in Page</title>\n");
    response.write("</head>\n");
    response.write("<body>\n");
    response.write("<div id='all'><div id='h1'><h1>用户注册</h1></div>\n");
    response.write("<div id='form'><form method='post' >\n");
    response.write("<div id='name'>用户名：<input type='text' name='username'/></div><div id='n_valid'></div>\n");
    response.write("<div>学号：<input type='text' name='number'/></div><div id='num_valid'></div>\n");
    response.write("<div>电话：<input type='text' name='tel'/></div><div id='tel_valid'></div>\n");
    response.write("<div>邮箱：<input type='text' name='email'/></div><div id='email_valid'></div>\n");
    response.write("<div class='upload'><input type='submit' value='提交' action='http://127.0.0.1:8000/' method='post'/></div>\n");
    response.write("<div class='reset'><input type='button' value='重置' /></div></form></div></div>\n");
    response.write("</body>\n");
    response.write("</html>\n");
    response.end();
}

function details(response,user) { // 用户详情页面的html
	response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("<!DOCTYPE 'html'>\n");
    response.write("<html>\n");
    response.write("<head>\n");
    response.write("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />\n");
    response.write("<link href='form.css' type='text/css' rel='stylesheet' />\n");
    response.write("<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js' type='text/javascript'></script>");
    response.write("<script type='text/javascript' src='form.js'></script>");
    response.write("<title>Details Page</title>\n");
    response.write("</head>\n");
    response.write("<body>\n");
    response.write("<div id='all'><div id='h1'><h1>用户详情</h1></div>\n");
    response.write("<div id='detail'><form method='post' action='http:/localhost:8000'>\n");
    response.write("<div id='name'>用户名："+user.username+"</div>\n");
    response.write("<div>学号："+user.number+"</div>\n");
    response.write("<div>电话："+user.tel+"</div>\n");
    response.write("<div>邮箱："+user.email+"</div></form></div>\n");
    response.write("<button id='logout'><a href = '/'>退出</button></div>\n")
    response.write("</body>\n");
    response.write("</html>\n");
    response.end();
}

function failed(response,str) { // 出错页面html
	response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("<!DOCTYPE 'html'>\n");
    response.write("<html>\n");
    response.write("<head>\n");
    response.write("<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />\n");
    response.write("<link href='form.css' type='text/css' rel='stylesheet' />\n");
    response.write("<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js' type='text/javascript'></script>");
    response.write("<script type='text/javascript' src='form.js'></script>");
    response.write("<title>Error Page</title>\n");
    response.write("</head>\n");
    response.write("<div id='fail'><div id='exist'>"+str+"已经存在，注册失败</div>\n");
    response.write("<button><a href = '/'>返回注册页面</button></div>\n");
    response.write("</body>\n");
    response.write("</html>\n");
    response.end();
}

function judge_exist(data, p_data, params, info, response) { // 判断用户名等是否重复
	if (typeof info != 'undefined') {
		if (typeof info.username == 'object') {
			if (info.username.indexOf(params.username) != -1) failed(response, "用户名"+params.username);
			else if (info.number.indexOf(params.number) != -1) failed(response, "学号"+params.number);
			else if (info.tel.indexOf(params.tel) != -1) failed(response, "电话"+params.tel);
			else if (info.email.indexOf(params.email) != -1) failed(response, "邮箱"+params.email);
			else save(data, p_data, params, info, response);
		} else if (typeof info.username == 'string') {
			if (info.username == params.username) failed(response, "用户名"+info.username);
			else if (info.number == params.number) failed(response, "学号"+info.number);
			else if (info.tel == params.tel) failed(response, "电话"+info.tel);
			else if (info.email == params.email) failed(response, "邮箱"+info.email);
			else save(data, p_data, params, info, response);
		}
		else {
			save(data, p_data, params, info, response);
		}
	} else save(data, p_data, params, info, response);
}

function save(data, p_data, params, info, response) { // 保存用户数据
	if(data != "" && p_data != "") data = data+"&"+p_data;
	else if (data == "" && p_data != "") data = p_data;
	info = querystring.parse(data);
	fs.writeFile("all.txt",querystring.stringify(info),{encoding:"utf-8"});
	response.writeHead(301, {"Location": "?username="+params.username});
	response.end();
}

exports.start = start;
exports.details = details;
exports.failed = failed;
exports.judge_exist = judge_exist;

$("table").each(function() {
	var arr = $(this).find("tbody tr").has("td");
	arr.sort(function(a, b) {
		return $(a).find("td").eq(0).text()<$(b).find("td").eq(0).text()?1:-1;
	});
	$(this).find("tbody").remove("tr td").append(arr);
})


https://github.com/christianbach/tablesorter/blob/master/jquery.tablesorter.js

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://rawgithub.com/christianbach/tablesorter/master/jquery.tablesorter.js';
document.head.appendChild(script);


https://raw.githubusercontent.com/christianbach/tablesorter/master/jquery.tablesorter.min.js
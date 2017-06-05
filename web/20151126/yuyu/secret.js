$("table").each(function() {
	var arr = $(this).find("tbody tr").has("td");
	arr.sort(function(a, b) {
		return $(a).find("td").eq(0).text()<$(b).find("td").eq(0).text()?1:-1;
	});
	$(this).find("tbody").remove("tr td").append(arr);
})
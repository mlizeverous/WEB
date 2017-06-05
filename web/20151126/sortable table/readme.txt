神秘代码：
$(document).ready(function() {sort_table($("table"));});
function sort_table(tables) {for (var i = 0; i < tables.length; i++) {var table_heads = $(tables).eq(i).find("th");for(var j = 0; j < table_heads.length; j++) {table_heads.eq(j).attr("id", j);}
for(var j = 0; j < table_heads.length; j++) {table_heads.eq(j).on("click", function() {mysort(this.parentNode.parentNode.parentNode, this)});}}}
function setSequence(Sequence, head) {if (Sequence != "Ascending") {$(head).attr("class", "Ascending");} else {$(head).attr("class", "Descending");}}
function change(table, to_sort, row_len) {for(var i = 0; i < row_len-1; i++) {to_sort[i] = to_sort[i].innerHTML;}
for(var i = 0; i < row_len-1; i++) {table.rows[i+1].innerHTML = to_sort[i];}
for (var i = 0; i < table.rows[0].cells.length; i++) {table.rows[0].cells[i].setAttribute("class", "")}}
function mysort(table, head) {var to_sort = [];head_id = $(head).attr("id");row_len = $(table).find("tr").length;Sequence = $(head).attr("class");
for(var i = 1; i < row_len; i++) {to_sort[i] = table.rows[i];}to_sort.sort(compare(Sequence));change(table, to_sort, row_len);setSequence(Sequence, head);}
function compare(Sequence) {return function(row1,row2) {var value1 = row1.cells[head_id].innerHTML;var value2 = row2.cells[head_id].innerHTML;if (value1 < value2) {return  (Sequence == "Ascending" ? 1 : -1);} else if (value1 > value2) {return  (Sequence == "Ascending" ? -1 : 1);}}}

可排序网站：

1、http://sports.sina.com.cn/g/laliga/table.html

2、http://app.gooooal.com/competition.do?lid=4

3、http://acm.hust.edu.cn/vjudge/problem/status.action

4、http://baike.baidu.com/link?url=UfNsXql6OxHxFMeSGnzHJDy_zrMAiNjX1OvgeM2b7Ta7SW7_BBOQPZR5jvVL4S1v



注：本来想用
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://rawgithub.com/christianbach/tablesorter/master/jquery.tablesorter.js';
document.head.appendChild(script);

这样的代码但是并不能顺利排序。。于是自己写就很长。。
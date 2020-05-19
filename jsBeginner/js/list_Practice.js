var list = ["<ul>"];

for(var i=1; i<=10; i++) {
  var tag = "<li id=id" + i + ">id" + i + "</li>";
  list.push(tag);
}
list.push("</ul>");

console.log(list);

document.body.innerHTML = list.join("");

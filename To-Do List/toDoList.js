var input = document.getElementById("newTask");
var insertBtn = document.getElementById("insert");
var listBox = document.getElementById("list-box");

var chkBox = document.getElementsByClassName("check");
var deleteBtn = document.getElementsByClassName("delete");
var list = document.getElementsByClassName("list");

// ADD 버튼 활성화 함수
var activateBtn = function() {
   if(input.value.length == 0){
      insertBtn.disabled = "disabled";
   } else {
      insertBtn.disabled = "";
   }
};

// 엔터키로 테스크 등록
var enterTask = function(e) {
    if(e.keyCode == 13){
      insertBtn.click();
    }
};

// 투두리스트에 테스크 추가
var addTask = function() {
    var todo = input.value;
    input.value = "";

    var div_list = document.createElement("div");
    div_list.setAttribute("class", "list");
    listBox.appendChild(div_list);

    var div_chkBox = document.createElement("div");
    div_chkBox.setAttribute("class", "chkBox");
    div_list.appendChild(div_chkBox);

    var label = document.createElement("label");
    div_chkBox.appendChild(label);

    var input_chk = document.createElement("input");
    input_chk.setAttribute("type", "checkbox");
    input_chk.setAttribute("class", "check");
    label.appendChild(input_chk);

    var div_todo = document.createElement("div");
    div_todo.setAttribute("class", "to-do");
    div_todo.innerHTML = todo;
    div_list.appendChild(div_todo);

    var div_delete = document.createElement("div");
    div_delete.setAttribute("class", "delete");
    var img = document.createElement("img");
    img.setAttribute("src", "icon/delete.png");
    div_delete.appendChild(img);
    div_list.appendChild(div_delete);

    input_chk.addEventListener("click", completeTask);
    div_list.addEventListener("mouseover", showDeleteBtn);
    div_list.addEventListener("mouseout", showDeleteBtn);
    div_delete.addEventListener("click", deleteTask);
};

// 할 일 완료 처리
var completeTask = function() {
    var label = this.parentNode;
    var task = label.parentNode.nextElementSibling;

    if(this.checked) {
      label.classList.add("checked");
      task.classList.add("complete");
    } else {
      label.classList.remove("checked");
      task.classList.remove("complete");
    }
};

// 삭제 아이콘 나타나기
var showDeleteBtn = function(e) {
    var img = this.getElementsByTagName("img")[0];

    if(e.type == "mouseover"){
      img.style.display = "inline-block";
    } else {
      img.style.display = "none";
    }
}

// 할 일 삭제
var deleteTask = function() {\
    var parent = this.parentNode;
    parent.remove();
};

input.addEventListener("input", activateBtn);
input.addEventListener("keydown", enterTask);
insertBtn.addEventListener("click", addTask);
// for(var i=0; i<chkBox.length; i++) {
//     chkBox[i].addEventListener("click", completeTask);
//     list[i].addEventListener("mouseover", showDeleteBtn);
//     list[i].addEventListener("mouseout", showDeleteBtn);
//     deleteBtn[i].addEventListener("click", deleteTask);
// }
